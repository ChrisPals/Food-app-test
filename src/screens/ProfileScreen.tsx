import React, { useState , useEffect } from 'react';
import { recipeService } from "../services/supabase";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const mockSavedRecipes = [
  {
    id: '1',
    name: "Classic Italian Pasta",
    image: "https://foodish-api.com/images/pasta/pasta1.jpg", 
    cookTime: "30 mins",
    difficulty: "Easy",
    saved: true
  },
  {
    id: '2',
    name: "Margherita Pizza", 
    image: "https://foodish-api.com/images/pizza/pizza2.jpg",
    cookTime: "45 mins",
    difficulty: "Medium",
    saved: true
  },
  {
    id: '3',
    name: "Chocolate Lava Cake",
    image: "https://foodish-api.com/images/dessert/dessert3.jpg",
    cookTime: "25 mins",
    difficulty: "Medium", 
    saved: true
  },
  {
    id: '4',
    name: "Greek Salad",
    image: "https://foodish-api.com/images/salad/salad1.jpg",
    cookTime: "15 mins",
    difficulty: "Easy",
    saved: true
  },
  {
    id: '5', 
    name: "Beef Burger",
    image: "https://foodish-api.com/images/burger/burger4.jpg",
    cookTime: "20 mins",
    difficulty: "Easy",
    saved: true
  }
];

const mockUserPreferences = {
  dietaryRestrictions: ["Vegetarian"],
  allergies: ["Nuts", "Shellfish"], 
  cuisinePreferences: ["Italian", "Mexican", "Indian"],
  cookingLevel: "Intermediate"
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@email.com", 
    avatar: "https://picsum.photos/200",
    recipesCreated: 12,
    recipesSaved: 48,
    followers: 156,
    following: 89
  });

  const [savedRecipes, setSavedRecipes] = useState(mockSavedRecipes);
  const [preferences, setPreferences] = useState(mockUserPreferences);

  const renderSavedRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.recipeImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.recipeGradient}
      >
        <Text style={styles.recipeName}>{item.name}</Text>
        <View style={styles.recipeMetaContainer}>
          <Text style={styles.recipeMeta}>{item.cookTime}</Text>
          <Text style={styles.recipeMeta}>{item.difficulty}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <ScrollView>
          <View style={styles.header}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.recipesCreated}</Text>
                <Text style={styles.statLabel}>Created</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.recipesSaved}</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Saved Recipes</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SavedRecipes")}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={savedRecipes}
              renderItem={renderSavedRecipe}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.preferencesContainer}>
              <View style={styles.preferenceSection}>
                <Text style={styles.preferenceTitle}>Dietary Restrictions</Text>
                <View style={styles.tagContainer}>
                  {preferences.dietaryRestrictions.map((item, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.preferenceSection}>
                <Text style={styles.preferenceTitle}>Allergies</Text>
                <View style={styles.tagContainer}>
                  {preferences.allergies.map((item, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.preferenceSection}>
                <Text style={styles.preferenceTitle}>Favorite Cuisines</Text>
                <View style={styles.tagContainer}>
                  {preferences.cuisinePreferences.map((item, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5
  },
  email: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 20
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    marginTop: 10
  },
  statItem: {
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)'
  },
  section: {
    padding: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  },
  seeAll: {
    color: '#06b6d4'
  },
  recipeCard: {
    width: 200,
    height: 250,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5
  },
  recipeImage: {
    width: '100%',
    height: '100%'
  },
  recipeGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 15,
    justifyContent: 'flex-end'
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recipeMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)'
  },
  preferencesContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  preferenceSection: {
    marginBottom: 20
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 10
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  tagText: {
    fontSize: 14,
    color: '#ffffff'
  },
  editButton: {
    backgroundColor: '#06b6d4',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ProfileScreen;