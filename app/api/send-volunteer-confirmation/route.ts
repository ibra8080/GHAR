import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email } = await request.json();

  try {
    await resend.emails.send({
      from: "GHAR Foundation <onboarding@resend.dev>",
      to: email,
      subject: "Your Volunteer Application has been Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1A6FA0; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">GHAR Foundation</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">German Humanitarian Relief Organization</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #2A2A2A; margin-top: 0;">Dear ${name},</h2>
            
            <p style="color: #4B5563; line-height: 1.6;">
              Thank you for applying to volunteer with GHAR Foundation! We have received your application and are truly grateful for your willingness to contribute to our humanitarian mission.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #1A6FA0; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #1A6FA0; font-weight: bold; margin: 0 0 5px 0;">What happens next?</p>
              <p style="color: #4B5563; margin: 0; line-height: 1.6;">
                Our team will review your application and get back to you within <strong>3-5 business days</strong>. 
                We may reach out to schedule a brief call to learn more about your skills and availability.
              </p>
            </div>
            
            <p style="color: #4B5563; line-height: 1.6;">
              In the meantime, you can learn more about our projects and impact on our website.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ghar-seven.vercel.app/projects" 
                 style="background-color: #2D8F16; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                View Our Projects
              </a>
            </div>
            
            <p style="color: #4B5563; line-height: 1.6;">
              If you have any questions, please don&apos;t hesitate to contact us at 
              <a href="mailto:info@ghar.de" style="color: #1A6FA0;">info@ghar.de</a>
            </p>
            
            <p style="color: #4B5563; margin-bottom: 0;">
              With gratitude,<br/>
              <strong>The GHAR Foundation Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #9CA3AF; font-size: 12px;">
            <p style="margin: 0;">© 2026 GHAR Foundation · Bremen, Germany</p>
            <p style="margin: 5px 0 0 0;">Kullenkampffallee 193, 28217 Bremen</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}