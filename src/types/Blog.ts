export type WPFeaturedMediaSize = [string, number, number, boolean];

export interface WPAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
}

export interface WPCategoryInfo {
  name: string;
  link: string;
}
export interface WPBlogPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  type: "post" | "page" | string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  categories: number[];
  categories_names: Record<string, WPCategoryInfo>;
  blog_post_layout_featured_media_urls: {
    thumbnail?: WPFeaturedMediaSize;
    full?: WPFeaturedMediaSize;
    [key: string]: WPFeaturedMediaSize | undefined; // pour d'autres formats éventuels (medium, large, etc.)
  };
  _embedded?: {
    author?: WPAuthor[];
  };
}
