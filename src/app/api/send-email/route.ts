import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const { name, email, phone, revenue, company } = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // seu e-mail
            pass: process.env.EMAIL_PASS, // app password ou senha
        },
    });

    const mailOptions = {
        from: `"Conste site" <${process.env.EMAIL_FROM}>`,
        to: [process.env.EMAIL_TO_1, process.env.EMAIL_TO_2].filter((email): email is string => typeof email === "string"),
        subject: "Novo lead recebido!",
        text: `
      Nome: ${name}
      E-mail: ${email}
      Telefone: ${phone}
      Faturamento: ${revenue}
      Empresa: ${company}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "E-mail enviado com sucesso" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ message: "Erro ao enviar e-mail" }, { status: 500 });
    }
}