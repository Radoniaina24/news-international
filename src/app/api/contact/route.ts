import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, subject } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email requis" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ✅ Template HTML professionnel
    const mailOptions = {
      from: `Contact Gate Africa Magazine <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      cc: "redaction@gateofafrica.com, andriambolaradoniainamichael@gmail.com",
      subject: subject || "Nouveau message depuis le site",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; padding:20px; border:1px solid #eaeaea; border-radius:8px;">
          <h2 style="color:#1a73e8; text-align:center;">Nouveau message reçu</h2>
          <p>Vous avez reçu un nouveau message via le site Gate Africa Magazine :</p>
          
          <table style="width:100%; border-collapse:collapse; margin-top:15px;">
            <tr>
              <td style="padding:8px; font-weight:bold; background:#f9f9f9; border:1px solid #ddd;">Nom</td>
              <td style="padding:8px; border:1px solid #ddd;">${
                name || "Non précisé"
              }</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold; background:#f9f9f9; border:1px solid #ddd;">Email</td>
              <td style="padding:8px; border:1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold; background:#f9f9f9; border:1px solid #ddd;">Sujet</td>
              <td style="padding:8px; border:1px solid #ddd;">${
                subject || "Sans sujet"
              }</td>
            </tr>
            <tr>
              <td style="padding:8px; font-weight:bold; background:#f9f9f9; border:1px solid #ddd;">Message</td>
              <td style="padding:8px; border:1px solid #ddd; white-space:pre-line;">${
                message || "Aucun message fourni"
              }</td>
            </tr>
          </table>

          <p style="margin-top:20px; font-size:14px; color:#666; text-align:center;">
            Cet email a été généré automatiquement depuis le formulaire du site web.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès ✅",
    });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { success: false, message: "Échec de l’envoi de l’email ❌" },
      { status: 500 }
    );
  }
}
