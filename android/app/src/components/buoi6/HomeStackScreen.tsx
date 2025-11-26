import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import { HomeStackParamList } from './types';
import ProductDetailScreen from './ProductDetailScreen';
import ProductsByCategoryScreen from './ProductsByCategoryScreen';
import AppNavigatorProduct from './AppNavigatorProduct';
import CategoriesScreen from './CategoriesScreen'; 

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen} />
      <Stack.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ headerShown: true, title: 'Danh mục sản phẩm' }} 
      />
      <Stack.Screen 
        name="AdminDashboard" 
        component={AppNavigatorProduct} 
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;