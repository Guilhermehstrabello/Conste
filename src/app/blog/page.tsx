import Image from "next/image";
import Link from "next/link";
import { getAllPosts, urlFor } from "@/app/lib/sanity";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 text-white">
      <section className="mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-400">Blog</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Conteúdo para quem quer crescer com constância</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          Artigos, guias e estudos de caso pensados para quem precisa tomar decisões de marketing sem depender de programação.
        </p>
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
                </div>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
}
