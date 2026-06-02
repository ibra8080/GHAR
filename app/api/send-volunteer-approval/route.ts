import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, calendlyLink, interviewer } = await req.json();

    await resend.emails.send({
      from: "GHAR Organization <info@ghar-ngo.com>",
      to: email,
      replyTo: "info@ghar-ngo.com",
      subject: "Your Volunteer Application — Next Steps | GHAR Organization",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A6FA0; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">GHAR Organization</h1>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <h2 style="color: #2A2A2A;">Dear ${name},</h2>
            <p style="color: #555; line-height: 1.6;">
              We are pleased to inform you that your volunteer application has been reviewed 
              and we would love to move forward with you!
            </p>
            <p style="color: #555; line-height: 1.6;">
              Please schedule an interview with <strong>${interviewer}</strong> at your convenience 
              using the link below:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${calendlyLink}" 
                style="background: #2D8F16; color: white; padding: 14px 32px; 
                border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                📅 Schedule My Interview
              </a>
            </div>
            <p style="color: #555; line-height: 1.6;">
              We look forward to speaking with you and learning more about how you can 
              contribute to our mission in Sudan and Yemen.
            </p>
            <p style="color: #888; font-size: 13px;">
              If you have any questions, simply reply to this email and we'll be happy to help.
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