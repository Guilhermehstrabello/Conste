"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CreateBlogPage() {
  const router = useRouter();
  const { user, session, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const slug = useMemo(() => slugify(title), [title]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/blog/login?redirectTo=/blog/criar");
    }
  }, [loading, user, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    if (!session?.access_token) {
      setStatus("error");
      setMessage("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ title, author, excerpt, content, slug }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao criar post");

      setStatus("success");
      setMessage(`Post criado com sucesso: /blog/${data.slug}`);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro inesperado");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-white">
      {loading || !user ? (
        <div className="min-h-[360px] rounded-3xl border border-white/10 bg-slate-950/80 p-12 text-center text-slate-300">
          <p className="text-lg font-semibold text-white">Aguarde enquanto verificamos seu acesso...</p>
          <p className="mt-3">Se você não estiver logado, será redirecionado para o login.</p>
        </div>
      ) : (
        <>
          <div className="mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-400">Criar Post</p>
            <h1 className="text-4xl font-bold">Publicar novo artigo</h1>
            <p className="text-slate-300">
              Use este formulário para criar um post diretamente no site. Ele será enviado para o Sanity e publicado imediatamente.
            </p>
            <p className="text-sm text-slate-400">
              Caso queira, você também pode editar o conteúdo depois no Sanity Studio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/80 p-8">
            <div className="grid gap-6">
              <label className="grid gap-2 text-sm text-slate-300">
                Título
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Autor
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Resumo
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="min-h-[120px] rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                  maxLength={220}
                />
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Conteúdo
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[220px] rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                  required
                />
              </label>

              <div className="text-sm text-slate-400">
                Slug gerado: <span className="font-medium text-white">{slug || "(a partir do título)"}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={status === "saving"}
              >
                {status === "saving" ? "Enviando..." : "Criar post"}
              </button>
              <Link href="/blog" className="text-sm text-slate-300 hover:text-white">
                Voltar para o blog
              </Link>
            </div>

            {message && (
              <div className={`rounded-2xl px-4 py-3 text-sm ${status === "success" ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/10 text-rose-200"}`}>
                {message}
              </div>
            )}
          </form>
        </>
      )}
    </main>
  );
}
