import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(emailData: EmailData) {
  const { name, email, subject, message } = emailData;

  const info = await transporter.sendMail({
    from: `"Your Website" <${process.env.EMAIL_USER}>`,
    to: "odekeivancliff@gmail.com",
    replyTo: email,
    subject: `New contact form submission: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}

export async function POST(request: Request) {
  try {
    const body: EmailData = await request.json();
    await sendEmail(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}