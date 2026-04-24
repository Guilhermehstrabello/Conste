import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type FornecedorFormPayload = {
  form_type: "fornecedor" | "comprador";
  full_name: string;
  email: string;
  company: string;
  phone: string;
  city: string;
  segment: string;
  service_offered?: string | null;
  site_url?: string | null;
  message: string;
};

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function sanitizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<FornecedorFormPayload>;

    const payload: FornecedorFormPayload = {
      form_type: body.form_type === "fornecedor" ? "fornecedor" : "comprador",
      full_name: sanitizeText(body.full_name),
      email: sanitizeText(body.email),
      company: sanitizeText(body.company),
      phone: sanitizeText(body.phone),
      city: sanitizeText(body.city),
      segment: sanitizeText(body.segment),
      service_offered: sanitizeText(body.service_offered) || null,
      site_url: sanitizeText(body.site_url) || null,
      message: sanitizeText(body.message),
    };

    if (
      !payload.full_name ||
      !payload.email ||
      !payload.company ||
      !payload.phone ||
      !payload.city ||
      !payload.segment ||
      !payload.message
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    if (payload.form_type === "fornecedor" && !payload.service_offered) {
      return new Response(JSON.stringify({ error: "service_offered is required for fornecedores" }), {
        status: 400,
      });
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return new Response(
        JSON.stringify({
          error: "Supabase not configured",
          details: "Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local",
        }),
        { status: 500 }
      );
    }

    const { error } = await supabaseAdmin.from("fornecedores_forms").insert(payload);
    if (error) {
      console.error("Supabase fornecedores_forms insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    console.error("API /api/fornecedores-forms error:", err);
    return new Response(JSON.stringify({ error: "unexpected error" }), { status: 500 });
  }
}
