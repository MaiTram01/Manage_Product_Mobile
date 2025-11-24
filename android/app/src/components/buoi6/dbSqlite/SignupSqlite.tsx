import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addUser } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../AppTabs';

const SignupSqlite = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  // Check logged in every time screen is focused
  useFocusEffect(
    useCallback(() => {
      const checkLoggedIn = async () => {
        const loggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (loggedInUser) {
          Alert.alert(
            'Already Logged In',
            'You are already logged in. Please logout first.',
            [{ text: 'OK', onPress: () => navigation.navigate('HomeTab') }]
          );
        }
      };
      checkLoggedIn();
    }, [])
  );

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const success = await addUser(username, password, role);

    if (success) {
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('LoginSqlite');
    } else {
      Alert.alert('Error', 'Signup failed. Username may already exist.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.roleContainer}>
        <Text style={styles.label}>Role:</Text>
        <TouchableOpacity onPress={() => setRole('user')}>
          <Text style={[styles.roleOption, role === 'user' && styles.selected]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('admin')}>
          <Text style={[styles.roleOption, role === 'admin' && styles.selected]}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupSqlite;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginBottom: 25 },
  input: { padding: 10, borderWidth: 1, marginBottom: 15, borderRadius: 5 },
  roleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  roleOption: { marginHorizontal: 10, padding: 5, fontSize: 16 },
  selected: { color: 'blue', fontWeight: 'bold', textDecorationLine: 'underline' },
  label: { fontWeight: 'bold' },
  signupButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 6, alignItems: 'center' },
  signupText: { color: '#fff', fontSize: 18 },
});
