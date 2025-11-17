import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TextInput as RNTextInput } from 'react-native';

const LinearEquationSolver: React.FC = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [errorA, setErrorA] = useState<string>('');
  const [errorB, setErrorB] = useState<string>('');
  const inputARef = useRef<RNTextInput>(null);
  const inputBRef = useRef<RNTextInput>(null);

  const validateInput = (value: string, errorSetter: React.Dispatch<React.SetStateAction<string>>, fieldName: string): boolean => {
    if (value.trim() === '') {
      errorSetter(`${fieldName} không được để trống.`);
      return false;
    }
    if (isNaN(parseFloat(value))) {
      errorSetter(`${fieldName} phải là một số.`);
      return false;
    }
    errorSetter('');
    return true;
  };

  const solveEquation = () => {
    setErrorA('');
    setErrorB('');
    setResult('');
    let isValidA = validateInput(a, setErrorA, 'a');
    let isValidB = validateInput(b, setErrorB, 'b');
    if (!isValidA) {
      inputARef.current?.focus();
      return;
    }
    if (!isValidB) {
      inputBRef.current?.focus();
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (numA === 0) {
      if (numB === 0) {
        setResult('Phương trình có vô số nghiệm.');
      } else {
        setResult('Phương trình vô nghiệm.');
      }
    } else {
      const x = -numB / numA;
      setResult(`Nghiệm x = ${x.toFixed(2)}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giải phương trình bậc nhất</Text>
      <Text style={styles.subtitle}>Dạng: ax + b = 0</Text>

      <TextInput
        ref={inputARef}
        style={[styles.input, errorA ? styles.inputError : null]}
        placeholder="Nhập a"
        keyboardType="numeric"
        value={a}
        onChangeText={(text: string) => {
          setA(text);
          setErrorA(''); 
        }}
      />
      {errorA ? <Text style={styles.errorText}>{errorA}</Text> : null}

      <TextInput
        ref={inputBRef}
        style={[styles.input, errorB ? styles.inputError : null]}
        placeholder="Nhập b"
        keyboardType="numeric"
        value={b}
        onChangeText={(text: string) => {
          setB(text);
          setErrorB(''); 
        }}
      />
      {errorB ? <Text style={styles.errorText}>{errorB}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={solveEquation}>
        <Text style={styles.buttonText}>Giải</Text>
      </TouchableOpacity>

      {result ? (
        <Text style={styles.result}>{result}</Text>
      ) : null}
    </View>
  );
};

export default LinearEquationSolver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444', 
    borderWidth: 2,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '10%', 
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#1e40af',
    fontWeight: '500',
    textAlign: 'center',
  },
});