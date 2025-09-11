import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, topics, consent } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email requis" },
        { status: 400 }
      );
    }

    // ✅ Transporteur Nodemailer (Gmail avec App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ✅ Contenu de l’email
    const mailOptions = {
      from: `Newsletter Gate Africa Magazine <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      cc: "redaction@gateofafrica.com, andriambolaradoniainamichael@gmail.com",
      subject: `Nouvelle inscription à la Newsletter`,
      html: `
        <h2>Nouvel abonné à la Newsletter</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujets choisis :</strong> ${
          topics && topics.length > 0 ? topics.join(", ") : "Aucun"
        }</p>
        <p><strong>Consentement :</strong> ${
          consent ? "✅ Accepté" : "❌ Non accepté"
        }</p>
      `,
    };

    // ✅ Envoi de l’email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Inscription enregistrée et email envoyé avec succès ✅",
    });
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email:", error);
    return NextResponse.json(
      { success: false, message: "Échec de l’inscription ❌" },
      { status: 500 }
    );
  }
}
