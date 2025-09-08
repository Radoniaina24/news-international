import ArticlesPolitique from "@/features/categories/politique";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Gate of Africa - Politique",
};
export default function politique() {
  return <ArticlesPolitique />;
}
