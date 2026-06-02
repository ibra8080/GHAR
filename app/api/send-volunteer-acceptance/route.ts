import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    await resend.emails.send({
      from: "GHAR Foundation <info@ghar-ngo.com>",
      to: email,
      replyTo: "info@ghar-ngo.com",
      subject: "🎉 Welcome to GHAR Foundation Volunteer Team!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A6FA0; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">GHAR Foundation</h1>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <h2 style="color: #2A2A2A;">Dear ${name},</h2>
            <p style="color: #555; line-height: 1.6;">
              We are thrilled to welcome you to the <strong>GHAR Foundation Volunteer Team!</strong> 🎉
            </p>
            <p style="color: #555; line-height: 1.6;">
              After a careful review of your application and our interview, we are delighted 
              to confirm that you have been accepted as a volunteer with our organization.
            </p>
            <div style="background: #f0f9f0; border-left: 4px solid #2D8F16; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="color: #2A2A2A; margin: 0; font-weight: bold;">
                Welcome to the team! We will be in touch shortly with all the details you need to get started.
              </p>
            </div>
            <p style="color: #555; line-height: 1.6;">
              Together, we will make a real difference in the lives of families in Sudan and Yemen.
            </p>
            <p style="color: #888; font-size: 13px;">
              If you have any questions in the meantime, feel free to reply to this email.
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