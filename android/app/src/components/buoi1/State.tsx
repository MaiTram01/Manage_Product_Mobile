import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";

const State: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleShowInfo = () => {
    if (name && age) {
      setShowInfo(true);
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ tên và tuổi!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Chào mừng đến với Coffee Shop!</Text>
        <Text style={styles.owner}>by Huỳnh Thị Mai Trâm</Text>
        <Text style={styles.subtitle}>
          Đây là giao diện nhập thông tin bằng State
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập tuổi của bạn"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleShowInfo}>
          <Text style={styles.buttonText}>Nhấn vào đây</Text>
        </TouchableOpacity>

        {showInfo && (
          <View style={styles.info}>
            <Text style={styles.infoText}>Tên: {name}</Text>
            <Text style={styles.infoText}>Tuổi: {age}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3e5ab",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6f4e37",
    textAlign: "center",
    marginBottom: 10,
  },
  owner: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#8d6748",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#5d4037",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#6f4e37",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fffbe7",
  },
  button: {
    backgroundColor: "#6f4e37",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    marginTop: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#6f4e37",
    marginBottom: 5,
    fontWeight: "500",
  },
});

export default State;
