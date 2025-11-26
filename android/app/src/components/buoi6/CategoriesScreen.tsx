// CategoriesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { Category, fetchCategories } from './database';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  // Hàm render từng ô danh mục
  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => 
        navigation.navigate('ProductsByCategory', { 
          categoryId: item.id, 
          categoryName: item.name 
        })
      }
    >
      {/* Bạn có thể thêm icon cho danh mục ở đây nếu muốn */}
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tất cả danh mục</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // Hiển thị 2 cột
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  row: { justifyContent: 'space-between' },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    width: '48%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3, // Tạo bóng đổ cho đẹp
    borderWidth: 1,
    borderColor: '#eee'
  },
  iconBox: {
    width: 50, height: 50, backgroundColor: '#E91E63', borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
  iconText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  itemText: { fontSize: 16, fontWeight: '600', color: '#333' },
});

export default CategoriesScreen;