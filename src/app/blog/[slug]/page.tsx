import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug, urlFor } from "@/app/lib/sanity";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-white">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-400">Blog</p>
        <h1 className="text-4xl font-bold sm:text-5xl">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          <span>
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          {post.author && <span>Por {post.author}</span>}
        </div>
      </div>

      {post.mainImage && (
        <div className="relative my-10 h-[420px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-900">
          {(() => {
            const imageUrl = urlFor(post.mainImage);
            return imageUrl ? (
              <Image
                src={imageUrl.width(1600).url()!}
                alt={`Capa do artigo ${post.title}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">Imagem indisponível</div>
            );
          })()}
        </div>
      )}

      <div className="space-y-8 text-slate-200">
        <PortableText
          value={post.body}
          components={{
            block: {
              h1: ({ children }) => <h1 className="pt-8 text-3xl font-bold text-white">{children}</h1>,
              h2: ({ children }) => <h2 className="pt-8 text-2xl font-bold text-white">{children}</h2>,
              h3: ({ children }) => <h3 className="pt-8 text-xl font-bold text-white">{children}</h3>,
              normal: ({ children }) => <p className="leading-8 text-slate-300">{children}</p>,
            },
            marks: {
              link: ({ children, value }) => {
                const target = value?.href?.startsWith("http") ? "_blank" : undefined;
                return (
                  <a
                    href={value?.href}
                    target={target}
                    rel={target ? "noreferrer" : undefined}
                    className="text-violet-400 underline"
                  >
                    {children}
                  </a>
                );
              },
            },
            types: {
              image: ({ value }) => {
                if (!value?.asset?._ref) return null;
                return (
                  <div className="relative my-8 h-80 w-full overflow-hidden rounded-3xl border border-white/10">
                    {(() => {
                      const imageUrl = urlFor(value);
                      return imageUrl ? (
                        <Image
                          src={imageUrl.width(1600).url()!}
                          alt={value.alt || "Imagem do artigo"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">Imagem indisponível</div>
                      );
                    })()}
                  </div>
                );
              },
            },
          }}
        />
      </div>
    </main>
  );
}
