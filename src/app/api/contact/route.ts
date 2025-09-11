import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  try {
    // console.log(usre);
    const body = await req.json();
    const { name, email, message, subject } = body;
    // console.log(process.env.EMAIL_PASS);
    // Configurer le transporteur Nodemailer
    // const transporter = nodemailer.createTransport({
    //   host: "mail77.lwspanel.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });
    console.log(process.env.GMAIL_USER);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: `"Formulaire site web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Le destinataire : contact@carrefour-emploi.com
      cc: "andriambolaradoniaina25@gmail.com",
      subject: `${subject}`,
      html: `<div
  style="
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
    color: #333;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  "
>
  <!-- En-tête -->
  <div
    style="
      background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
      padding: 25px;
      border-radius: 12px 12px 0 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    "
  >
    <div
      style="
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.15) 0%,
          transparent 70%
        );
        transform: rotate(45deg);
      "
    ></div>
    <h2
      style="
        color: white;
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        position: relative;
        z-index: 1;
      "
    >
      Nouveau message
    </h2>
  </div>

  <!-- Contenu principal -->
  <div
    style="
      padding: 30px;
      background: white;
      border-left: 4px solid #e53935;
      border-right: 4px solid #388e3c;
    "
  >
    <div
      style="
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(90deg, #e3f2fd 0%, #ffffff 100%);
        border-radius: 8px;
        border-left: 4px solid #1976d2;
      "
    >
      <p style="margin: 0; font-size: 16px">
        <strong style="color: #0d47a1">Nom complet :</strong>
        <span style="color: #333">${name}</span>
      </p>
    </div>
    <div
      style="
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(90deg, #e3f2fd 0%, #ffffff 100%);
        border-radius: 8px;
        border-left: 4px solid #388e3c;
      "
    >
      <p style="margin: 0; font-size: 16px">
        <strong style="color: #388e3c">Sujet :</strong>
        <span style="color: #333">${subject}</span>
      </p>
    </div>
    <div
      style="
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(90deg, #ffffff 0%, #e3f2fd 100%);
        border-radius: 8px;
        border-left: 4px solid #e53935;
      "
    >
      <p style="margin: 0; font-size: 16px">
        <strong style="color: #e53935">Email :</strong>
        <a
          href="mailto:${email}"
          style="
            color: #0d47a1;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 2px solid transparent;
            transition: border-bottom 0.3s ease;
          "
          >${email}</a
        >
      </p>
    </div>

    <div style="margin-bottom: 20px">
      <p
        style="
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #0d47a1;
        "
      >
        Message :
      </p>
      <blockquote
        style="
          border-left: 6px solid #e53935;
          padding: 20px;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
          border-radius: 0 8px 8px 0;
          color: #444;
          font-style: italic;
          position: relative;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        "
      >
        <div style="position: relative; z-index: 1; padding-left: 10px">
          ${message}
        </div>
      </blockquote>
    </div>
  </div>

  <!-- Pied de page -->
  <div
    style="
      background: linear-gradient(135deg, #388e3c 0%, #0d47a1 100%);
      padding: 20px;
      border-radius: 0 0 12px 12px;
      text-align: center;
      position: relative;
      overflow: hidden;
    "
  >
    <div
      style="
        position: absolute;
        bottom: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.15) 0%,
          transparent 70%
        );
        transform: rotate(-45deg);
      "
    ></div>
    <p
      style="
        color: white;
        font-weight: bold;
        margin: 0;
        font-size: 18px;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      "
    >
      Gate Of Africa Magazine
    </p>
  </div>
</div>`,
    };
    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}
