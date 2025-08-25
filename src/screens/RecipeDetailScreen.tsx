import React, { useState, useEffect } from "react";
import { recipeService } from "../services/supabase";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSaved, setIsSaved] = useState(false);

  const recipe = {
    id: "1",
    title: "Homemade Italian Pasta Carbonara",
    image: "https://foodish-api.com/images/pasta/pasta15.jpg", 
    prepTime: "20 mins",
    cookTime: "15 mins",
    servings: 4,
    difficulty: "Medium",
    author: "Chef Maria Romano",
    rating: 4.8,
    reviews: 342,
    ingredients: [
      "400g spaghetti",
      "200g guanciale or pancetta",
      "4 large eggs",
      "100g Pecorino Romano",
      "100g Parmigiano Reggiano", 
      "2 cloves garlic",
      "Black pepper to taste",
      "Salt to taste"
    ],
    instructions: [
      "Bring a large pot of salted water to boil for the pasta",
      "Cut the guanciale into small cubes and cook until crispy",
      "In a bowl, whisk eggs, grated cheese, and black pepper",
      "Cook pasta al dente, reserve 1 cup pasta water",
      "Combine hot pasta with egg mixture, adding pasta water as needed",
      "Add crispy guanciale and toss well",
      "Serve immediately with extra cheese and black pepper"
    ],
    nutrition: {
      calories: 650,
      protein: "28g",
      carbs: "71g", 
      fat: "28g"
    }
  };

  const toggleSave = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem("savedRecipes");
      let savedArray = savedRecipes ? JSON.parse(savedRecipes) : [];
      
      if (isSaved) {
        savedArray = savedArray.filter(id => id !== recipe.id);
      } else {
        savedArray.push(recipe.id);
      }
      
      await AsyncStorage.setItem("savedRecipes", JSON.stringify(savedArray));
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.gradient}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={toggleSave}
          >
            <Ionicons 
              name={isSaved ? "heart" : "heart-outline"} 
              size={24} 
              color={isSaved ? "#ff4757" : "#fff"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.metaText}>{recipe.prepTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="account" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.metaText}>{recipe.servings} servings</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="chef-hat" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.metaText}>{recipe.difficulty}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <MaterialCommunityIcons name="circle-small" size={24} color="rgba(255,255,255,0.8)" />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((step, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.nutritionSection}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionGrid}>
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <View key={key} style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{value}</Text>
                  <Text style={styles.nutritionLabel}>{key}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e"
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  saveButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  content: {
    padding: 20,
    backgroundColor: "#16213e",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  metaText: {
    marginLeft: 8,
    color: "rgba(255,255,255,0.8)",
    fontSize: 16
  },
  section: {
    marginBottom: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  ingredientText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)"
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 16
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 14,
    textAlign: "center",
    lineHeight: 28,
    marginRight: 12,
    color: "#ffffff",
    fontSize: 16
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24
  },
  nutritionSection: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12
  },
  nutritionItem: {
    width: (width - 100) / 2,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4
  },
  nutritionLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textTransform: "capitalize"
  }
});

export default RecipeDetailScreen;