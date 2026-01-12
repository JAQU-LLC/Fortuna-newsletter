export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: string; // ISO 8601 datetime string from backend
  published: boolean;
}
