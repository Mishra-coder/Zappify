import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Trash2 } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const W = Dimensions.get('window').width;

export default function WishlistScreen({ navigation }) {
  const { wishlistItems, toggleWishlist } = useApp();

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <Text style={styles.title}>MY WISHLIST</Text>
        </View>
        <View style={styles.empty}>
          <Heart size={56} color={colors.border} />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.shopBtnTxt}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.title}>MY WISHLIST</Text>
        <Text style={styles.count}>{wishlistItems.length} item{wishlistItems.length > 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={wishlistItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            activeOpacity={0.9}
          >
            <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="cover" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemBrand}>{item.brand}</Text>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹ {item.price.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => toggleWishlist(item)}>
              <Trash2 size={18} color={colors.gray} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 16, fontWeight: '800', letterSpacing: 1.5, color: colors.dark },
  count: { fontSize: 13, color: colors.gray },
  list: { padding: 16, gap: 12 },
  item: { flexDirection: 'row', gap: 14, backgroundColor: colors.white, borderRadius: 14, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  itemImg: { width: 90, height: 90, borderRadius: 12, backgroundColor: colors.lightGray },
  itemInfo: { flex: 1, justifyContent: 'center' },
  itemBrand: { fontSize: 10, fontWeight: '700', color: colors.gray, letterSpacing: 1, marginBottom: 4 },
  itemName: { fontSize: 14, fontWeight: '700', color: colors.dark, marginBottom: 8 },
  itemPrice: { fontSize: 16, fontWeight: '800', color: colors.dark },
  removeBtn: { padding: 4, alignSelf: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.gray },
  shopBtn: { backgroundColor: colors.brand, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  shopBtnTxt: { color: colors.white, fontWeight: '700', fontSize: 13 },
});
