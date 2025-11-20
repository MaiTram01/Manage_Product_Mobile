import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import SignupScreen from './dbSqlite/SignupSqlite';
import LoginScreen from './dbSqlite/LoginSqlite';
import LoginSqlite from './dbSqlite/LoginSqlite';
import SignupSqlite from './dbSqlite/SignupSqlite';

export type BottomTabParamList = {
  HomeTab: undefined;
  Signup: undefined;  //minh họa cho users lưu ở AsyncStorage
  Login: undefined; //minh họa cho users lưu ở AsyncStorage
  SignupSqlite: undefined; //minh họa cho users lưu bằng Sqlite
  LoginSqlite: undefined; //minh họa cho users lưu bằng Sqlite
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text> // Unicode 🏠 (home)
          ),
         }}
      />
      {/*-----Tab dùng cho Signup và Login----- */}
      {/* <Tab.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Signup' }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      /> */}
      {/*-----Tab dùng cho Signup và Login bằng Sqlite---- */}
      <Tab.Screen
        name="SignupSqlite"
        component={SignupSqlite}
        options={{ title: 'Signup',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>➕</Text> // Unicode ➕
          ),
         }}
      />
      <Tab.Screen
        name="LoginSqlite"
        component={LoginSqlite}
        options={{ title: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔒</Text> // Unicode 🔒
          ),
         }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
