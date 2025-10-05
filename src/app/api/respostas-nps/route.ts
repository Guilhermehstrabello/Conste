import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const name = typeof body.name === 'string' ? body.name.trim() : null;
    const company = typeof body.company === 'string' ? body.company.trim() : null;
    const score = typeof body.score === 'number' ? body.score : null;
    const improvement = typeof body.improvement === 'string' ? body.improvement.trim() : null;
    const positivePoints = typeof body.positivePoints === 'string' ? body.positivePoints.trim() : null;
    const marketingEffectiveness = typeof body.marketingEffectiveness === 'string' ? body.marketingEffectiveness : null;
    const recommend = typeof body.recommend === 'string' ? body.recommend : null;
    const extraComment = typeof body.extraComment === 'string' ? body.extraComment.trim() : null;

    if (!name || !company || score === null || !improvement || !positivePoints || marketingEffectiveness === null || recommend === null) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      console.error('Supabase admin client not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 500 });
    }

    console.time('supabase-nps-insert');
    // Map JS camelCase fields to Postgres snake_case column names
    const { error } = await supabaseAdmin.from('respostas_nps').insert([
      {
        name,
        company,
        score,
        improvement,
        positive_points: positivePoints,
        marketing_effectiveness: marketingEffectiveness,
        recommend,
        extra_comment: extraComment,
      },
    ]);
    console.timeEnd('supabase-nps-insert');

    if (error) {
      console.error('Supabase respostas_nps insert error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (err) {
    console.error('API /api/respostas-nps error:', err);
    return new Response(JSON.stringify({ error: 'unexpected error' }), { status: 500 });
  }
}
