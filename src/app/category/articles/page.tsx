import ArticlesPage from "@/features/Blog";

import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Gate of Africa - Articles",
};
export default function AllPosts() {
  return <ArticlesPage />;
}
