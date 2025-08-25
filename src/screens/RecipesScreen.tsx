import React, { useState, useCallback , useEffect } from "react";
import { recipeService } from "../services/supabase";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, FlatList, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CategoryPill from "../components/CategoryPill";
import RecipeCard from "../components/RecipeCard";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const categories = [
  "All",
  "Main Course", 
  "Appetizers",
  "Desserts",
  "Beverages", 
  "Breakfast",
  "Snacks",
  "Salads",
  "Soups"
];

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "recent", label: "Most Recent" },
  { id: "quick", label: "Quick & Easy" },
  { id: "rating", label: "Highest Rated" }
];

const mockRecipes = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    image: "https://foodish-api.com/images/pasta/pasta1.jpg",
    duration: "30 mins",
    difficulty: "Easy",
    rating: 4.8,
    category: "Main Course"
  },
  {
    id: "2", 
    title: "Classic Margherita Pizza",
    image: "https://foodish-api.com/images/pizza/pizza1.jpg",
    duration: "45 mins",
    difficulty: "Medium",
    rating: 4.9,
    category: "Main Course"
  },
  {
    id: "3",
    title: "Chocolate Lava Cake",
    image: "https://foodish-api.com/images/dessert/dessert1.jpg", 
    duration: "40 mins",
    difficulty: "Medium",
    rating: 4.7,
    category: "Desserts"
  },
  {
    id: "4",
    title: "Fresh Garden Salad",
    image: "https://foodish-api.com/images/salad/salad1.jpg",
    duration: "15 mins", 
    difficulty: "Easy",
    rating: 4.5,
    category: "Salads"
  },
  {
    id: "5",
    title: "Spicy Chicken Burger",
    image: "https://foodish-api.com/images/burger/burger1.jpg",
    duration: "25 mins",
    difficulty: "Easy", 
    rating: 4.6,
    category: "Main Course"
  },
  {
    id: "6",
    title: "Berry Smoothie Bowl",
    image: "https://foodish-api.com/images/dessert/dessert2.jpg",
    duration: "10 mins",
    difficulty: "Easy",
    rating: 4.4,
    category: "Breakfast"
  },
  {
    id: "7",
    title: "Vegetable Spring Rolls",
    image: "https://foodish-api.com/images/appetizer/appetizer1.jpg",
    duration: "35 mins",
    difficulty: "Medium",
    rating: 4.3,
    category: "Appetizers"
  },
  {
    id: "8",
    title: "Creamy Tomato Soup",
    image: "https://foodish-api.com/images/soup/soup1.jpg",
    duration: "40 mins",
    difficulty: "Easy",
    rating: 4.7,
    category: "Soups"
  }
];

const RecipesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedRecipes = useCallback(() => {
    switch(selectedSort) {
      case "popular":
        return [...filteredRecipes].sort((a, b) => b.rating - a.rating);
      case "recent":
        return filteredRecipes;
      case "quick":
        return [...filteredRecipes].sort((a, b) => 
          parseInt(a.duration) - parseInt(b.duration)
        );
      case "rating":
        return [...filteredRecipes].sort((a, b) => b.rating - a.rating);
      default:
        return filteredRecipes;
    }
  }, [filteredRecipes, selectedSort]);

  const renderRecipeCard = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    />
  );

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <CategoryPill
            key={category}
            label={category}
            isSelected={category === selectedCategory}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>

      <View style={styles.sortContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sortOptions.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.sortButton,
                selectedSort === option.id && styles.sortButtonActive
              ]}
              onPress={() => setSelectedSort(option.id)}
            >
              <Text style={[
                styles.sortButtonText,
                selectedSort === option.id && styles.sortButtonTextActive
              ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={sortedRecipes()}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.recipeGrid}
        contentContainerStyle={styles.recipeList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  sortContainer: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  sortButtonActive: {
    backgroundColor: "#9333ea"
  },
  sortButtonText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)"
  },
  sortButtonTextActive: {
    color: "#ffffff"
  },
  recipeGrid: {
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  recipeList: {
    paddingBottom: 24
  }
});

export default RecipesScreen;