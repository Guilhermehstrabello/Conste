
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { getAllPosts, urlFor } from "@/app/lib/sanity";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden mx-auto px-40 py-12 text-white bg-[#0E0E0E]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[14%] h-[420px] w-[420px] rounded-full bg-[#ff8500]/30 blur-3xl opacity-90 animate-blogBlob1 z-60" />
        <div className="absolute right-[-10%] top-1/4 h-[520px] w-[520px] rounded-full bg-[#310276]/30 blur-3xl opacity-90 animate-blogBlob2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_35%)]" />
      </div>
      <section className="relative mb-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="p-4 w-fit bg-violet-800 rounded-full">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-200">Blog</p>
            </div>
            <h1 className="mt-4 text-2xl font-bold md:text-4xl">Conteúdo para quem quer crescer com constância</h1>
            <p className="mt-4 max-w-3xl text-base text-slate-300">
              Artigos, guias e estudos de case pensados para quem precisa tomar decisões de marketing estratégicas para o seu negócio.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-300">
            Nenhum post publicado ainda. Conecte seu Sanity e crie o primeiro artigo.
          </div>
        ) : (
          posts.map((post) => {
            const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(1200).url() : null;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 transition duration-300 hover:-translate-y-1 hover:border-violet-500"
              >
                {imageUrl && (
                  <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={imageUrl}
                      alt={`Capa do artigo ${post.title}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-violet-400">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    {post.author && <span>{post.author}</span>}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{post.title}</h2>
                  <p className="text-slate-300">{post.excerpt ?? "Leia o artigo completo no blog."}</p>
                  <button className="p-4 bg-violet-600 rounded-lg text-violet-200 underline">Ler artigo completo</button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </main>
    </>
  );
}
