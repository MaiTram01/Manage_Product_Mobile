import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ImageSourcePropType } from 'react-native';
import React from 'react';

const products = [
  { id: 1, name: 'Sản phẩm 1', price: '100.000đ', image: require('./hehe.jpg') },
  { id: 2, name: 'Sản phẩm 2', price: '200.000đ', image: require('./hehe.jpg') },
  { id: 3, name: 'Sản phẩm 3', price: '300.000đ', image: require('./hehe.jpg') },
  { id: 4, name: 'Sản phẩm 4', price: '150.000đ', image: require('./hehe.jpg') },
  { id: 5, name: 'Sản phẩm 5', price: '250.000đ', image: require('./hehe.jpg') },
  { id: 6, name: 'Sản phẩm 6', price: '350.000đ', image: require('./hehe.jpg') },
  { id: 7, name: 'Sản phẩm 7', price: '400.000đ', image: require('./hehe.jpg') },
  { id: 8, name: 'Sản phẩm 8', price: '500.000đ', image: require('./hehe.jpg') },
  { id: 9, name: 'Sản phẩm 9', price: '600.000đ', image: require('./hehe.jpg') },
];

const ProductCard = ({ name, price, image, onBuy }: { name: string, price: string, image: ImageSourcePropType, onBuy: () => void }) => (
  <View style={styles.productBox}>
    <Image source={image} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.price}>{price}</Text>
    <TouchableOpacity style={styles.button} onPress={onBuy}>
      <Text style={styles.buttonText}>Mua ngay</Text>
    </TouchableOpacity>
  </View>
);

const Layout = () => {
  const handleBuy = (productName: string) => {
    Alert.alert(`Bạn đã chọn mua ${productName}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onBuy={() => handleBuy(product.name)}
          />
        ))}
      </View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productBox: {
    width: '30%',
    backgroundColor: '#fdfdfd',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    color: '#e91e63',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196f3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
});
