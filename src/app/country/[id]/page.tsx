"use client";
import ArticlesCountryPage from "@/features/Country";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  return <ArticlesCountryPage categoryId={id} />;
}
