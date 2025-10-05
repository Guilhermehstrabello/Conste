import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const name = typeof body.name === 'string' ? body.name.trim() : null;
    const email = typeof body.email === 'string' ? body.email.trim() : null;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : null;
    const company = typeof body.company === 'string' ? body.company.trim() : null;

    if (!email && !name) {
      return new Response(JSON.stringify({ error: 'name or email required' }), { status: 400 });
    }

    console.time('supabase-insert');
    const { error } = await supabaseAdmin.from('leads').insert([
      {
        name,
        email,
        phone,
        company,
      },
    ]);
    console.timeEnd('supabase-insert');

    if (error) {
      console.error('Supabase insert error (admin):', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // After successful insert, dispatch email send asynchronously (fire-and-forget)
    // so the client receives a fast response. NOTE: in serverless environments
    // background tasks may be terminated if the runtime is frozen after response.
    // For guaranteed delivery use a job/queue or send from a persistent worker.
    const toList = [process.env.EMAIL_TO_1, process.env.EMAIL_TO_2].filter(
      (addr): addr is string => typeof addr === 'string' && addr.length > 0
    );
    const fromAddr = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    const user = process.env.EMAIL_USER || process.env.EMAIL_FROM;
    const pass = process.env.EMAIL_PASS;

    if (user && pass && fromAddr && toList.length > 0) {
      // start async send, but don't await it
      void (async () => {
        try {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user, pass },
          });

          const mailOptions = {
            from: `Conste site <${fromAddr}>`,
            to: toList,
            subject: 'Novo lead recebido!',
            text: `Nome: ${name ?? '-'}\nE-mail: ${email ?? '-'}\nTelefone: ${phone ?? '-'}\nEmpresa: ${company ?? '-'}`,
          } as const;

          console.time('nodemailer-send');
          await transporter.sendMail(mailOptions);
          console.timeEnd('nodemailer-send');
        } catch (mailErr) {
          // eslint-disable-next-line no-console
          console.error('Error sending lead email (async):', mailErr);
        }
      })();
    } else {
      console.warn('Email config missing; skipping email send');
    }

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('API /api/leads error:', err);
    return new Response(JSON.stringify({ error: 'unexpected error' }), { status: 500 });
  }
}
