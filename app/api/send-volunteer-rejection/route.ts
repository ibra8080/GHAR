import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    await resend.emails.send({
      from: "GHAR Organization <info@ghar-ngo.com>",
      to: email,
      replyTo: "info@ghar-ngo.com",
      subject: "Your Volunteer Application | GHAR Organization",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A6FA0; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">GHAR Organization</h1>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <h2 style="color: #2A2A2A;">Dear ${name},</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for your interest in volunteering with GHAR Organization and for 
              taking the time to submit your application.
            </p>
            <p style="color: #555; line-height: 1.6;">
              After careful consideration, we regret to inform you that we are unable to 
              move forward with your application at this time. This was a difficult decision, 
              as we received many strong applications.
            </p>
            <p style="color: #555; line-height: 1.6;">
              We encourage you to apply again in the future as our needs grow and evolve. 
              Your willingness to contribute to humanitarian work is truly appreciated.
            </p>
            <p style="color: #888; font-size: 13px;">
              If you have any questions, feel free to reply to this email.
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 16px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              German Humanitarian Relief Organization e.V. | Kullenkampffallee 193, 28217 Bremen
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}