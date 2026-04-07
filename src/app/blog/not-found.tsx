import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-white">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-400">Blog</p>
        <h1 className="mt-6 text-4xl font-bold">Post não encontrado</h1>
        <p className="mt-4 text-slate-300">O post que você tentou acessar não existe ou ainda não foi publicado.</p>
        <Link href="/blog" className="mt-8 inline-flex rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
          Voltar para o blog
        </Link>
      </div>
    </main>
  );
}
