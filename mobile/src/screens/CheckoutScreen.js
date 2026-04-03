import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const STEPS = ['MY BAG', 'ADDRESS', 'PAYMENT'];
const PAYMENT_OPTIONS = [
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'upi', label: 'UPI / GPay / PhonePe' },
  { id: 'card', label: 'Credit / Debit Card' },
];

export default function CheckoutScreen({ navigation }) {
  const { cartItems, cartTotal, placeOrder } = useApp();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({ name: '', phone: '', street: '', pincode: '', city: '', state: '' });
  const [payment, setPayment] = useState('cod');
  const [done, setDone] = useState(false);
  const shipping = cartTotal > 999 ? 0 : 99;

  const handlePlaceOrder = async () => {
    await placeOrder(cartItems);
    setDone(true);
  };

  if (done) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.successBox}>
          <View style={styles.successIcon}><Ionicons name="checkmark" size={36} color={colors.white} /></View>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successMsg}>Your order has been placed successfully. You'll receive a confirmation soon.</Text>
          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.continueTxt}>CONTINUE SHOPPING</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.title}>CHECKOUT</Text>
      </View>

      <View style={styles.stepsRow}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, i <= step && styles.stepCircleActive, i < step && styles.stepCircleDone]}>
                {i < step
                  ? <Ionicons name="checkmark" size={12} color={colors.white} />
                  : <Text style={[styles.stepNum, i <= step && styles.stepNumActive]}>{i + 1}</Text>
                }
              </View>
              <Text style={[styles.stepLabel, i <= step && styles.stepLabelActive]}>{s}</Text>
            </View>
            {i < STEPS.length - 1 && <View style={[styles.stepLine, i < step && styles.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {step === 0 && (
          <View>
            {cartItems.map((item, i) => (
              <View key={i} style={styles.bagItem}>
                <View style={styles.bagInfo}>
                  <Text style={styles.bagName}>{item.name}</Text>
                  <Text style={styles.bagMeta}>Size: UK {item.size}  ·  Qty: {item.qty}</Text>
                </View>
                <Text style={styles.bagPrice}>₹ {(item.price * item.qty).toLocaleString('en-IN')}</Text>
              </View>
            ))}
            <View style={styles.billing}>
              <View style={styles.billRow}><Text style={styles.billLabel}>Cart Total</Text><Text style={styles.billVal}>₹ {cartTotal.toLocaleString('en-IN')}</Text></View>
              <View style={styles.billRow}><Text style={styles.billLabel}>Shipping</Text><Text style={[styles.billVal, { color: colors.success }]}>{shipping === 0 ? 'FREE' : `₹ ${shipping}`}</Text></View>
              <View style={[styles.billRow, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalVal}>₹ {(cartTotal + shipping).toLocaleString('en-IN')}</Text></View>
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(1)}>
              <Text style={styles.nextTxt}>PROCEED TO ADDRESS</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>
            <View style={styles.formRow}>
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Full Name *" value={address.name} onChangeText={v => setAddress({ ...address, name: v })} />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Phone *" value={address.phone} onChangeText={v => setAddress({ ...address, phone: v })} keyboardType="phone-pad" />
            </View>
            <TextInput style={styles.input} placeholder="Street Address *" value={address.street} onChangeText={v => setAddress({ ...address, street: v })} />
            <View style={styles.formRow}>
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Pincode *" value={address.pincode} onChangeText={v => setAddress({ ...address, pincode: v })} keyboardType="numeric" />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="City *" value={address.city} onChangeText={v => setAddress({ ...address, city: v })} />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="State *" value={address.state} onChangeText={v => setAddress({ ...address, state: v })} />
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(0)}><Text style={styles.backTxt}>BACK</Text></TouchableOpacity>
              <TouchableOpacity style={styles.nextBtn} onPress={() => {
                if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
                  Alert.alert('Missing Info', 'Please fill all required fields'); return;
                }
                setStep(2);
              }}>
                <Text style={styles.nextTxt}>PROCEED TO PAYMENT</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
            {PAYMENT_OPTIONS.map(opt => (
              <TouchableOpacity key={opt.id} style={[styles.payOption, payment === opt.id && styles.payOptionActive]} onPress={() => setPayment(opt.id)}>
                <View style={[styles.radio, payment === opt.id && styles.radioActive]}>
                  {payment === opt.id && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.payLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.billing}>
              <View style={styles.billRow}><Text style={styles.billLabel}>Total</Text><Text style={styles.totalVal}>₹ {(cartTotal + shipping).toLocaleString('en-IN')}</Text></View>
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}><Text style={styles.backTxt}>BACK</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.nextBtn, { flex: 2 }]} onPress={handlePlaceOrder}>
                <Text style={styles.nextTxt}>PLACE ORDER</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  topBar: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 16, fontWeight: '800', letterSpacing: 1.5, color: colors.dark },
  stepsRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  stepCircleActive: { borderColor: colors.brand },
  stepCircleDone: { backgroundColor: colors.brand, borderColor: colors.brand },
  stepNum: { fontSize: 12, fontWeight: '700', color: colors.gray },
  stepNumActive: { color: colors.brand },
  stepLabel: { fontSize: 10, fontWeight: '700', color: colors.gray, letterSpacing: 0.5 },
  stepLabelActive: { color: colors.brand },
  stepLine: { flex: 1, height: 2, backgroundColor: colors.border, marginBottom: 16 },
  stepLineDone: { backgroundColor: colors.brand },
  body: { padding: 20, paddingBottom: 40 },
  bagItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  bagInfo: { flex: 1 },
  bagName: { fontSize: 13, fontWeight: '700', color: colors.dark, marginBottom: 4 },
  bagMeta: { fontSize: 12, color: colors.gray },
  bagPrice: { fontSize: 14, fontWeight: '800', color: colors.dark },
  billing: { backgroundColor: colors.lightGray, borderRadius: 12, padding: 16, marginVertical: 16, gap: 8 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between' },
  billLabel: { fontSize: 14, color: colors.gray },
  billVal: { fontSize: 14, fontWeight: '600', color: colors.dark },
  totalRow: { paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border, marginTop: 4 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: colors.dark },
  totalVal: { fontSize: 16, fontWeight: '900', color: colors.dark },
  nextBtn: { flex: 1, backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  nextTxt: { color: colors.white, fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  backBtn: { paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  backTxt: { fontSize: 13, fontWeight: '700', color: colors.gray },
  sectionTitle: { fontSize: 13, fontWeight: '800', letterSpacing: 1, color: colors.dark, marginBottom: 16 },
  formRow: { flexDirection: 'row', gap: 10 },
  input: { borderWidth: 1.5, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: colors.dark, marginBottom: 12 },
  payOption: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, marginBottom: 10 },
  payOptionActive: { borderColor: colors.brand, backgroundColor: colors.brandLight },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.brand },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brand },
  payLabel: { fontSize: 14, fontWeight: '500', color: colors.dark },
  successBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontSize: 24, fontWeight: '800', color: colors.dark },
  successMsg: { fontSize: 14, color: colors.gray, textAlign: 'center', lineHeight: 22 },
  continueBtn: { backgroundColor: colors.brand, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, marginTop: 8 },
  continueTxt: { color: colors.white, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
});
