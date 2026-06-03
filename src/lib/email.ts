import { Resend } from "resend";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@yourdomain.com";

  return getResend().emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  budget: string;
}) {
  const toEmail = process.env.RESEND_TO_EMAIL || "Jag@pcmpro.ca";

  await sendEmail({
    to: toEmail,
    subject: `New enquiry from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Budget:</strong> ${data.budget}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  await sendEmail({
    to: data.email,
    subject: "We received your enquiry",
    html: `
      <h2>Thank you, ${data.name}</h2>
      <p>We've received your enquiry and will be in touch within 24 hours.</p>
      <p>In the meantime, feel free to browse our portfolio.</p>
      <br/>
      <p>— The Team</p>
    `,
  });
}
