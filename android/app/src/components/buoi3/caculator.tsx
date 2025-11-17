import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    if (num1.trim() === '' || num2.trim() === '' || isNaN(Number(num1)) || isNaN(Number(num2))) {
      Alert.alert('Lỗi', 'Vui lòng nhập đúng hai số!');
      return;
    }

    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let res = 0;
    let message = '';
    switch (operation) {
      case 'add':
        res = a + b;
        message = `Kết quả: ${res.toFixed(2)}`;
        break;
      case 'sub':
        res = a - b;
        message = `Kết quả: ${res.toFixed(2)}`;
        break;
      case 'mul':
        res = a * b;
        message = `Kết quả: ${res.toFixed(2)}`;
        break;
      case 'div':
        if (b === 0) {
          message = 'Không thể chia cho 0!';
        } else {
          res = a / b;
          message = `Kết quả: ${res.toFixed(2)}`;
        }
        break;
      case 'compare':
        if (a > b) message = `${a} lớn hơn ${b}`;
        else if (a < b) message = `${a} nhỏ hơn ${b}`;
        else message = `${a} bằng ${b}`;
        break;
      default:
        message = 'Chưa chọn phép toán';
    }
    setResult(message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bảng tính đơn giản</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Nhập số thứ nhất"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Nhập số thứ hai"
        value={num2}
        onChangeText={setNum2}
      />
      <View style={styles.radioGroup}>
        <Text style={styles.label}>Chọn phép toán:</Text>
        <RadioButton.Group onValueChange={setOperation} value={operation}>
          <View style={styles.radioRow}>
            <View style={styles.radioItem}>
              <RadioButton value="add" />
              <Text>Cộng</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="sub" />
              <Text>Trừ</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="mul" />
              <Text>Nhân</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="div" />
              <Text>Chia</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="compare" />
              <Text>So sánh</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <Button title="Tính" onPress={handleCalculate} />
      {result && (
        <Text style={styles.result}>{result}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  radioGroup: {
    marginVertical: 16,
    width: '90%',
  },
  radioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Calculator;
