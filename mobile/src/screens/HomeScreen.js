import { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ALL_PRODUCTS } from '../data/products';
import { colors } from '../theme/colors';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Running', 'Lifestyle', 'Basketball', 'Training & Gym', 'Jordan', 'Skateboarding', 'Walking'];
const GENDER_TABS = ['ALL', 'MEN', 'SNEAKERS'];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeGender, setActiveGender] = useState('ALL');
  const [showNikeBanner, setShowNikeBanner] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { cartCount, wishlistItems } = useApp();

  const filtered = useMemo(() => {
    const catMatch = (p) => selectedCategories.length === 0 || selectedCategories.includes(p.category);

    const searchMatch = (p) => {
      if (search.trim() === '') return true;
      const q = search.toLowerCase();
      return p.name.toLowerCase().indexOf(q) !== -1 || p.brand.toLowerCase().indexOf(q) !== -1;
    };

    if (showNikeBanner) {
      return ALL_PRODUCTS.filter(p => p.brand === 'NIKE' && !p.gender && catMatch(p) && searchMatch(p));
    }

    if (activeGender === 'MEN') {
      const menProducts = ALL_PRODUCTS.filter(p => p.gender === 'MEN' && catMatch(p) && searchMatch(p));
      const nikeOriginal = ALL_PRODUCTS.filter(p => !p.gender && catMatch(p) && searchMatch(p));
      return [...menProducts, ...nikeOriginal];
    }

    if (activeGender === 'SNEAKERS') {
      return ALL_PRODUCTS.filter(p => p.brand === 'NIKE' && !p.gender && catMatch(p) && searchMatch(p));
    }

    return ALL_PRODUCTS.filter(p => catMatch(p) && searchMatch(p));
  }, [search, activeGender, showNikeBanner, selectedCategories]);

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logoZ}>Z</Text>
          <Text style={styles.logoRest}>appify</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Wishlist')}>
            <Ionicons name="heart-outline" size={22} color={colors.dark} />
            {wishlistItems.length > 0 && <View style={styles.badge} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-handle-outline" size={22} color={colors.dark} />
            {cartCount > 0 && <View style={styles.badge} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Account')}>
            <Ionicons name="person-outline" size={22} color={colors.dark} />
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
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {!search && (
        <View style={styles.heroContainer}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTag}>SPRING COLLECTION 2026</Text>
            <Text style={styles.heroTitle}>Experience The{'\n'}Future of{'\n'}Streetwear</Text>
            <Text style={styles.heroSubtitle}>Unmatched comfort. Uncompromising style. Crafted for those who move.</Text>
            <TouchableOpacity style={styles.heroBtn} onPress={() => { setShowNikeBanner(true); setSearch('Nike'); }}>
              <Text style={styles.heroBtnText}>EXPLORE NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroRight}>
            <Image
              source={require('../../assets/hero-nike.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>
        </View>
      )}

      <View style={styles.genderTabsRow}>
        {GENDER_TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.genderTab, activeGender === tab && styles.genderTabActive]}
            onPress={() => { setActiveGender(tab); setShowNikeBanner(false); setSearch(''); }}
          >
            <Text style={[styles.genderTabText, activeGender === tab && styles.genderTabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showNikeBanner && (
        <View style={styles.nikeBanner}>
          <View style={styles.nikeBannerContent}>
            <Text style={styles.nikeBannerTag}>SPRING COLLECTION 2026</Text>
            <Text style={styles.nikeBannerTitle}>20 Iconic{'\n'}Nike Shoes</Text>
            <Text style={styles.nikeBannerSub}>Handpicked for you</Text>
            <TouchableOpacity style={styles.nikeBannerBtn} onPress={() => { setShowNikeBanner(false); setSearch(''); }}>
              <Text style={styles.nikeBannerBtnTxt}>← Back to All</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../assets/hero-nike.png')} style={styles.nikeBannerImg} resizeMode="contain" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
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

      <Modal visible={showFilter} transparent animationType="slide">
        <View style={styles.filterOverlay}>
          <View style={styles.filterSheet}>
            <View style={styles.filterSheetHeader}>
              <Text style={styles.filterSheetTitle}>CATEGORIES</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close" size={22} color={colors.dark} />
              </TouchableOpacity>
            </View>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={styles.filterOption}
                onPress={() => {
                  if (selectedCategories.includes(cat)) {
                    setSelectedCategories(selectedCategories.filter(c => c !== cat));
                  } else {
                    setSelectedCategories([...selectedCategories, cat]);
                  }
                }}
              >
                <View style={[styles.filterCheck, selectedCategories.includes(cat) && styles.filterCheckActive]}>
                  {selectedCategories.includes(cat) && <Ionicons name="checkmark" size={14} color={colors.white} />}
                </View>
                <Text style={styles.filterOptionTxt}>{cat}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.filterBtnRow}>
              <TouchableOpacity style={styles.filterClearBtn} onPress={() => setSelectedCategories([])}>
                <Text style={styles.filterClearTxt}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterApplyBtn} onPress={() => setShowFilter(false)}>
                <Text style={styles.filterApplyTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoZ: { fontSize: 26, fontWeight: '900', color: '#FF6B00', letterSpacing: -1 },
  logoRest: { fontSize: 26, fontWeight: '900', color: colors.dark, letterSpacing: -1 },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.lightGray, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#D83100', borderWidth: 1.5, borderColor: colors.white },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 20 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 15, paddingHorizontal: 15, height: 50, gap: 10, shadowColor: colors.dark, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  searchInput: { flex: 1, fontSize: 15, color: colors.dark, fontWeight: '500' },
  filterBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: colors.dark, alignItems: 'center', justifyContent: 'center' },
  heroContainer: { marginHorizontal: 20, height: 200, borderRadius: 20, overflow: 'hidden', marginBottom: 15, backgroundColor: '#000000', flexDirection: 'row', shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  heroLeft: { flex: 1.3, padding: 16, justifyContent: 'center' },
  heroRight: { flex: 1, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  heroImage: { width: '120%', height: '120%', transform: [{ rotate: '-5deg' }] },
  heroTag: { color: '#FF6B00', fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' },
  heroTitle: { color: colors.white, fontSize: 16, fontWeight: '900', lineHeight: 20, marginBottom: 6 },
  heroSubtitle: { color: '#94A3B8', fontSize: 11, fontWeight: '500', lineHeight: 15, marginBottom: 10 },
  heroBtn: { backgroundColor: '#FF6B00', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, alignSelf: 'flex-start' },
  heroBtnText: { color: colors.white, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  genderTabsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 14, gap: 10 },
  genderTab: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center' },
  genderTabActive: { backgroundColor: '#D83100', borderColor: '#D83100' },
  genderTabText: { fontSize: 14, fontWeight: '800', color: colors.gray, letterSpacing: 1 },
  genderTabTextActive: { color: colors.white },
  nikeBanner: { marginHorizontal: 16, marginBottom: 14, backgroundColor: '#000', borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  nikeBannerContent: { flex: 1 },
  nikeBannerTag: { color: '#FF6B00', fontSize: 9, fontWeight: '800', letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' },
  nikeBannerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', lineHeight: 24, marginBottom: 4 },
  nikeBannerSub: { color: '#64748B', fontSize: 12, marginBottom: 12 },
  nikeBannerBtn: { borderWidth: 1.5, borderColor: '#333', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start' },
  nikeBannerBtnTxt: { color: '#aaa', fontSize: 11, fontWeight: '700' },
  nikeBannerImg: { width: 110, height: 100, transform: [{ rotate: '-8deg' }] },
  grid: { paddingBottom: 20 },
  row: { paddingHorizontal: 15, justifyContent: 'space-between' },
  empty: { alignItems: 'center', marginTop: 100, gap: 10 },
  emptyText: { color: colors.gray, fontSize: 14, fontWeight: '500' },
  filterOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  filterSheet: { backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  filterSheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  filterSheetTitle: { fontSize: 14, fontWeight: '800', letterSpacing: 1.5, color: colors.dark },
  filterOption: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  filterCheck: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  filterCheckActive: { backgroundColor: '#D83100', borderColor: '#D83100' },
  filterOptionTxt: { fontSize: 15, fontWeight: '600', color: colors.dark },
  filterBtnRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  filterClearBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center' },
  filterClearTxt: { fontSize: 13, fontWeight: '700', color: colors.gray },
  filterApplyBtn: { flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: '#D83100', alignItems: 'center' },
  filterApplyTxt: { fontSize: 13, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
});
