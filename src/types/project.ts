export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "residential" | "commercial" | "hospitality" | "renovation";
  coverImage: string;
  images: string[];
  designer?: string;
  contractor?: string;
  photographer?: string;
  year: number;
  featured: boolean;
  description?: string;
}
