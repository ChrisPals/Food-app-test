import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryPillProps {
  category: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryPill = ({ category, isSelected, onPress }: CategoryPillProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <LinearGradient
        colors={isSelected 
          ? ["#FF6B6B", "#FF8E53"] 
          : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          isSelected ? styles.selectedGradient : styles.unselectedGradient
        ]}
      >
        <Text style={[
          styles.text,
          isSelected ? styles.selectedText : styles.unselectedText
        ]}>
          {category}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    marginVertical: 8,
  },
  gradient: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
    alignItems: "center",
  },
  selectedGradient: {
    shadowColor: "#FF6B6B",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  unselectedGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  unselectedText: {
    color: "rgba(255,255,255,0.8)",
  },
});

export default CategoryPill;