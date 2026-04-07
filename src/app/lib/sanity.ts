import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Post } from "./sanity-types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";

const configured = Boolean(projectId && dataset);

const sanityClient = configured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      ignoreBrowserTokenWarning: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder) return null;
  return builder.image(source).auto("format").fit("max");
}

export async function getAllPosts() {
  if (!sanityClient) return [];
  return sanityClient.fetch<Post[]>(`
    *[_type == "post" && defined(publishedAt)]
      | order(publishedAt desc)
      {
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        mainImage,
        author
      }
  `);
}

export async function getPostBySlug(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch<Post | null>(`
    *[_type == "post" && slug.current == $slug][0]
      {
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        author,
        mainImage,
        body
      }
  `, { slug });
}

export async function getAllPostSlugs() {
  if (!sanityClient) return [];
  const slugs = await sanityClient.fetch<string[]>(`
    *[_type == "post" && defined(slug.current)].slug.current
  `);
  return slugs;
}
