import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const HelloWord: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Chào mừng đến với Coffee Shop!</Text>
        <Text style={styles.owner}>by Huỳnh Thị Mai Trâm</Text>
        <Text style={styles.subtitle}>
          Đây là giao diện đơn giản đầu tiên của tôi
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Xin chào!", "Chúc bạn một ngày tốt lành")}
        >
          <Text style={styles.buttonText}>Nhấn vào đây</Text>
        </TouchableOpacity>
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
});

export default HelloWord;
