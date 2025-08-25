import React, { useState, useCallback, useEffect } from "react";
import { recipeService } from "../services/supabase";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const mockRecipes = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    image: "https://foodish-api.com/images/pasta/pasta1.jpg", 
    duration: "30 min",
    difficulty: "Medium",
    category: "Italian"
  },
  {
    id: "2", 
    title: "Classic Margherita Pizza",
    image: "https://foodish-api.com/images/pizza/pizza1.jpg",
    duration: "45 min", 
    difficulty: "Easy",
    category: "Italian"
  },
  {
    id: "3",
    title: "Beef Burger with Caramelized Onions",
    image: "https://foodish-api.com/images/burger/burger1.jpg",
    duration: "25 min",
    difficulty: "Easy", 
    category: "American"
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    image: "https://foodish-api.com/images/dessert/dessert1.jpg",
    duration: "40 min",
    difficulty: "Hard",
    category: "Dessert"
  },
  {
    id: "5",
    title: "Thai Green Curry",
    image: "https://foodish-api.com/images/curry/curry1.jpg",
    duration: "50 min",
    difficulty: "Medium",
    category: "Thai"
  }
];

const categories = [
  "All",
  "Italian", 
  "American",
  "Thai",
  "Chinese",
  "Mexican",
  "Dessert"
];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

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
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.recipeMetaContainer}>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.recipeMetaText}>{item.duration}</Text>
          </View>
          <View style={styles.recipeMeta}>
            <MaterialIcons name="restaurant" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.recipeMetaText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryPill = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryPill,
        selectedCategory === item && styles.categoryPillSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryPillText,
          selectedCategory === item && styles.categoryPillTextSelected
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="rgba(255,255,255,0.8)" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryPill}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoryContent}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#06b6d4" />
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.recipesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No recipes found</Text>
            </View>
          }
        />
      )}
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
    marginBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    height: 48
  },
  categoryContainer: {
    height: 44,
    marginBottom: 16
  },
  categoriesList: {
    flexGrow: 0
  },
  categoryContent: {
    paddingHorizontal: 16
  },
  categoryPill: {
    paddingHorizontal: 16,
    height: 36,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  categoryPillSelected: {
    backgroundColor: "#06b6d4"
  },
  categoryPillText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)"
  },
  categoryPillTextSelected: {
    color: "#ffffff",
    fontWeight: "600"
  },
  recipesList: {
    padding: 16
  },
  recipeCard: {
    height: 200,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5
  },
  recipeImage: {
    width: "100%",
    height: "100%"
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  recipeInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2
  },
  recipeMetaContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16
  },
  recipeMetaText: {
    marginLeft: 4,
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32
  },
  emptyStateText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)"
  }
});

export default SearchScreen;