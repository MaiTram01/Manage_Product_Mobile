import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStackScreen";
import SignupSqlite from "./dbSqlite/SignupSqlite";
import LoginSqlite from "./dbSqlite/LoginSqlite";

export type BottomTabParamList = {
  HomeTab: undefined;
  SignupSqlite: undefined;
  LoginSqlite: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="SignupSqlite"
        component={SignupSqlite}
        options={{
          title: "Signup",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>➕</Text>
          ),
        }}
      />

      <Tab.Screen
        name="LoginSqlite"
        component={LoginSqlite}
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔒</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
