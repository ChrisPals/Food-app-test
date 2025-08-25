import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fpoqwjbvnaflngchybrk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwb3F3amJ2bmFmbG5nY2h5YnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjY0MTUsImV4cCI6MjA3MDg0MjQxNX0.j0mvTjQ3IZ0ahTiX7KmY7fkncnMMuAh3J6gzTEG0Hhc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Food operations
export const foodService = {
  // Get all foods
  async getAll() {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get single food by id
  async getById(id: string) {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new food
  async create(food: any) {
    const { data, error } = await supabase
      .from('foods')
      .insert([food])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update food
  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('foods')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete food
  async delete(id: string) {
    const { error } = await supabase
      .from('foods')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Recipe operations
export const recipeService = {
  // Get all recipes
  async getAll() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get single recipe by id
  async getById(id: string) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Create new recipe
  async create(recipe: any) {
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipe])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update recipe
  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete recipe
  async delete(id: string) {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
