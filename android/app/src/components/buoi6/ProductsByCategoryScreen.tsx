// ProductsByCategoryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigatorProduct';
import { Product, Category, fetchCategories, fetchProductsByCategory } from './database';
import CategorySelector from './CategorySelector';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductsByCategory'>;
type RouteProps = RouteProp<RootStackParamList, 'ProductsByCategory'>;

export default function ProductsByCategoryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { categoryId } = route.params;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  useEffect(() => { fetchCategories().then(setCategories); }, []);

  useEffect(() => { fetchProductsByCategory(selectedCategoryId).then(setProducts); }, [selectedCategoryId]);

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

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <CategorySelector
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={setSelectedCategoryId}
      />

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có sản phẩm</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            {/* Hàm này giờ đã an toàn để sử dụng */}
            <Image source={getImageSource(item.img)} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.price.toLocaleString()} đ</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', padding: 10, marginBottom: 10,
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6
  },
  image: { width: 80, height: 80, marginRight: 10 },
  info: { justifyContent: 'center' },
  name: { fontWeight: 'bold' }
});