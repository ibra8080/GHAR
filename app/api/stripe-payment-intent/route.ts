import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, donorId } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe يستخدم السنتات
      currency: "eur",
      metadata: { donorId },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (_error) {
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}