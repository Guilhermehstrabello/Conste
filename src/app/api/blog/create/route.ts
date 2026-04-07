import { NextRequest, NextResponse } from "next/server";
import { createClient as createSanityClient } from "@sanity/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID || "";
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN || "";

  if (!projectId || !token) {
    throw new Error("Sanity não está configurado: faltando SANITY_PROJECT_ID ou SANITY_API_TOKEN.");
  }

  return createSanityClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
}

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase não está configurado: faltando NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.");
  }

  return createSupabaseClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  let sanity;

  try {
    sanity = getSanityClient();
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Sanity não está configurado." },
      { status: 500 }
    );
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ message: "Supabase não está configurado." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const accessToken = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!accessToken) {
    return NextResponse.json({ message: "Acesso não autorizado." }, { status: 401 });
  }

  const supabase = getSupabaseClient();
  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ message: "Acesso não autorizado." }, { status: 401 });
  }

  const body = await request.json();
  const { title, author, excerpt, content, slug } = body;

  if (!title || !author || !content) {
    return NextResponse.json({ message: "Título, autor e conteúdo são obrigatórios." }, { status: 400 });
  }

  const normalizedSlug = slugify(slug || title);

  try {
    const doc = await sanity.create({
      _type: "post",
      title,
      author,
      excerpt,
      publishedAt: new Date().toISOString(),
      slug: { _type: "slug", current: normalizedSlug },
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: content,
            },
          ],
        },
      ],
    });

    return NextResponse.json({ success: true, id: doc._id, slug: doc.slug.current });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao criar post no Sanity." }, { status: 500 });
  }
}
