
export interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}
export interface Recipe {
  id: number;
  title: string;
  time?: string;
  image: string;
  category: string;
  description?: string;
  ingredients?: string[];
  steps?: string[];
  servings?: number;
  author?: {
    name: string;
    avatar: string;
  } | string;
  date?: string;
}
