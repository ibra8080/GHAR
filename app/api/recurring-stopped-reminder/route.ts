import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    const { data: donors } = await supabase
      .from("donors")
      .select("*")
      .eq("recurring_active", false)
      .eq("recurring_stopped_reminder_sent", false)
      .lte("recurring_stopped_at", sevenDaysAgo.toISOString())
      .gte("recurring_stopped_at", eightDaysAgo.toISOString());

    if (!donors || donors.length === 0) {
      return NextResponse.json({ status: "ok", sent: 0 });
    }

    for (const donor of donors) {
      await resend.emails.send({
        from: "GHAR Organization <info@ghar-ngo.com>",
        to: donor.email,
        replyTo: "info@ghar-ngo.com",
        subject: "We Miss Your Support | GHAR Organization",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1A6FA0; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">GHAR Organization</h1>
            </div>
            <div style="padding: 32px; background: #ffffff;">
              <h2 style="color: #2A2A2A;">Dear ${donor.name},</h2>
              <p style="color: #555; line-height: 1.6;">
                We wanted to follow up regarding your monthly donation, which has now been paused for a week.
              </p>
              <p style="color: #555; line-height: 1.6;">
                If you would like to resume your support for families in Sudan and Yemen, you can do so at any time with just one click.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://www.ghar-ngo.com/en/donate"
                  style="background: #2D8F16; color: white; padding: 14px 32px;
                  border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  Resume My Donation
                </a>
              </div>
              <p style="color: #555; line-height: 1.6;">
                If you have any questions, simply reply to this email.
              </p>
              <p style="color: #555; margin-bottom: 0;">
                With gratitude,<br/>
                <strong>The GHAR Organization Team</strong>
              </p>
            </div>
            <div style="background: #f5f5f5; padding: 16px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                German Humanitarian Relief Organization e.V. | Kulenkampffallee 193, 28213 Bremen, Germany
              </p>
            </div>
          </div>
        `,
      });

      await supabase
        .from("donors")
        .update({ recurring_stopped_reminder_sent: true })
        .eq("id", donor.id);
    }

    return NextResponse.json({ status: "ok", sent: donors.length });
  } catch (_error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
