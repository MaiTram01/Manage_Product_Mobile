import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

interface Student {
  id: number;
  name: string;
  age: number;
  grade: number;
}

const StudentManager = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "An", age: 18, grade: 8.5 },
    { id: 2, name: "Bình", age: 19, grade: 7.0 },
    { id: 3, name: "Chi", age: 20, grade: 9.0 },
    { id: 4, name: "Duy", age: 17, grade: 6.5 },
    { id: 5, name: "Hoa", age: 21, grade: 8.2 },
  ]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const addStudent = () => {
    if (!name || !age || !grade) {
      Alert.alert("Vui lòng nhập đủ thông tin!");
      return;
    }
    if (editId) {
      setStudents(students.map(s => s.id === editId ? { ...s, name, age: +age, grade: +grade } : s));
      setEditId(null);
    } else {
      const newStudent: Student = { id: Date.now(), name, age: +age, grade: +grade };
      setStudents([...students, newStudent]);
    }
    setName(""); 
    setAge(""); 
    setGrade("");
  };

  const editStudent = (id: number) => {
    const s = students.find(stu => stu.id === id);
    if (!s) return;
    setName(s.name);
    setAge(s.age.toString());
    setGrade(s.grade.toString());
    setEditId(id);
  };
  const confirmDelete = (id: number) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa học sinh này không?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", style: "destructive", onPress: () => deleteStudent(id) }
      ]
    );
  };
  const deleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.age.toString().includes(search) ||
    s.grade.toString().includes(search)
  );

  const countHighGrades = students.filter(s => s.grade > 8).length;

  const sortedStudents = [...filteredStudents].sort((a, b) => b.grade - a.grade);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản Lý Danh Sách Học Sinh</Text>

      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm học sinh theo tên, tuổi hoặc điểm"
        value={search}
        onChangeText={setSearch}
      />
      <TextInput style={styles.input} placeholder="Nhập tên học sinh" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Nhập tuổi" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Nhập điểm" value={grade} onChangeText={setGrade} keyboardType="numeric" />

      <Button title={editId ? "CẬP NHẬT HỌC SINH" : "THÊM HỌC SINH"} onPress={addStudent} />

      <Text style={styles.count}>Số học sinh có điểm trên 8: {countHighGrades}</Text>

      <FlatList 
        style={{ maxHeight: 400}}
        data={sortedStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.index}>#{index + 1}</Text>
            <Text>Tên: {item.name}</Text>
            <Text>Tuổi: {item.age}</Text>
            <Text>Điểm: {item.grade}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editStudent(item.id)}>
                <Text style={styles.edit}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                    <Text style={styles.delete}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 30 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10, padding: 8 },
  item: { backgroundColor: "#f9f9f9", padding: 10, marginTop: 10, borderRadius: 5, marginBottom: 20, borderWidth: 1, borderColor: "#ddd" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
  edit: { color: "green", fontWeight: "bold" },
  delete: { color: "red", fontWeight: "bold" },
  count: { marginVertical: 10, fontWeight: "bold" },
  index: { fontWeight: "bold",marginBottom: 5,color: "#555"},
});

export default StudentManager;
