import React, { useState, useEffect } from "react";
import { recipeService } from "../services/supabase";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import RecipesScreen from "./src/screens/RecipesScreen";
import RecipeDetailScreen from "./src/screens/RecipeDetailScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SearchScreen from "./src/screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Recipes") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarStyle: {
          height: 60,
          backgroundColor: 'rgba(0,0,0,0.8)',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 10
        },
        headerStyle: {
          backgroundColor: "#1a1a2e"
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: "#fff"
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
      />
      <Tab.Screen 
        name="Recipes" 
        component={RecipesScreen}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading] = useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right"
          }}
        >
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen 
            name="RecipeDetail" 
            component={RecipeDetailScreen}
            options={{
              headerShown: true,
              title: "",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#1a1a2e"
              },
              headerShadowVisible: false
            }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e"
  }
});