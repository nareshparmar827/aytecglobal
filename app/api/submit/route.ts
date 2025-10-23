import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1️⃣ Insert into Supabase
    const { error } = await supabase.from("contacts").insert([{ name, email, message }]);
    if (error) throw error;

    // 2️⃣ Send email notification
   /* const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,      // e.g. "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,    // your SMTP username (email)
        pass: process.env.SMTP_PASS,    // your SMTP password / App Password
      },
    });

    const mailOptions = {
      from: `"Aytec Global" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || "sales@aytecglobal.com", // recipient
      subject: `New Contact Form Submission`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions); */

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Submit error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
