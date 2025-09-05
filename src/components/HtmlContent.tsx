"use client";
import DOMPurify from "isomorphic-dompurify";

interface HtmlContentProps {
  html: string;
}
export default function HtmlContent({ html }: HtmlContentProps) {
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <article
      className="prose prose-lg max-w-none text-justify"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
