import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest)  {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ message: "JSON inválido" }, { status: 400 });
    }

    const { name, email, phone, company } = (body as Record<string, unknown>) || {};

    if (!name || !email || !phone) {
        return NextResponse.json({ message: "Campos obrigatórios ausentes: name, email, phone" }, { status: 400 });
    }

    const toList = [process.env.EMAIL_TO_1, process.env.EMAIL_TO_2].filter(
        (addr): addr is string => typeof addr === "string" && addr.length > 0
    );
    const fromAddr = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    const user = process.env.EMAIL_USER || process.env.EMAIL_FROM;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass || !fromAddr || toList.length === 0) {
        return NextResponse.json({
            message: "Configuração de e-mail ausente. Defina EMAIL_USER, EMAIL_PASS, EMAIL_FROM e pelo menos EMAIL_TO_1.",
        }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user, pass },
    });

    const mailOptions = {
        from: `Conste site <${fromAddr}>`,
        to: toList,
        subject: "Novo lead recebido!",
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nEmpresa: ${company ?? "-"}`,
    } as const;

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "E-mail enviado com sucesso" });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao enviar e-mail:", error.message);
        } else {
            console.error("Erro ao enviar e-mail:", error);
        }
        return NextResponse.json({ message: "Erro ao enviar e-mail" }, { status: 500 });
    }
}