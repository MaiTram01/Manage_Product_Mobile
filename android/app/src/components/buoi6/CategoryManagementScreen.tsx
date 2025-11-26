import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, StyleSheet, Alert 
} from 'react-native';
import { 
  fetchCategories, addCategory, updateCategory, 
  deleteCategory, Category 
} from './database';

const CategoryManagementScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const list = await fetchCategories();
    setCategories(list);
  };

  const handleAddOrUpdate = async () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên loại sản phẩm');
      return;
    }

    if (editingId) {
      await updateCategory(editingId, name);
      setEditingId(null);
    } else {
      await addCategory(name);
    }
    
    setName('');
    loadData();
  };

  const handleEdit = (item: Category) => {
    setName(item.name);
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Xóa loại sản phẩm',
      'Bạn có chắc chắn muốn xóa? (Lưu ý: Các sản phẩm thuộc loại này có thể bị ảnh hưởng)',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          style: 'destructive', 
          onPress: async () => {
            await deleteCategory(id);
            loadData();
          } 
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.btnEdit}>
          <Text style={styles.btnText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.btnDelete}>
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý Loại Sản Phẩm</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên loại sản phẩm"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={handleAddOrUpdate}>
          <Text style={styles.btnAddText}>
            {editingId ? 'Cập nhật' : 'Thêm'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có loại sản phẩm nào</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { 
    flex: 1, borderWidth: 1, borderColor: '#ccc', 
    borderRadius: 5, padding: 10, marginRight: 10 
  },
  btnAdd: { 
    backgroundColor: '#2196F3', justifyContent: 'center', 
    paddingHorizontal: 20, borderRadius: 5 
  },
  btnAddText: { color: '#fff', fontWeight: 'bold' },
  itemContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee',
    alignItems: 'center'
  },
  itemName: { fontSize: 16 },
  actionButtons: { flexDirection: 'row' },
  btnEdit: { backgroundColor: '#FFC107', padding: 8, borderRadius: 4, marginRight: 10 },
  btnDelete: { backgroundColor: '#F44336', padding: 8, borderRadius: 4 },
  btnText: { color: '#fff', fontSize: 12 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 }
});

export default CategoryManagementScreen;