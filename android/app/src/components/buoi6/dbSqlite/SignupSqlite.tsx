import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  { name: "MyDatabase.db", location: "default" },
  () => console.log("Database opened"),
  error => console.log("Error opening database", error)
);

const SignupSqlite = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);"
      );
    });
  }, []);

  const handleSignup = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        () => Alert.alert("Success", "User registered successfully"),
        (_, error) => {
          console.log("Insert error:", error);
          return false;
        }
      );
    });

    setUsername("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default SignupSqlite;
