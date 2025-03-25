import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, revenue } = body;

    const { data, error } = await supabase
      .from('leads')
      .insert({ 
        name, 
        email, 
        phone, 
        revenue 
      });

    if (error) throw error;

    return NextResponse.json({ 
      message: 'Formulário enviado com sucesso!' 
    }, { status: 200 });
  } catch (error) {
    console.error('Erro na submissão:', error);
    return NextResponse.json({ 
      message: 'Erro ao enviar formulário',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}