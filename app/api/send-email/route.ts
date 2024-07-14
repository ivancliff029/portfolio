import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  const body: EmailData = await request.json();
  const { name, email, subject, message } = body;

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS // Your Gmail app password
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"Your Website" <${process.env.EMAIL_USER}>`, // sender address
      to: "odekeivancliff@gmail.com", // your email address
      replyTo: email, // set reply-to as the sender's email
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}