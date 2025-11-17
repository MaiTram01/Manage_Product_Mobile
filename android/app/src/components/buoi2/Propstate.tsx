import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type ChildProps = {
  name: string;
  age: string;
  onUpdate: (newName: string, newAge: number) => void;
};

function ChildComponent({ name, age, onUpdate }: ChildProps) {
  const [newName, setNewName] = useState<string>('');
  const [newAge, setNewAge] = useState<string>('');

  const handleUpdate = () => {
    if (newName && newAge) {
      onUpdate(newName, Number(newAge));
      setNewName('');
      setNewAge('');
    }
  };

  return (
    <View style={styles.childContainer}>
      <Text style={styles.title}>Con nhận từ cha:</Text>
      <Text style={styles.infoText}>Tên: {name || '—'}</Text>
      <Text style={styles.infoText}>Tuổi: {age || '—'}</Text>

      <Text style={styles.subtitle}>Nhập tên mới và tuổi mới:</Text>
      <TextInput
        placeholder="Tên mới"
        value={newName}
        onChangeText={setNewName}
        style={styles.input}
      />
      <TextInput
        placeholder="Tuổi mới"
        value={newAge}
        onChangeText={setNewAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật cho cha</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ParentComponent() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleChildUpdate = (newName: string, newAge: number) => {
    setName(newName);
    setAge(newAge.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cha nhập thông tin:</Text>

      <TextInput
        placeholder="Nhập tên"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nhập tuổi"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.separator} />

      <ChildComponent name={name} age={age} onUpdate={handleChildUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F9FD',
    padding: 20,
    justifyContent: 'center',
  },
  childContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#CFF5E7',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00A8CC',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0078AA',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#3C4048',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#00A8CC',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 2,
    borderColor: '#00A8CC',
    marginVertical: 20,
    opacity: 0.5,
  },
});
