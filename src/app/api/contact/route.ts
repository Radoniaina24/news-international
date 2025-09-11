import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  try {
    // console.log(usre);
    const body = await req.json();
    const { name, email, message, address } = body;
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: `"Formulaire site web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Le destinataire : contact@carrefour-emploi.com
      cc: "rojoclaudino@gmail.com",
      subject: `Nouveau message de ${name}`,
      html: `
  <div
  style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%);
    color: #333;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  "
>
  <!-- En-tête -->
  <div
    style="
      background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
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
          rgba(255, 255, 255, 0.1) 0%,
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
      📩 Nouveau message
    </h2>
  </div>

  <!-- Contenu principal -->
  <div
    style="
      padding: 30px;
      background: white;
      border-left: 4px solid #ff9800;
      border-right: 4px solid #ff9800;
    "
  >
    <div
      style="
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(90deg, #e3f2fd 0%, #fff3e0 100%);
        border-radius: 8px;
        border-left: 4px solid #2196f3;
      "
    >
      <p style="margin: 0; font-size: 16px">
        <strong style="color: #1976d2">👤 Nom complet :</strong>
        <span style="color: #555">${name}</span>
      </p>
    </div>

    <div
      style="
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(90deg, #fff3e0 0%, #e3f2fd 100%);
        border-radius: 8px;
        border-left: 4px solid #ff9800;
      "
    >
      <p style="margin: 0; font-size: 16px">
        <strong style="color: #ff9800">📧 Email :</strong>
        <a
          href="mailto:${email}"
          style="
            color: #1976d2;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 2px solid transparent;
            transition: border-bottom 0.3s ease;
          "
          >${email}</a
        >
      </p>
    </div>

    <div
      style="
        margin-bottom: 20px;
        padding: 15px;
        background: linear-gradient(90deg, #e3f2fd 0%, #fff3e0 100%);
        border-radius: 8px;
        border-left: 4px solid #2196f3;
      "
    >
      <p style="margin: 0; font-size: 16px">
        <strong style="color: #1976d2">📍 Adresse :</strong>
        <span style="color: #555">${address}</span>
      </p>
    </div>

    <div style="margin-bottom: 20px">
      <p
        style="
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #1976d2;
        "
      >
        💬 Message :
      </p>
      <blockquote
        style="
          border-left: 6px solid #ff9800;
          padding: 20px;
          margin: 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #fff3e0 100%);
          border-radius: 0 8px 8px 0;
          color: #444;
          font-style: italic;
          position: relative;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        "
      >
        <div
          style="
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 48px;
            color: #ff9800;
            opacity: 0.3;
            line-height: 1;
          "
        >
          "
        </div>
        <div style="position: relative; z-index: 1; padding-left: 20px">
          ${message}
        </div>
      </blockquote>
    </div>
  </div>

  <!-- Pied de page -->
  <div
    style="
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
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
          rgba(255, 255, 255, 0.1) 0%,
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
      🏢 Carrefour de l'emploi et des études Madagascar
    </p>
  </div>
</div>

  `,
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
