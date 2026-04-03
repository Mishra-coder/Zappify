import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, cartTotal, user } = useApp();
  const shipping = cartTotal > 999 ? 0 : 99;

  const handleCheckout = () => {
    if (!user) { navigation.navigate('Login'); return; }
    navigation.navigate('Checkout');
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <Text style={styles.title}>SHOPPING BAG</Text>
        </View>
        <View style={styles.empty}>
          <Ionicons name="bag-outline" size={56} color={colors.border} />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
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
        <Text style={styles.title}>SHOPPING BAG</Text>
        <Text style={styles.count}>{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item, i) => `${item.id}-${item.size}-${i}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImg} resizeMode="cover" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemMeta}>Size: UK {item.size}  ·  Qty: {item.qty}</Text>
              <Text style={styles.itemPrice}>₹ {(item.price * item.qty).toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.id, item.size)}>
              <Ionicons name="trash-outline" size={18} color={colors.gray} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.billRow}><Text style={styles.billLabel}>Cart Total</Text><Text style={styles.billVal}>₹ {cartTotal.toLocaleString('en-IN')}</Text></View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Shipping</Text>
          <Text style={[styles.billVal, { color: colors.success }]}>{shipping === 0 ? 'FREE' : `₹ ${shipping}`}</Text>
        </View>
        <View style={[styles.billRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalVal}>₹ {(cartTotal + shipping).toLocaleString('en-IN')}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutTxt}>PROCEED TO CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 16, fontWeight: '800', letterSpacing: 1.5, color: colors.dark },
  count: { fontSize: 13, color: colors.gray },
  list: { padding: 16, gap: 12 },
  item: { flexDirection: 'row', gap: 12, backgroundColor: colors.white, borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  itemImg: { width: 80, height: 80, borderRadius: 10, backgroundColor: colors.lightGray },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '700', color: colors.dark, marginBottom: 4 },
  itemMeta: { fontSize: 12, color: colors.gray, marginBottom: 6 },
  itemPrice: { fontSize: 15, fontWeight: '800', color: colors.brand },
  removeBtn: { padding: 4 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: colors.border, gap: 8 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between' },
  billLabel: { fontSize: 14, color: colors.gray },
  billVal: { fontSize: 14, fontWeight: '600', color: colors.dark },
  totalRow: { paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: colors.dark },
  totalVal: { fontSize: 18, fontWeight: '900', color: colors.dark },
  checkoutBtn: { backgroundColor: colors.brand, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  checkoutTxt: { color: colors.white, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.gray },
  shopBtn: { backgroundColor: colors.brand, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  shopBtnTxt: { color: colors.white, fontWeight: '700', fontSize: 13 },
});
