import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function inferLeadSource(req: Request, body: Record<string, unknown>) {
  const explicitSource = typeof body.source === 'string' ? body.source.trim() : '';
  if (explicitSource) return explicitSource;

  const referer = req.headers.get('referer') || '';
  const referrerUrl = referer ? new URL(referer) : null;
  const utmSource = referrerUrl?.searchParams.get('utm_source') || '';

  if (utmSource) {
    return utmSource;
  }

  const referrer = referer.toLowerCase();
  if (referrer.includes('google')) return 'Google';
  if (referrer.includes('facebook') || referrer.includes('fbclid') || referrer.includes('meta')) return 'Facebook';
  if (referrer.includes('instagram') || referrer.includes('ig')) return 'Instagram';

  return 'Não identificado';
}

function isMissingSourceColumnError(error: unknown) {
  if (typeof error !== 'object' || error === null) return false;

  const errorObj = error as { code?: string; message?: string };
  return errorObj.code === 'PGRST204' || (typeof errorObj.message === 'string' && errorObj.message.includes("Could not find the 'source' column"));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const name = typeof body.name === 'string' ? body.name.trim() : null;
    const email = typeof body.email === 'string' ? body.email.trim() : null;
    const phone = typeof body.phone === 'string' ? body.phone.trim() : null;
    const company = typeof body.company === 'string' ? body.company.trim() : null;
    const source = inferLeadSource(req, body);

    if (!email && !name) {
      return new Response(JSON.stringify({ error: 'name or email required' }), { status: 400 });
    }

    // Diagnostic checks for env vars
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      console.error('Supabase admin client not configured. NEXT_PUBLIC_SUPABASE_URL present:', Boolean(url), 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY present:', Boolean(key));
      return new Response(JSON.stringify({ error: 'Supabase not configured', details: { hasUrl: Boolean(url), hasPublishableKey: Boolean(key) } }), { status: 500 });
    }
    const keyTrim = key.trim();
    if (keyTrim.length !== key.length || /^['"].*['"]$/.test(keyTrim)) {
      console.warn('Supabase service key appears to have surrounding quotes or whitespace (length:', key.length, 'trimmed:', keyTrim.length, ')');
      return new Response(JSON.stringify({ error: 'Supabase service key malformed', details: { keyLength: key.length, keyTrimLength: keyTrim.length } }), { status: 500 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      console.error('Unexpected: supabaseAdmin null after env checks');
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 500 });
    }

    const leadPayload = {
      name,
      email,
      phone,
      company,
      source,
    };

    console.time('supabase-insert');
    const { error } = await supabaseAdmin.from('leads').insert([leadPayload]);
    console.timeEnd('supabase-insert');

    if (error && isMissingSourceColumnError(error)) {
      console.warn('Source column not available yet; retrying insert without source metadata');
      const fallbackPayload = { name, email, phone, company };
      const { error: fallbackError } = await supabaseAdmin.from('leads').insert([fallbackPayload]);

      if (fallbackError) {
        console.error('Supabase insert error (admin fallback):', fallbackError);
        return new Response(JSON.stringify({ error: fallbackError.message }), { status: 500 });
      }
    } else if (error) {
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

          const htmlContent = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Novo Lead - Conste Marketing</title>
              <style>
                body {
                  font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  background: #f5f5f5;
                  margin: 0;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background: linear-gradient(135deg, #310276 0%, #40009E 100%);
                  color: white;
                  padding: 30px 20px;
                  text-align: center;
                }
                .header h1 {
                  margin: 0;
                  font-size: 28px;
                  font-weight: bold;
                }
                .header p {
                  margin: 8px 0 0 0;
                  font-size: 14px;
                  color: white;
                }
                .content {
                }
                .lead-info {
                  background: #dbdbdb;
                  padding: 20px;
                }
                .lead-field {
                  margin-bottom: 16px;
                }
                .lead-field:last-child {
                  margin-bottom: 0;
                }
                .field-label {
                  color: #310276;
                  font-weight: 700;
                  font-size: 14px;
                  text-transform: uppercase;
                  margin-bottom: 4px;
                }
                .field-value {
                  color: #333;
                  font-size: 16px;
                  word-break: break-word;
                }
                .timestamp {
                  text-align: center;
                  color: #999;
                  font-size: 12px;
                  margin-top: 20px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
                }
                .footer {
                  background: #0E0E0E;
                  color: #B9A3E3;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                }
                .footer p {
                  margin: 5px 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Novo Lead Recebido!</h1>
                  <p>Um visitante interessado em crescer sua empresa entrou em contato</p>
                </div>
                
                <div class="content">
                  <div class="lead-info">
                    <div class="lead-field">
                      <div class="field-label">👤 Nome</div>
                      <div class="field-value">${name ?? '-'}</div>
                    </div>
                    
                    <div class="lead-field">
                      <div class="field-label">🏢 Empresa</div>
                      <div class="field-value">${company ?? '-'}</div>
                    </div>
                    
                    <div class="lead-field">
                      <div class="field-label">📧 Email</div>
                      <div class="field-value"><a href="mailto:${email ?? '#'}" style="color: #310276; text-decoration: none;">${email ?? '-'}</a></div>
                    </div>
                    
                    <div class="lead-field">
                      <div class="field-label">📱 Telefone</div>
                      <div class="field-value"><a href="tel:${phone?.replace(/\D/g, '') ?? '#'}" style="color: #310276; text-decoration: none;">${phone ?? '-'}</a></div>
                    </div>
                  </div>
                  
                  <div class="timestamp">
                    📅 Recebido em ${new Date().toLocaleString('pt-BR')}
                  </div>
                </div>
                
                <div class="footer">
                  <p>💼 Conste Marketing</p>
                  <p>Transformando empresas através de marketing digital estratégico</p>
                </div>
              </div>
            </body>
            </html>
          `;

          const mailOptions = {
            from: `Conste - Novo Lead <${fromAddr}>`,
            to: toList,
            subject: `🚀 Novo Lead: ${name} - ${company}`,
            html: htmlContent,
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
