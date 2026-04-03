import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Package, LogOut, ArrowLeft, ChevronRight, Check } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const TRACKING = ['Order Placed', 'Shipped', 'In-Transit', 'Out For Delivery', 'Delivered'];
const CANCEL_REASONS = ['Changed my mind', 'Ordered by mistake', 'Found a better price elsewhere', 'Delivery time is too long', 'Other'];

const formatDate = (str) => new Date(str).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const estDelivery = (str) => { const d = new Date(str); d.setDate(d.getDate() + 7); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };

export default function AccountScreen({ navigation }) {
  const { user, orders, logout, cancelOrder } = useApp();
  const [view, setView] = useState('main');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.guestBox}>
          <User size={56} color={colors.border} />
          <Text style={styles.guestTitle}>You're not logged in</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginBtnTxt}>LOGIN / SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleCancelConfirm = () => {
    if (!cancelReason) { Alert.alert('Select Reason', 'Please select a reason'); return; }
    setShowConfirm(true);
  };

  const handleCancelDone = () => {
    cancelOrder(selectedOrder.orderId);
    setShowConfirm(false);
    setView('main');
    setSelectedOrder(null);
    setCancelReason('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        {view !== 'main' && (
          <TouchableOpacity onPress={() => setView(view === 'cancel' ? 'detail' : 'main')} style={styles.backBtn}>
            <ArrowLeft size={20} color={colors.dark} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {view === 'main' ? 'MY ACCOUNT' : view === 'detail' ? 'ORDER DETAILS' : 'CANCEL ORDER'}
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>

        {view === 'main' && (
          <>
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                {user.picture
                  ? <Image source={{ uri: user.picture }} style={styles.avatarImg} />
                  : <Text style={styles.avatarLetter}>{user.name[0]}</Text>
                }
              </View>
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}><Package size={14} color={colors.gray} /> MY ORDERS</Text>

            {orders.length === 0 ? (
              <View style={styles.emptyOrders}>
                <Package size={36} color={colors.border} />
                <Text style={styles.emptyTxt}>No orders yet</Text>
              </View>
            ) : (
              orders.map((order, i) => (
                <TouchableOpacity key={i} style={styles.orderItem} onPress={() => { setSelectedOrder(order); setView('detail'); }}>
                  <Image source={{ uri: order.image }} style={styles.orderImg} />
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderName} numberOfLines={1}>{order.name}</Text>
                    <Text style={styles.orderMeta}>Size: UK {order.size}  ·  Qty: {order.qty}</Text>
                    <Text style={styles.orderPrice}>₹ {(order.price * order.qty).toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.orderRight}>
                    <View style={[styles.statusBadge, order.status === 'Cancelled' && styles.statusCancelled]}>
                      <Text style={[styles.statusTxt, order.status === 'Cancelled' && styles.statusTxtCancelled]}>{order.status}</Text>
                    </View>
                    <ChevronRight size={16} color={colors.gray} />
                  </View>
                </TouchableOpacity>
              ))
            )}

            <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout(); }}>
              <LogOut size={16} color={colors.gray} />
              <Text style={styles.logoutTxt}>LOGOUT</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'detail' && selectedOrder && (
          <>
            <View style={styles.odHeader}>
              <Text style={styles.odLabel}>Order ID: <Text style={styles.odVal}>{selectedOrder.orderId}</Text></Text>
              <Text style={styles.odLabel}>Date: <Text style={styles.odVal}>{formatDate(selectedOrder.placedAt)}</Text></Text>
            </View>
            <View style={styles.odItem}>
              <Image source={{ uri: selectedOrder.image }} style={styles.odImg} />
              <View style={styles.odInfo}>
                <Text style={styles.odName}>{selectedOrder.name}</Text>
                <Text style={styles.odMeta}>Size: UK {selectedOrder.size}  ·  Qty: {selectedOrder.qty}</Text>
                <Text style={styles.odPrice}>₹ {(selectedOrder.price * selectedOrder.qty).toLocaleString('en-IN')}</Text>
                {selectedOrder.status !== 'Cancelled' && (
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setView('cancel')}>
                    <Text style={styles.cancelBtnTxt}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {selectedOrder.status !== 'Cancelled' ? (
              <View style={styles.tracking}>
                {TRACKING.map((step, i) => (
                  <View key={step} style={styles.trackStep}>
                    <View style={styles.trackLeft}>
                      <View style={[styles.trackDot, i === 0 && styles.trackDotActive]} />
                      {i < TRACKING.length - 1 && <View style={styles.trackLine} />}
                    </View>
                    <View style={styles.trackInfo}>
                      <Text style={[styles.trackLabel, i === 0 && styles.trackLabelActive]}>{step}</Text>
                      {i === 0 && <Text style={styles.trackDate}>{formatDate(selectedOrder.placedAt)}</Text>}
                      {i === TRACKING.length - 1 && <Text style={styles.trackDate}>Est. Delivery by {estDelivery(selectedOrder.placedAt)}</Text>}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.cancelledBadge}>● Order Cancelled</Text>
            )}
          </>
        )}

        {view === 'cancel' && selectedOrder && (
          <>
            <View style={styles.odHeader}>
              <Text style={styles.odLabel}>Order ID: <Text style={styles.odVal}>{selectedOrder.orderId}</Text></Text>
            </View>
            <Text style={styles.cancelHeading}>Reason for Cancellation</Text>
            <Text style={styles.cancelSub}>Please tell us the reason for cancellation.</Text>
            {CANCEL_REASONS.map(r => (
              <TouchableOpacity key={r} style={[styles.reasonOption, cancelReason === r && styles.reasonActive]} onPress={() => setCancelReason(r)}>
                <View style={[styles.radio, cancelReason === r && styles.radioActive]}>
                  {cancelReason === r && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.reasonTxt}>{r}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.cancelBtnRow}>
              <TouchableOpacity style={styles.backBtnSm} onPress={() => setView('detail')}><Text style={styles.backBtnTxt}>BACK</Text></TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleCancelConfirm}><Text style={styles.confirmTxt}>CONFIRM</Text></TouchableOpacity>
            </View>
          </>
        )}

      </ScrollView>

      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTxt}>Your cancellation request has been received. You will receive an email with further instructions.</Text>
            <View style={styles.modalDivider} />
            <TouchableOpacity onPress={handleCancelDone} style={styles.modalBtn}>
              <Text style={styles.modalBtnTxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: 2 },
  title: { fontSize: 16, fontWeight: '800', letterSpacing: 1.5, color: colors.dark },
  body: { padding: 20, gap: 16, paddingBottom: 40 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.lightGray, borderRadius: 16, padding: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImg: { width: 52, height: 52 },
  avatarLetter: { fontSize: 20, fontWeight: '800', color: colors.white },
  userName: { fontSize: 16, fontWeight: '800', color: colors.dark },
  userEmail: { fontSize: 13, color: colors.gray, marginTop: 2 },
  sectionTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5, color: colors.gray },
  emptyOrders: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  emptyTxt: { fontSize: 14, color: colors.gray },
  orderItem: { flexDirection: 'row', gap: 12, backgroundColor: colors.white, borderRadius: 14, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  orderImg: { width: 70, height: 70, borderRadius: 10, backgroundColor: colors.lightGray },
  orderInfo: { flex: 1 },
  orderName: { fontSize: 13, fontWeight: '700', color: colors.dark, marginBottom: 4 },
  orderMeta: { fontSize: 12, color: colors.gray, marginBottom: 4 },
  orderPrice: { fontSize: 14, fontWeight: '800', color: colors.brand },
  orderRight: { alignItems: 'flex-end', justifyContent: 'space-between' },
  statusBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusCancelled: { backgroundColor: '#fef2f2' },
  statusTxt: { fontSize: 11, fontWeight: '700', color: colors.success },
  statusTxtCancelled: { color: colors.danger },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, paddingVertical: 14, marginTop: 8 },
  logoutTxt: { fontSize: 13, fontWeight: '700', color: colors.gray, letterSpacing: 1 },
  guestBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  guestTitle: { fontSize: 16, fontWeight: '700', color: colors.gray },
  loginBtn: { backgroundColor: colors.brand, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  loginBtnTxt: { color: colors.white, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  odHeader: { backgroundColor: colors.lightGray, borderRadius: 10, padding: 14, gap: 4 },
  odLabel: { fontSize: 13, color: colors.gray },
  odVal: { fontWeight: '700', color: colors.dark },
  odItem: { flexDirection: 'row', gap: 14, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12 },
  odImg: { width: 80, height: 80, borderRadius: 10, backgroundColor: colors.lightGray },
  odInfo: { flex: 1 },
  odName: { fontSize: 14, fontWeight: '700', color: colors.dark, marginBottom: 4 },
  odMeta: { fontSize: 12, color: colors.gray, marginBottom: 4 },
  odPrice: { fontSize: 15, fontWeight: '800', color: colors.dark, marginBottom: 8 },
  cancelBtn: { borderWidth: 1.5, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start' },
  cancelBtnTxt: { fontSize: 12, fontWeight: '700', color: colors.gray },
  tracking: { gap: 0 },
  trackStep: { flexDirection: 'row', gap: 14 },
  trackLeft: { alignItems: 'center', width: 18 },
  trackDot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white },
  trackDotActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  trackLine: { width: 2, height: 36, backgroundColor: colors.border },
  trackInfo: { flex: 1, paddingBottom: 4 },
  trackLabel: { fontSize: 14, fontWeight: '600', color: colors.gray },
  trackLabelActive: { color: colors.dark, fontWeight: '800' },
  trackDate: { fontSize: 12, color: colors.gray, marginTop: 2 },
  cancelledBadge: { fontSize: 14, fontWeight: '700', color: colors.danger, paddingVertical: 12 },
  cancelHeading: { fontSize: 15, fontWeight: '800', color: colors.dark },
  cancelSub: { fontSize: 13, color: colors.gray },
  reasonOption: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderWidth: 1.5, borderColor: colors.border, borderRadius: 12 },
  reasonActive: { borderColor: colors.brand, backgroundColor: colors.brandLight },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.brand },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brand },
  reasonTxt: { fontSize: 14, color: colors.dark },
  cancelBtnRow: { flexDirection: 'row', gap: 10 },
  backBtnSm: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center' },
  backBtnTxt: { fontSize: 13, fontWeight: '700', color: colors.gray },
  confirmBtn: { flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center' },
  confirmTxt: { fontSize: 13, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  modalBox: { backgroundColor: colors.white, borderRadius: 16, padding: 24 },
  modalTxt: { fontSize: 14, color: colors.dark, lineHeight: 22, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: colors.border, marginBottom: 12 },
  modalBtn: { alignSelf: 'flex-end' },
  modalBtnTxt: { fontSize: 14, fontWeight: '700', color: colors.brand },
});
