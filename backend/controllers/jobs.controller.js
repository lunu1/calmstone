// src/controllers/jobs.controller.js
import nodemailer from "nodemailer";

const CAREERS_TO = process.env.CAREERS_TO || "recruitment@almashreqroup.com";

function buildTransporter() {
  // Use your SMTP (Sendgrid, Mailgun, Gmail SMTP, etc.)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function applyForJob(req, res) {
  try {
    const { name, email, phone, message, jobId, jobTitle } = req.body;

    if (!name || !email || !jobTitle) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transporter = buildTransporter();

    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      });
    }

    const html = `
      <div style="font-family:Inter,Arial,sans-serif">
        <h2>New Job Application</h2>
        <p><b>Job:</b> ${jobTitle}${jobId ? ` (ID: ${jobId})` : ""}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
        ${message ? `<p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
        <p>${req.file ? "Resume attached." : "No resume attached."}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Careers Bot" <no-reply@${(process.env.DOMAIN || "example.com")}>`,
      to: CAREERS_TO,
      subject: `Job Application: ${jobTitle} ${name ? `- ${name}` : ""}`,
      replyTo: email,
      html,
      attachments,
    });

    return res.status(200).json({ ok: true, message: "Application sent" });
  } catch (err) {
    console.error("applyForJob error:", err);
    return res.status(500).json({ message: "Failed to submit application" });
  }
}
