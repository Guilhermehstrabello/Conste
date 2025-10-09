import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get('limit') || '100';
    const offset = url.searchParams.get('offset') || '0';
    const scoreFilter = url.searchParams.get('score');
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), { status: 500 });
    }

    let query = supabaseAdmin
      .from('respostas_nps')
      .select('*')
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    // Apply filters
    if (scoreFilter && scoreFilter !== 'all') {
      query = query.eq('score', parseInt(scoreFilter));
    }

    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }

    if (dateTo) {
      query = query.lte('created_at', dateTo);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase respostas_nps select error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Get summary statistics
    const { data: summaryData, error: summaryError } = await supabaseAdmin
      .from('respostas_nps')
      .select('score, created_at');

    interface MonthlyData {
      count: number;
      total: number;
    }

    let summary = {
      totalResponses: 0,
      averageScore: 0,
      npsScore: 0,
      promoters: 0,
      passives: 0,
      detractors: 0,
      responsesByScore: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 } as Record<number, number>,
      monthlyTrend: [] as Array<{ month: string; averageScore: number; responseCount: number }>
    };

    if (summaryData && !summaryError) {
      summary.totalResponses = summaryData.length;
      
      if (summaryData.length > 0) {
        const totalScore = summaryData.reduce((sum: number, item: any) => sum + item.score, 0);
        summary.averageScore = totalScore / summaryData.length;

        // Calculate NPS
        const promoters = summaryData.filter((item: any) => item.score >= 9).length;
        const passives = summaryData.filter((item: any) => item.score >= 7 && item.score <= 8).length;
        const detractors = summaryData.filter((item: any) => item.score <= 6).length;
        
        summary.promoters = promoters;
        summary.passives = passives;
        summary.detractors = detractors;
        summary.npsScore = ((promoters - detractors) / summaryData.length) * 100;

        // Count by score
        summaryData.forEach((item: any) => {
          if (item.score >= 0 && item.score <= 10) {
            summary.responsesByScore[item.score]++;
          }
        });

        // Monthly trend (last 6 months)
        const monthlyData: Record<string, MonthlyData> = {};
        summaryData.forEach((item: any) => {
          const month = new Date(item.created_at).toISOString().slice(0, 7); // YYYY-MM
          if (!monthlyData[month]) {
            monthlyData[month] = { count: 0, total: 0 };
          }
          monthlyData[month].count++;
          monthlyData[month].total += item.score;
        });

        summary.monthlyTrend = Object.entries(monthlyData)
          .map(([month, data]: [string, MonthlyData]) => ({
            month,
            averageScore: data.total / data.count,
            responseCount: data.count
          }))
          .sort((a, b) => a.month.localeCompare(b.month))
          .slice(-6); // Last 6 months
      }
    }

    return new Response(JSON.stringify({ 
      data: data || [], 
      summary,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: summaryData?.length || 0
      }
    }), { status: 200 });

  } catch (err) {
    console.error('API GET /api/respostas-nps error:', err);
    return new Response(JSON.stringify({ error: 'unexpected error' }), { status: 500 });
  }
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

    // Diagnostic checks for env vars
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error('Supabase admin client not configured. NEXT_PUBLIC_SUPABASE_URL present:', Boolean(url), 'SUPABASE_SERVICE_ROLE_KEY present:', Boolean(key));
      return new Response(JSON.stringify({ error: 'Supabase not configured', details: { hasUrl: Boolean(url), hasServiceKey: Boolean(key) } }), { status: 500 });
    }
    // detect common mistakes: surrounding quotes or whitespace
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
