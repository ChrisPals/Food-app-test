import React, { useState, useEffect } from "react";
import { recipeService } from "../services/supabase";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, FlatList, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const CATEGORIES = [
  { id: 1, name: "Breakfast", icon: "cafe-outline" },
  { id: 2, name: "Lunch", icon: "restaurant-outline" },
  { id: 3, name: "Dinner", icon: "moon-outline" },
  { id: 4, name: "Desserts", icon: "ice-cream-outline" },
  { id: 5, name: "Drinks", icon: "wine-outline" }
];

const FEATURED_RECIPES = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "https://foodish-api.com/images/pasta/pasta1.jpg",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.8
  },
  {
    id: 2, 
    title: "Classic Margherita Pizza",
    image: "https://foodish-api.com/images/pizza/pizza1.jpg",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.9
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    image: "https://foodish-api.com/images/dessert/dessert1.jpg",
    time: "25 min",
    difficulty: "Medium",
    rating: 4.7
  }
];

const TRENDING_RECIPES = [
  {
    id: 4,
    title: "Grilled Salmon",
    image: "https://foodish-api.com/images/fish/fish1.jpg",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.6
  },
  {
    id: 5,
    title: "Chicken Stir Fry",
    image: "https://foodish-api.com/images/chicken/chicken1.jpg", 
    time: "25 min",
    difficulty: "Easy",
    rating: 4.5
  },
  {
    id: 6,
    title: "Beef Burger",
    image: "https://foodish-api.com/images/burger/burger1.jpg",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.7
  }
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate("Recipes", { category: item.name })}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon} size={24} color="#9333ea" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.recipeImage}
        contentFit="cover"
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.recipeMetaContainer}>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.recipeMetaText}>{item.time}</Text>
          </View>
          <View style={styles.recipeMeta}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.recipeMetaText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="rgba(255,255,255,0.8)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search recipes..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => navigation.navigate("Search", { query: searchQuery })}
            />
          </View>

          <View style={styles.categoriesContainer}>
            <FlatList
              data={CATEGORIES}
              renderItem={renderCategoryItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>Featured Recipes</Text>
            <FlatList
              data={FEATURED_RECIPES}
              renderItem={renderRecipeCard}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.recipesList}
            />
          </View>

          <View style={styles.trendingContainer}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <FlatList
              data={TRENDING_RECIPES}
              renderItem={renderRecipeCard}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.recipesList}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
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
    backdropFilter: "blur(20px)",
    margin: 16,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#ffffff"
  },
  categoriesContainer: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
    color: "#ffffff"
  },
  categoriesList: {
    paddingHorizontal: 15
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 80
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  categoryName: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center"
  },
  featuredContainer: {
    marginBottom: 24
  },
  trendingContainer: {
    marginBottom: 24
  },
  recipesList: {
    paddingHorizontal: 15
  },
  recipeCard: {
    width: width * 0.65,
    marginHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5
  },
  recipeImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  recipeInfo: {
    padding: 15
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8
  },
  recipeMetaContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center"
  },
  recipeMetaText: {
    marginLeft: 4,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)"
  }
});

export default HomeScreen;