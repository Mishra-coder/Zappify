import { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ALL_PRODUCTS } from '../data/products';
import { colors } from '../theme/colors';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['All', 'Men Low Top Sneakers', 'Men High Top Sneakers', 'Men Mid Top Sneakers', 'Men Clogs', 'Men Slip-ons'];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount, wishlistItems, user } = useApp();

  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      const searchMatch = search.trim() === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [search, activeCategory]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <Text style={styles.logo}><Text style={styles.logoZ}>Z</Text>appify</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Wishlist')}>
            <Ionicons name="heart-outline" size={22} color={colors.dark} />
            {wishlistItems.length > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{wishlistItems.length}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-outline" size={22} color={colors.dark} />
            {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Account')}>
            {user
              ? <View style={styles.avatarSmall}><Text style={{ fontSize: 12, fontWeight: '700', color: colors.white }}>{user.name[0]}</Text></View>
              : <Ionicons name="person-outline" size={22} color={colors.dark} />
            }
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={16} color={colors.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor={colors.gray}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close" size={16} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        style={styles.catList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 6, alignItems: 'center' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.catChip, activeCategory === item && styles.catChipActive]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.catText, activeCategory === item && styles.catTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { product: item })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  logo: { fontSize: 22, fontWeight: '800', color: colors.dark },
  logoZ: { color: colors.brand },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 6, position: 'relative' },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: colors.brand, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  avatarSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.lightGray, marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, marginBottom: 8 },
  searchInput: { flex: 1, fontSize: 14, color: colors.dark },
  catList: { marginBottom: 10, maxHeight: 48 },
  catChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.lightGray, marginRight: 8, height: 36, justifyContent: 'center' },
  catChipActive: { backgroundColor: colors.brand },
  catText: { fontSize: 12, fontWeight: '600', color: colors.gray },
  catTextActive: { color: colors.white },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: colors.gray, fontSize: 15 },
});
