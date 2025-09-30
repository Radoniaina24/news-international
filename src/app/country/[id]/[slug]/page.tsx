"use client";

import BlogSkeleton from "@/components/Blog/BlogSkeleton";
import BlogView from "@/components/Blog/View";
import { useGetPostBySlugQuery } from "@/redux/api/postApi";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>(); // récupère l'ID depuis l'URL

  const { data: post, error, isLoading } = useGetPostBySlugQuery(slug);
  // console.log(post);
  if (isLoading) return <BlogSkeleton />;
  if (error) return <p>Erreur lors du chargement de l’article.</p>;
  if (!post) return <p>Aucun article trouvé.</p>;
  // console.log(post);
  return <BlogView article={post[0]} />;
}
