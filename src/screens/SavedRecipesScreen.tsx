import React from 'react';
import { recipeService } from "../services/supabase";
import { 
  View, 
  Text, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity,
  StyleSheet,
  Dimensions 
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const savedRecipes = [
  {
    id: '1',
    title: 'Creamy Pasta Carbonara',
    image: 'https://picsum.photos/800/600?random=1',
    duration: '30 mins',
    difficulty: 'Medium'
  },
  {
    id: '2', 
    title: 'Grilled Salmon',
    image: 'https://picsum.photos/800/600?random=2',
    duration: '25 mins',
    difficulty: 'Easy'
  },
  {
    id: '3',
    title: 'Vegetable Stir Fry',
    image: 'https://picsum.photos/800/600?random=3',
    duration: '20 mins',
    difficulty: 'Easy'
  }
];

const SavedRecipesScreen = () => {
  const navigation = useNavigation();

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.recipeImage}
        contentFit="cover"
        transition={1000}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.recipeMetaContainer}>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.recipeMetaText}>{item.duration}</Text>
          </View>
          <View style={styles.recipeMeta}>
            <Ionicons name="stats-chart-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.recipeMetaText}>{item.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.recipeGrid}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  listContainer: {
    padding: 12,
  },
  recipeGrid: {
    justifyContent: 'space-between',
  },
  recipeCard: {
    width: (width - 36) / 2,
    height: 220,
    marginBottom: 12,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderRadius: 20,
  },
  recipeInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 22,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeMetaText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
});

export default SavedRecipesScreen;