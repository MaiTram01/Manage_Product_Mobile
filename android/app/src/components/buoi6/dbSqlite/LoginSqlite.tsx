import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  { name: "MyDatabase.db", location: "default" },
  () => console.log("Database opened"),
  error => console.log("Error opening database", error)
);

const LoginSqlite = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (_, results) => {
          if (results.rows.length > 0) {
            Alert.alert("Success", "Login successful");
          } else {
            Alert.alert("Error", "Invalid username or password");
          }
        },
        (_, error) => {
          console.log("Query error:", error);
          return false;
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default LoginSqlite;
