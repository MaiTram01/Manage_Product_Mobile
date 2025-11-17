// CategorySelector.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Category } from './database';

interface Props {
  categories: Category[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function CategorySelector({ categories, selectedId, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.button, selectedId === cat.id && styles.activeButton]}
            onPress={() => onSelect(cat.id)}
          >
            <Text style={[styles.text, selectedId === cat.id && styles.activeText]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  activeButton: { backgroundColor: '#007bff' },
  text: { color: '#000' },
  activeText: { color: '#fff', fontWeight: 'bold' },
});
