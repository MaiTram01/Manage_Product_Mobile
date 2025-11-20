import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from './Header';
import { Product, initDatabase, fetchProducts } from './database';
import { HomeStackParamList } from './types';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    initDatabase(() => {
      loadData();
    });
  }, []);

  const loadData = async () => {
    const prods = await fetchProducts();
    setProducts(prods.reverse());
  };

  const getImageSource = (img: string) => {
    if (img.startsWith('file://')) return { uri: img };
    switch (img) {
      case 'hinh1.jpg': return require('./hinh1.jpg');
      case 'hinh2.jpg': return require('./hinh2.jpg');
      case 'hinh3.jpg': return require('./hinh3.jpg');
      case 'hinh4.jpg': return require('./hinh4.jpg');
      default: return require('./hinh1.jpg');
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={getImageSource(item.img)} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} VND</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua Ngay</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('./banner.png')} style={styles.banner} resizeMode="cover" />
      <Header />
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.menuText}>Danh mục</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>Chào mừng đến với cửa hàng thời trang ABC!</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có sản phẩm nào</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  banner: { width: '100%', height: 150 },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: '#E91E63',
    borderRadius: 25,
  },
  menuText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  welcomeText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 15,
    color: '#333',
    fontWeight: '600',
  },

  columnWrapper: { justifyContent: 'space-between' },
  productCard: {
    backgroundColor: '#fff',
    flex: 0.48,
    marginBottom: 15,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 4,
  },
  productImage: { width: '100%', height: 140, borderRadius: 10 },
  productName: { fontSize: 14, fontWeight: 'bold', marginVertical: 5, textAlign: 'center', color: '#333' },
  productPrice: { fontSize: 14, color: '#E91E63', marginBottom: 10, fontWeight: 'bold' },
  buyButton: { backgroundColor: '#E91E63', paddingVertical: 7, paddingHorizontal: 20, borderRadius: 5 },
  buyButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen;