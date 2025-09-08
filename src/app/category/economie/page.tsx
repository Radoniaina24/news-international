import ArticlesEconomie from "@/features/categories/economie";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Gate of Africa - Economie",
};
export default function economie() {
  return <ArticlesEconomie />;
}
