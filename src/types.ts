import { Category } from "./constants";

export type SortOption =
  | "created_at_desc"
  | "created_at_asc"
  | "title_asc"
  | "title_desc";

export interface Folder {
  id: number;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
}

export interface NewFolder {
  name: string;
  description?: string;
  color?: string;
}

export interface Link {
  id: number;
  url: string;
  title: string;
  description: string;
  notes: string;
  category: Category;
  created_at: string;
  color?: string;
  folder_id?: number;
}

export interface NewLink {
  url: string;
  title: string;
  description: string;
  notes: string;
  category: Category;
  color?: string;
  folder_id?: number;
}
