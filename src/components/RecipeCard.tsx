import React, { memo , useState, useEffect } from "react";
import { recipeService } from "../services/supabase";
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    cookTime: string;
    difficulty: string;
    imageUrl: string;
    rating: number;
    isFavorited?: boolean;
  };
  onFavoritePress?: (id: string) => void;
}

const RecipeCard = memo(({ recipe, onFavoritePress }: RecipeCardProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("RecipeDetail" as never, { recipeId: recipe.id } as never);
  };

  const handleFavoritePress = () => {
    onFavoritePress?.(recipe.id);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: recipe.imageUrl }}
        style={styles.image}
        contentFit="cover"
      />
      
      <BlurView intensity={80} tint="dark" style={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {recipe.title}
            </Text>
            <TouchableOpacity 
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={recipe.isFavorited ? "heart" : "heart-outline"}
                size={24}
                color={recipe.isFavorited ? "#ff4b4b" : "#fff"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#fff" />
              <Text style={styles.detailText}>{recipe.cookTime}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="speedometer-outline" size={16} color="#fff" />
              <Text style={styles.detailText}>{recipe.difficulty}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.detailText}>{recipe.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  details: {
    flexDirection: "row",
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#fff",
  },
});

export default RecipeCard;