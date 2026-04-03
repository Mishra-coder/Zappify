import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const W = Dimensions.get('window').width;
const CARD_W = (W - 36) / 2;

export default function ProductCard({ product, onPress }) {
  const { toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);

  return (
    <TouchableOpacity style={[styles.card, { width: CARD_W }]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        {product.isTrending && (
          <View style={styles.trendBadge}>
            <Ionicons name="trending-up" size={10} color={colors.white} />
            <Text style={styles.trendText}>Trending</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.wishBtn, wishlisted && styles.wishBtnActive]}
          onPress={() => toggleWishlist(product)}
        >
          <Ionicons name={wishlisted ? 'heart' : 'heart-outline'} size={16} color={wishlisted ? colors.brand : colors.gray} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.category} numberOfLines={1}>{product.category}</Text>
        <Text style={styles.price}>₹ {product.price.toLocaleString('en-IN')}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 14, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  imageWrap: { position: 'relative' },
  image: { width: '100%', height: CARD_W, backgroundColor: colors.lightGray },
  trendBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: colors.brand, borderRadius: 6, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 3, gap: 3 },
  trendText: { color: colors.white, fontSize: 9, fontWeight: '700' },
  wishBtn: { position: 'absolute', top: 8, right: 8, backgroundColor: colors.white, borderRadius: 20, padding: 6, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  wishBtnActive: { backgroundColor: colors.brandLight },
  info: { padding: 10 },
  brand: { fontSize: 10, fontWeight: '700', color: colors.gray, letterSpacing: 1, marginBottom: 2 },
  name: { fontSize: 13, fontWeight: '700', color: colors.dark, marginBottom: 2 },
  category: { fontSize: 11, color: colors.gray, marginBottom: 6 },
  price: { fontSize: 14, fontWeight: '800', color: colors.dark },
});
