import { recipeService } from "../services/supabase";
// src/utils/types.ts

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  totalReviews: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutritionInfo: NutritionInfo;
  category: RecipeCategory;
  cuisine: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  isFavorited: boolean;
  tags: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  joinedDate: string;
  following: number;
  followers: number;
  recipesCount: number;
  favoriteRecipes: string[];
  settings: UserSettings;
}

export interface UserSettings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  emailPreferences: {
    newsletter: boolean;
    recipeUpdates: boolean;
    followActivity: boolean;
  };
  privacySettings: {
    profileVisibility: "public" | "private";
    showFavorites: boolean;
    showActivity: boolean;
  };
}

export type RecipeCategory = 
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Appetizers"
  | "Soups"
  | "Salads"
  | "Main Dishes"
  | "Side Dishes"
  | "Desserts"
  | "Snacks"
  | "Beverages";

export interface SearchFilters {
  query: string;
  categories: RecipeCategory[];
  difficulty: ("Easy" | "Medium" | "Hard")[];
  cookTime: {
    min: number;
    max: number;
  };
  rating: number;
  ingredients: string[];
  dietary: string[];
}

export interface Comment {
  id: string;
  recipeId: string;
  userId: string;
  user: User;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: Comment[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  userId: string;
  recipeIds: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeState {
  loading: boolean;
  error: string | null;
  data: Recipe[];
  currentRecipe: Recipe | null;
  filters: SearchFilters;
  sortBy: "rating" | "newest" | "cookTime" | "popularity";
}

export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  data: User | null;
  collections: Collection[];
  recentlyViewed: string[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  border: string;
}

export interface AppConfig {
  apiUrl: string;
  imageBaseUrl: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  version: string;
  buildNumber: number;
  environment: "development" | "staging" | "production";
}