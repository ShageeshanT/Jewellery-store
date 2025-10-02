import { sanityClient } from "@/lib/sanity-client";

export async function getAllPosts() {
  // Check if Sanity is configured
  if (!sanityClient) {
    console.warn("Sanity is not configured. Returning empty posts array.");
    return [];
  }

  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "author": {
      "name": author->name,
      "image": author->image.asset->url
    },
    "categories": categories[]->title,
    summary,
    readingTime,
    isFeatured
  }`;

  return await sanityClient.fetch(query);
}

export async function getAllCategory() {
  // Check if Sanity is configured
  if (!sanityClient) {
    console.warn("Sanity is not configured. Returning empty categories array.");
    return [];
  }

  const query = `*[_type == "category"]{
                        "label": title,
                        "value": slug.current }`;

  return await sanityClient.fetch(query);
}

export async function getPostBySlug(slug: string) {
  // Check if Sanity is configured
  if (!sanityClient) {
    console.warn("Sanity is not configured. Returning null for post.");
    return null;
  }

  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "author": {
      "name": author->name,
      "image": author->image.asset->url
    },
    "categories": categories[]->title,
    summary,
    readingTime,
    isFeatured,
    content[],
    tags,
    seoTitle,
    seoDescription,
    "relatedPosts": relatedPosts[]. _ref
}`;

  return await sanityClient.fetch(query);
}
