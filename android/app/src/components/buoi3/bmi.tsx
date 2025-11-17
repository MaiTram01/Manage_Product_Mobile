import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [categoryColor, setCategoryColor] = useState<string>('#000');

  const handleCalculate = () => {
    Keyboard.dismiss();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập chiều cao và cân nặng hợp lệ!');
      return;
    }

    const bmiValue = w / ((h / 100) * (h / 100));
    const rounded = parseFloat(bmiValue.toFixed(2));
    setBmi(rounded);
    let msg = '';
    let color = '#000';
    if (rounded < 18.5) {
      msg = 'Bạn đang thiếu cân. Hãy ăn uống đầy đủ và cân bằng hơn!';
      color = '#4DA6FF'; 
    } else if (rounded < 24.9) {
      msg = 'Cơ thể bạn đang ở mức bình thường. Tiếp tục duy trì!';
      color = '#4CAF50';
    } else if (rounded < 29.9) {
      msg = 'Bạn hơi thừa cân. Hãy tập thể dục và điều chỉnh chế độ ăn!';
      color = '#FF9800'; 
    } else {
      msg = 'Bạn đang béo phì. Nên tham khảo ý kiến bác sĩ để có kế hoạch phù hợp.';
      color = '#F44336';
    }

    setSuggestion(msg);
    setCategoryColor(color);
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setSuggestion('');
    setCategoryColor('#000');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tính chỉ số BMI</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Chiều cao (cm)"
        placeholderTextColor="#888"
        value={height}
        onChangeText={setHeight}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Cân nặng (kg)"
        placeholderTextColor="#888"
        value={weight}
        onChangeText={setWeight}
        returnKeyType="done"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.calculateButton]}
          onPress={handleCalculate}
          accessibilityLabel="Tính BMI"
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
          accessibilityLabel="Đặt lại"
        >
          <Text style={[styles.buttonText, { color: '#333' }]}>Reset</Text>
        </TouchableOpacity>
      </View>

      {bmi !== null && (
        <View style={styles.resultBox}>
          <Text style={[styles.result, { color: categoryColor }]}>
            Chỉ số BMI: {bmi}
          </Text>
          <Text style={styles.suggestion}>{suggestion}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#EDEDED',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 22,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFDF7',
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  suggestion: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default BMICalculator;
