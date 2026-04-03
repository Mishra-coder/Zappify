import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, ShoppingBag, ShieldCheck, RotateCcw, X } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const SIZES = ['7', '8', '9', '10', '11'];
const SIZE_CHART = [
  { uk: '6', us: '7', eu: '39', cm: '24.5' },
  { uk: '7', us: '8', eu: '40', cm: '25.5' },
  { uk: '8', us: '9', eu: '41', cm: '26' },
  { uk: '9', us: '10', eu: '42', cm: '27' },
  { uk: '10', us: '11', eu: '43', cm: '27.5' },
  { uk: '11', us: '12', eu: '44', cm: '28.5' },
];

const W = Dimensions.get('window').width;

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) { Alert.alert('Select Size', 'Please select a size first'); return; }
    addToCart(product, selectedSize);
    Alert.alert('Added!', `${product.name} (UK ${selectedSize}) added to cart`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={styles.topTitle} numberOfLines={1}>{product.name}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

        <View style={styles.body}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>₹ {product.price.toLocaleString('en-IN')}</Text>

          <Text style={styles.desc}>{product.description}</Text>

          <View style={styles.sizeHeader}>
            <Text style={styles.sizeTitle}>SELECT SIZE (UK)</Text>
            <TouchableOpacity onPress={() => setShowChart(true)}>
              <Text style={styles.chartLink}>SIZE CHART</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sizesRow}>
            {SIZES.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.sizeBtn, selectedSize === s && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(s)}
              >
                <Text style={[styles.sizeTxt, selectedSize === s && styles.sizeTxtActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.badges}>
            <View style={styles.badgeItem}><ShieldCheck size={16} color={colors.brand} /><Text style={styles.badgeTxt}>100% Authentic</Text></View>
            <View style={styles.badgeItem}><RotateCcw size={16} color={colors.brand} /><Text style={styles.badgeTxt}>30-Day Returns</Text></View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.wishlistBtn, wishlisted && styles.wishlistBtnActive]}
          onPress={() => toggleWishlist(product)}
        >
          <Heart size={20} color={wishlisted ? colors.brand : colors.gray} fill={wishlisted ? colors.brand : 'none'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <ShoppingBag size={18} color={colors.white} />
          <Text style={styles.cartBtnTxt}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showChart} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>UK SIZE CHART</Text>
              <TouchableOpacity onPress={() => setShowChart(false)}><X size={20} color={colors.gray} /></TouchableOpacity>
            </View>
            <View style={styles.tableHeader}>
              {['UK', 'US', 'EU', 'CM'].map(h => <Text key={h} style={styles.tableHead}>{h}</Text>)}
            </View>
            {SIZE_CHART.map(row => (
              <View key={row.uk} style={[styles.tableRow, selectedSize === row.uk && styles.tableRowActive]}>
                {[row.uk, row.us, row.eu, row.cm].map((v, i) => (
                  <Text key={i} style={[styles.tableCell, selectedSize === row.uk && styles.tableCellActive]}>{v}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  backBtn: { padding: 4 },
  topTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.dark, marginHorizontal: 8 },
  image: { width: W, height: W * 0.85, backgroundColor: colors.lightGray },
  body: { padding: 20 },
  brand: { fontSize: 11, fontWeight: '700', color: colors.gray, letterSpacing: 1.5, marginBottom: 4 },
  name: { fontSize: 22, fontWeight: '800', color: colors.dark, marginBottom: 4 },
  category: { fontSize: 13, color: colors.gray, marginBottom: 10 },
  price: { fontSize: 24, fontWeight: '900', color: colors.dark, marginBottom: 16 },
  desc: { fontSize: 14, color: colors.slate, lineHeight: 22, marginBottom: 20 },
  sizeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sizeTitle: { fontSize: 13, fontWeight: '800', color: colors.dark, letterSpacing: 1 },
  chartLink: { fontSize: 12, fontWeight: '700', color: colors.brand, textDecorationLine: 'underline' },
  sizesRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  sizeBtn: { width: 48, height: 48, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  sizeBtnActive: { borderColor: colors.brand, backgroundColor: colors.brand },
  sizeTxt: { fontSize: 14, fontWeight: '700', color: colors.dark },
  sizeTxtActive: { color: colors.white },
  badges: { flexDirection: 'row', gap: 16 },
  badgeItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badgeTxt: { fontSize: 12, color: colors.slate, fontWeight: '500' },
  footer: { flexDirection: 'row', padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: colors.border },
  wishlistBtn: { width: 52, height: 52, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  wishlistBtnActive: { borderColor: colors.brand, backgroundColor: colors.brandLight },
  cartBtn: { flex: 1, height: 52, backgroundColor: colors.brand, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  cartBtnTxt: { color: colors.white, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalBox: { backgroundColor: colors.white, borderRadius: 16, padding: 20, width: W - 60 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.lightGray, borderRadius: 8, paddingVertical: 8, marginBottom: 4 },
  tableHead: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '700', color: colors.slate },
  tableRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  tableRowActive: { backgroundColor: colors.brandLight },
  tableCell: { flex: 1, textAlign: 'center', fontSize: 13, color: colors.dark },
  tableCellActive: { fontWeight: '700', color: colors.brand },
});
