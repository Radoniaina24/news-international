export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  publishedAt: Date;
  readTime: number;
  views: number;
  likes: number;
  imageUrl: string;
  tags: string[];
  country: string;
  featured: boolean;
  trending: boolean;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  articlesCount: number;
  social: {
    twitter?: string;
    linkedin?: string;
    email: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  country?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  sortBy: "date" | "popularity" | "relevance";
}

export interface Newsletter {
  email: string;
  preferences: string[];
  subscribed: boolean;
}
