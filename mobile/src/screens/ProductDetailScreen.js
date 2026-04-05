import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeTop}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.dark} />
          </TouchableOpacity>
          <Text style={styles.topTitle}>{product.brand}</Text>
          <TouchableOpacity onPress={() => toggleWishlist(product)} style={styles.iconBtn}>
            <Ionicons name={wishlisted ? 'heart' : 'heart-outline'} size={24} color={wishlisted ? colors.brand : colors.dark} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <Image
            source={typeof product.image === 'string' ? { uri: product.image } : product.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>{product.category}</Text>
            </View>
            <Text style={styles.price}>₹ {product.price.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.desc}>{product.description}</Text>

          <View style={styles.sizeSection}>
            <View style={styles.sizeHeader}>
              <Text style={styles.sectionTitle}>Select Size (UK)</Text>
              <TouchableOpacity onPress={() => setShowChart(true)}>
                <Text style={styles.chartLink}>Size Guide</Text>
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
          </View>

          <View style={styles.perks}>
            <View style={styles.perkItem}>
              <Ionicons name="shield-checkmark" size={20} color={colors.success} />
              <View>
                <Text style={styles.perkTitle}>Authentic Product</Text>
                <Text style={styles.perkSub}>Verified & Quality Checked</Text>
              </View>
            </View>
            <View style={styles.perkItem}>
              <Ionicons name="airplane-outline" size={20} color={colors.brand} />
              <View>
                <Text style={styles.perkTitle}>Expedited Shipping</Text>
                <Text style={styles.perkSub}>Delivery in 2-3 Business Days</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Ionicons name="bag-handle" size={20} color={colors.white} />
          <Text style={styles.cartBtnTxt}>Add to Cart • ₹{product.price.toLocaleString('en-IN')}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showChart} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>UK Size Chart</Text>
              <TouchableOpacity onPress={() => setShowChart(false)} style={styles.modalClose}>
                <Ionicons name="close" size={24} color={colors.dark} />
              </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  safeTop: { backgroundColor: colors.white },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.lightGray, alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontSize: 16, fontWeight: '800', letterSpacing: 0.5, color: colors.dark, textTransform: 'uppercase' },
  scroll: { paddingBottom: 100 },
  imageContainer: { width: W, height: W, backgroundColor: '#F8F9FA', alignItems: 'center', justifyContent: 'center' },
  image: { width: '85%', height: '85%' },
  body: { padding: 25, marginTop: -30, backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: '900', color: colors.dark, flex: 1, marginRight: 10 },
  category: { fontSize: 14, color: colors.gray, fontWeight: '600', marginTop: 4 },
  price: { fontSize: 22, fontWeight: '900', color: colors.brand },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.dark, marginBottom: 12 },
  desc: { fontSize: 15, color: colors.slate, lineHeight: 24, fontWeight: '400' },
  sizeSection: { marginTop: 25 },
  sizeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  chartLink: { fontSize: 13, fontWeight: '700', color: colors.brand },
  sizesRow: { flexDirection: 'row', gap: 12 },
  sizeBtn: { flex: 1, height: 50, borderRadius: 15, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  sizeBtnActive: { borderColor: colors.dark, backgroundColor: colors.dark },
  sizeTxt: { fontSize: 15, fontWeight: '700', color: colors.dark },
  sizeTxtActive: { color: colors.white },
  perks: { marginTop: 30, gap: 20 },
  perkItem: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  perkTitle: { fontSize: 14, fontWeight: '700', color: colors.dark },
  perkSub: { fontSize: 12, color: colors.gray, fontWeight: '500' },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, paddingBottom: 35, backgroundColor: colors.white, shadowColor: colors.dark, shadowOpacity: 0.1, shadowRadius: 10, elevation: 10, borderTopWidth: 1, borderTopColor: colors.border },
  cartBtn: { height: 60, backgroundColor: '#D83100', borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  cartBtnTxt: { color: colors.white, fontWeight: '800', fontSize: 16, letterSpacing: 0.5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.8)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  modalClose: { padding: 5 },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.lightGray, borderRadius: 12, paddingVertical: 12, marginBottom: 8 },
  tableHead: { flex: 1, textAlign: 'center', fontSize: 13, fontWeight: '800', color: colors.slate },
  tableRow: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border },
  tableRowActive: { backgroundColor: colors.brandLight },
  tableCell: { flex: 1, textAlign: 'center', fontSize: 14, color: colors.dark, fontWeight: '500' },
  tableCellActive: { fontWeight: '800', color: colors.brand },
});
