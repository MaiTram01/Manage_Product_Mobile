// HomeStackScreen.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import ProductsByCategoryScreen from './ProductsByCategoryScreen'; // Import the screen

import { HomeStackParamList } from "./types"; // Use the updated types

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      {/* Add ProductsByCategoryScreen to allow navigation to it */}
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;