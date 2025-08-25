# Project Architecture Context

## Stack
- Frontend: React Native + Expo
- Backend: Hybrid (Supabase + Mock)
- Navigation: React Navigation
- Architecture Pattern: react-native-supabase

## Data Storage Mode

### HYBRID MODE
- Some features use Supabase: foodService.getAll, recipeService.getAll
- Some features use mock data: None


## Service Layer
- **foodService**: getAll
- **recipeService**: getAll

## File Structure
```
App.tsx
    CategoryPill.tsx
    RecipeCard.tsx
    EditProfileScreen.tsx
    HomeScreen.tsx
    ProfileScreen.tsx
    RecipeDetailScreen.tsx
    RecipesScreen.tsx
    SavedRecipesScreen.tsx
    SearchScreen.tsx
    types.ts
PROJECT_CONTEXT.md
app.json
eas.json
  supabase.ts
```

## Important Patterns

- Mix of real and mock data
- Check each service to see if it's connected to Supabase


## Edit Instructions for AI
- Current mode: HYBRID
- When editing: Maintain Supabase connections and update PROJECT_CONTEXT.md after changes
- Service naming: Use existing service names (favoriteService, photosUploadService, etc.)
- Import paths: Maintain relative imports (../services/supabase)

## Common Issues to Avoid
1. Don't create duplicate service files
2. Maintain consistent service naming (favoriteService.uploadImage NOT uploadService.upload)
3. If Supabase is connected, ensure all CRUD operations use it
4. Update this context file after significant changes

Last updated: 2025-08-25T17:36:19.155Z
