import { Category } from './constants';

export type SortOption = "created_at_desc" | "created_at_asc" | "title_asc" | "title_desc";

export interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  notes: string;
  category: Category;
  created_at: string;
  color?: string;
}

export interface NewLink {
  url: string;
  title: string;
  description: string;
  notes: string;
  category: Category;
  color?: string;
}
