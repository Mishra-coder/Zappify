import { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ALL_PRODUCTS } from '../data/products';
import { colors } from '../theme/colors';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');
const CATEGORIES = ['All', 'Men Low Top Sneakers', 'Men High Top Sneakers', 'Men Mid Top Sneakers', 'Men Clogs', 'Men Slip-ons'];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount, wishlistItems, user } = useApp();

  const filtered = useMemo(() => {
    const res = ALL_PRODUCTS.filter(p => {
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      const searchMatch = search.trim() === '' ||
        p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        p.brand.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      return catMatch && searchMatch;
    });

    if (search.toLowerCase() === 'nike') {
      return res.sort((a, b) => a.name.localeCompare(b.name));
    }
    return res;
  }, [search, activeCategory]);

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.logo}>Zappify</Text>
        </View>
        <View style={styles.headerActions}>
           <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Wishlist')}>
            <Ionicons name="heart-outline" size={24} color={colors.dark} />
            {wishlistItems.length > 0 && <View style={styles.badge} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-handle-outline" size={24} color={colors.dark} />
            {cartCount > 0 && <View style={styles.badge} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search premium kicks..."
            placeholderTextColor={colors.gray}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {!search && (
        <View style={styles.heroContainer}>
          <View style={styles.heroLeft}>
            <Image 
              source={require('../../assets/hero-nike.png')} 
              style={styles.heroImage} 
              resizeMode="contain"
            />
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroTag}>SPRING COLLECTION 2026</Text>
            <Text style={styles.heroTitle}>Experience The{'\n'}Future of{'\n'}Streetwear</Text>
            <Text style={styles.heroSubtitle}>Unmatched comfort. Uncompromising style.</Text>
            <TouchableOpacity style={styles.heroBtn} onPress={() => { setSearch('Nike'); setActiveCategory('All'); }}>
              <Text style={styles.heroBtnText}>EXPLORE NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        style={styles.catList}
        contentContainerStyle={styles.catContent}
        renderItem={({ item }) => {
          let categoryLabel = item;
          if (item.indexOf('Men ') === 0) {
            categoryLabel = item.substring(4);
          }
          
          return (
            <TouchableOpacity
              style={[styles.catChip, activeCategory === item && styles.catChipActive]}
              onPress={() => setActiveCategory(item)}
            >
              <Text style={[styles.catText, activeCategory === item && styles.catTextActive]}>
                {categoryLabel}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <StatusBar barStyle="light-content" />
      <FlatList
        data={filtered}
        ListHeaderComponent={renderHeader}
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
            <Ionicons name="search" size={48} color={colors.gray} />
            <Text style={styles.emptyText}>No kicks found for your search</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  greeting: { fontSize: 13, color: colors.gray, fontWeight: '500' },
  logo: { fontSize: 24, fontWeight: '900', color: colors.dark, letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', gap: 12 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brand, borderWidth: 1.5, borderColor: colors.white },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 15, paddingHorizontal: 15, height: 50, gap: 10, shadowColor: colors.dark, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  searchInput: { flex: 1, fontSize: 15, color: colors.dark, fontWeight: '500' },
  filterBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: colors.dark, alignItems: 'center', justifyContent: 'center' },
  heroContainer: { 
    marginHorizontal: 20, 
    height: 150, 
    borderRadius: 20, 
    overflow: 'hidden', 
    marginBottom: 15, 
    backgroundColor: '#000000',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8
  },
  heroLeft: { flex: 1, position: 'relative', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  heroRight: { flex: 1.2, padding: 15, justifyContent: 'center' },
  heroRedBackdrop: { display: 'none' },
  heroImage: { width: '100%', height: '100%', transform: [{ rotate: '-5deg' }] },
  heroTag: { color: '#FF6B00', fontSize: 8, fontWeight: '900', letterSpacing: 2, marginBottom: 5, textTransform: 'uppercase' },
  heroTitle: { color: colors.white, fontSize: 13, fontWeight: '900', lineHeight: 16, marginBottom: 4 },
  heroSubtitle: { color: '#94A3B8', fontSize: 9, fontWeight: '500', lineHeight: 12, maxWidth: '95%', marginBottom: 4 },
  heroBtn: { 
    marginTop: 8, 
    backgroundColor: '#FF6B00', 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  heroBtnText: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  catList: { marginBottom: 20 },
  catContent: { paddingHorizontal: 20, gap: 10 },
  catChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  catChipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  catText: { fontSize: 13, fontWeight: '700', color: colors.gray },
  catTextActive: { color: colors.white },
  grid: { paddingBottom: 20 },
  row: { paddingHorizontal: 15, justifyContent: 'space-between' },
  empty: { alignItems: 'center', marginTop: 100, gap: 10 },
  emptyText: { color: colors.gray, fontSize: 14, fontWeight: '500' },
});
