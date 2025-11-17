// HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { Product, initDatabase, fetchProducts } from './database'; // Import DB functions and Product type

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

// Helper function to handle both local and database image paths
const getImageSource = (img: string) => {
  if (img && img.startsWith('file://')) {
    return { uri: img }; // For images selected from the user's device
  }
  switch (img) {
    case 'hinh1.jpg': return require('./hinh1.jpg');
    case 'hinh2.jpg': return require('./hinh2.jpg');
    case 'hinh3.jpg': return require('./hinh3.jpg');
    case 'hinh4.jpg': return require('./hinh4.jpg');
    default: return require('./hinh1.jpg'); // Fallback image
  }
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from the database when the screen mounts
  useEffect(() => {
    initDatabase(loadProducts);
  }, []);

  const loadProducts = async () => {
    const prods = await fetchProducts();
    setProducts(prods);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { product: item })} style={styles.productCard}>
      <Image source={getImageSource(item.img)} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua Ngay</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('./banner.png')} style={styles.banner} />
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.menuText}>Giới thiệu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.menuText}>Danh mục</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>Chào mừng đến với cửa hàng thời trang ABC!</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có sản phẩm nào.</Text>}
      />
    </View>
  );
};

// Paste the original styles from your HomeScreen.tsx here
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  banner: { width: '100%', height: 130, resizeMode: 'cover' },
  menuContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: '#fff', elevation: 4 },
  menuText: { fontSize: 16, fontWeight: '600', color: '#333' },
  welcomeText: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginVertical: 15, color: '#444' },
  listContainer: { paddingBottom: 25 },
  productCard: { flex: 1, backgroundColor: '#fff', margin: 8, borderRadius: 12, padding: 12, alignItems: 'center', elevation: 5 },
  productImage: { width: '100%', height: 120, resizeMode: 'contain', borderRadius: 8, backgroundColor: '#fafafa' },
  productName: { marginTop: 8, fontSize: 15, fontWeight: '600', color: '#222', textAlign: 'center' },
  productPrice: { fontSize: 15, color: '#E91E63', fontWeight: 'bold', marginVertical: 8 },
  buyButton: { width: '100%', backgroundColor: '#ff3b6b', paddingVertical: 10, borderRadius: 8 },
  buyButtonText: { color: '#fff', fontSize: 15, fontWeight: '600', textAlign: 'center' },
});

export default HomeScreen;