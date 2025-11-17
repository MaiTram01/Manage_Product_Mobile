// ProductDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Product, Category, fetchCategories } from './database';
import CategorySelector from './CategorySelector';
import { RootStackParamList } from './AppNavigatorProduct';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
// ✅ Sửa lại kiểu NavigationProp để khớp với màn hình hiện tại
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { product } = route.params;

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // ✅ Sửa lại hàm getImageSource để sử dụng require tĩnh
  const getImageSource = (img: string) => {
    // Ưu tiên hình ảnh từ thư viện của người dùng (nếu có)
    if (img && img.startsWith('file://')) {
      return { uri: img };
    }

    // Ánh xạ tên tệp với các hình ảnh tĩnh trong dự án
    switch (img) {
      case 'hinh1.jpg':
        return require('./hinh1.jpg'); // Đường dẫn tĩnh
      case 'hinh2.jpg':
        return require('./hinh2.jpg'); // Đường dẫn tĩnh
      // Thêm các case khác cho các hình ảnh khác nếu cần
      // case 'hinh3.jpg':
      //   return require('./hinh3.jpg');
      default:
        // Trả về một hình ảnh mặc định nếu không tìm thấy
        return require('./hinh1.jpg');
    }
  };

  const handleSelectCategory = (id: number) => {
    const selected = categories.find(c => c.id === id);
    if (!selected) return;

    // Giờ đây lệnh navigate này hoàn toàn hợp lệ
    navigation.navigate('ProductsByCategory', {
      categoryId: selected.id,
      categoryName: selected.name,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={getImageSource(product.img)} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>

      <Text style={styles.label}>Xem các sản phẩm khác:</Text>

      <CategorySelector
        categories={categories}
        selectedId={product.categoryId}
        onSelect={handleSelectCategory}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  name: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, color: '#444', marginBottom: 10 },
  label: { fontSize: 16, marginVertical: 15, fontWeight: 'bold' },
});