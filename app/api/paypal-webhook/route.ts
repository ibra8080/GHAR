import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateInvoice } from '@/lib/generateInvoice';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// التحقق من صحة الـ Webhook من PayPal
async function verifyPayPalWebhook(req: NextRequest, body: string): Promise<boolean> {
  try {
    const authAlgo = req.headers.get('paypal-auth-algo');
    const certUrl = req.headers.get('paypal-cert-url');
    const transmissionId = req.headers.get('paypal-transmission-id');
    const transmissionSig = req.headers.get('paypal-transmission-sig');
    const transmissionTime = req.headers.get('paypal-transmission-time');

    // الحصول على Access Token
    const tokenRes = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const { access_token } = await tokenRes.json();

    // التحقق من الـ Webhook
    const verifyRes = await fetch('https://api-m.paypal.com/v1/notifications/verify-webhook-signature', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: JSON.parse(body),
      }),
    });

    const { verification_status } = await verifyRes.json();
    return verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

async function sendInvoiceEmail(donor: {
  id: string;
  name: string;
  email: string;
  amount: number;
  donation_type: string;
  project: string;
  payment_method: string;
  status: string;
  created_at: string;
}) {
  try {
    const { doc, receiptNo } = generateInvoice(donor, 'de');
    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append('pdf', pdfBlob, `GHAR-Receipt-${receiptNo}.pdf`);
    formData.append('email', donor.email);
    formData.append('name', donor.name);
    formData.append('lang', 'de');
    formData.append('receiptNo', receiptNo);
    formData.append('amount', donor.amount.toString());

    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-invoice`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Send invoice error:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    // التحقق من صحة الـ Webhook
    const isValid = await verifyPayPalWebhook(req, body);
    if (!isValid) {
      console.error('Invalid PayPal webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);
    const eventType = event.event_type;

    console.log('PayPal Webhook event:', eventType);

    // One-time donation completed
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'PAYMENT.SALE.COMPLETED') {
      const payerEmail = event.resource?.payer?.email_address ||
                         event.resource?.payer_info?.payer_id;
      const amount = parseFloat(event.resource?.amount?.value ||
                                event.resource?.amount?.total || '0');

      // البحث عن التبرع في Supabase
      const { data: donors } = await supabase
        .from('donors')
        .select('*')
        .eq('status', 'pending')
        .eq('payment_method', 'paypal')
        .gte('amount', amount - 1)
        .lte('amount', amount + 1)
        .order('created_at', { ascending: false })
        .limit(1);

      if (donors && donors.length > 0) {
        const donor = donors[0];
        await supabase
          .from('donors')
          .update({ status: 'completed' })
          .eq('id', donor.id);

        await sendInvoiceEmail(donor);
      }
    }

    // Monthly subscription activated
    if (eventType === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      const subscriberEmail = event.resource?.subscriber?.email_address;

      const { data: donors } = await supabase
        .from('donors')
        .select('*')
        .eq('status', 'pending')
        .eq('payment_method', 'paypal')
        .eq('donation_type', 'monthly')
        .order('created_at', { ascending: false })
        .limit(1);

      if (donors && donors.length > 0) {
        const donor = donors[0];
        await supabase
          .from('donors')
          .update({ status: 'completed' })
          .eq('id', donor.id);

        await sendInvoiceEmail(donor);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}