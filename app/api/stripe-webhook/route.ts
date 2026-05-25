import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
  }

  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "invoice.payment_succeeded"
  ) {
    const object = event.data.object as Stripe.PaymentIntent | Stripe.Invoice;
    const donorId = object.metadata?.donorId;

    if (donorId) {
      await supabase
        .from("donors")
        .update({ status: "completed", paypal_tx_id: object.id })
        .eq("id", donorId);
    }
  }

  return NextResponse.json({ received: true });
}