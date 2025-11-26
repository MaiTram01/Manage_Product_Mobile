// AppNavigatorProduct.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sanpham3Sqlite from './Sanpham3Sqlite';
import ProductDetailScreen from './ProductDetailScreen';
import ProductsByCategoryScreen from './ProductsByCategoryScreen';
import CategoryManagementScreen from './CategoryManagementScreen'; 
import { Product } from './database';

export type RootStackParamList = {
  Sanpham3Sqlite: undefined;
  ProductDetail: { product: Product };
  ProductsByCategory: { categoryId: number; categoryName?: string };
  CategoryManagement: undefined; // Thêm route này
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigatorProduct() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sanpham3Sqlite" component={Sanpham3Sqlite} options={{ title: 'Quản lý Sản phẩm' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen} />
      
      {/* Thêm màn hình quản lý loại */}
      <Stack.Screen name="CategoryManagement" component={CategoryManagementScreen} options={{ title: 'Quản lý Loại' }} />
    </Stack.Navigator>
  );
}