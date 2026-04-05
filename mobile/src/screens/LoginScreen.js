import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

let GoogleSignin, statusCodes;
try {
  const gs = require('@react-native-google-signin/google-signin');
  GoogleSignin = gs.GoogleSignin;
  statusCodes = gs.statusCodes;
  GoogleSignin.configure({
    webClientId: '1076957044730-mht8sbihb0d4661hprrvbjf9v4gb0njr.apps.googleusercontent.com',
    offlineAccess: true,
  });
} catch (e) {
  GoogleSignin = null;
  statusCodes = {};
}

export default function LoginScreen({ navigation }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { login } = useApp();

  const handleGoogleSignIn = async () => {
    if (!GoogleSignin) {
      Alert.alert('Not Available', 'Google Sign In is only available in the production build.');
      return;
    }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = {
        name: userInfo.data.user.name,
        email: userInfo.data.user.email,
        picture: userInfo.data.user.photo,
      };
      await login(user);
      navigation.replace('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (error.code === statusCodes.IN_PROGRESS) return;
      Alert.alert('Google Sign In Failed', error.message);
    }
  };

  const handleAuth = async () => {
    if (!form.email || !form.password) { Alert.alert('Error', 'Please fill all fields'); return; }
    if (isSignUp) {
      if (!form.name) { Alert.alert('Error', 'Please enter your name'); return; }
      if (form.password !== form.confirm) { Alert.alert('Error', 'Passwords do not match'); return; }
      if (form.password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
      const user = { name: form.name, email: form.email, picture: null };
      await login(user);
      navigation.replace('Home');
    } else {
      const saved = await AsyncStorage.getItem('zappify_user');
      if (saved) {
        const u = JSON.parse(saved);
        if (u.email === form.email) {
          await login(u);
          navigation.replace('Home');
        } else {
          Alert.alert('Error', 'Account not found. Please sign up first.');
        }
      } else {
        Alert.alert('Error', 'Account not found. Please sign up first.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.heroBanner}>
            <Image
            source={require('../../assets/hero-nike.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace('Home')}>
              <Text style={styles.skipTxt}>SKIP</Text>
            </TouchableOpacity>
            <View style={styles.heroBannerOverlay}>
              <Text style={styles.heroBrandTag}>ZAPPIFY</Text>
              <Text style={styles.heroTitle}>Premium{'\n'}Footwear</Text>
              <Text style={styles.heroSub}>Step into the future</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.heading}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
            <Text style={styles.sub}>{isSignUp ? 'Join Zappify today' : 'Login to your Zappify account'}</Text>

            {isSignUp && (
              <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={colors.gray} value={form.name} onChangeText={v => setForm({ ...form, name: v })} />
            )}
            <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor={colors.gray} value={form.email} onChangeText={v => setForm({ ...form, email: v })} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.gray} value={form.password} onChangeText={v => setForm({ ...form, password: v })} secureTextEntry />
            {isSignUp && (
              <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor={colors.gray} value={form.confirm} onChangeText={v => setForm({ ...form, confirm: v })} secureTextEntry />
            )}

            <TouchableOpacity style={styles.authBtn} onPress={handleAuth}>
              <Text style={styles.authBtnTxt}>{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</Text>
            </TouchableOpacity>

            <View style={styles.separator}>
              <View style={styles.sepLine} />
              <Text style={styles.sepTxt}>OR</Text>
              <View style={styles.sepLine} />
            </View>

            <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
              <View style={styles.googleIconWrap}>
                <Text style={styles.googleG}>G</Text>
              </View>
              <Text style={styles.googleBtnTxt}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.switchBtn} onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.switchTxt}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text style={styles.switchLink}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { flexGrow: 1 },
  heroBanner: {
    height: 280,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.7,
  },
  heroBannerOverlay: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  skipBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  skipTxt: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroBrandTag: {
    color: '#FF6B00',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    letterSpacing: -1,
    marginBottom: 4,
  },
  heroSub: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  formCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 40,
    marginTop: -20,
  },
  heading: { fontSize: 24, fontWeight: '800', color: colors.dark, marginBottom: 4 },
  sub: { fontSize: 14, color: colors.gray, marginBottom: 24 },
  input: { borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: colors.dark, marginBottom: 14 },
  authBtn: { backgroundColor: '#D83100', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 4 },
  authBtnTxt: { color: colors.white, fontWeight: '800', fontSize: 15, letterSpacing: 1 },
  separator: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10 },
  sepLine: { flex: 1, height: 1, backgroundColor: colors.border },
  sepTxt: { fontSize: 12, color: colors.gray, fontWeight: '600', letterSpacing: 1 },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, paddingVertical: 14, backgroundColor: colors.white },
  googleIconWrap: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e0e0e0' },
  googleG: { fontSize: 14, fontWeight: '900', color: '#4285F4' },
  googleBtnTxt: { fontSize: 15, fontWeight: '600', color: colors.dark },
  switchBtn: { marginTop: 20, alignItems: 'center', width: '100%' },
  switchTxt: { fontSize: 14, color: colors.gray, textAlign: 'center' },
  switchLink: { color: '#D83100', fontWeight: '700' },
});
