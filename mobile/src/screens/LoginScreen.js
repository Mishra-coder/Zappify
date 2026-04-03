import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function LoginScreen({ navigation }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { login } = useApp();

  const handleAuth = async () => {
    if (!form.email || !form.password) { Alert.alert('Error', 'Please fill all fields'); return; }
    if (isSignUp) {
      if (!form.name) { Alert.alert('Error', 'Please enter your name'); return; }
      if (form.password !== form.confirm) { Alert.alert('Error', 'Passwords do not match'); return; }
      if (form.password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
      const user = {
        name: form.name,
        email: form.email,
        picture: null,
      };
      await login(user);
      navigation.goBack();
    } else {
      const { AsyncStorage } = require('@react-native-async-storage/async-storage');
      const saved = await AsyncStorage.getItem('zappify_user');
      if (saved) {
        const u = JSON.parse(saved);
        if (u.email === form.email) {
          await login(u);
          navigation.goBack();
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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.iconWrap}>
            <User size={40} color={colors.brand} />
          </View>
          <Text style={styles.heading}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
          <Text style={styles.sub}>{isSignUp ? 'Join Zappify today' : 'Login to your Zappify account'}</Text>

          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={colors.gray}
              value={form.name}
              onChangeText={v => setForm({ ...form, name: v })}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={colors.gray}
            value={form.email}
            onChangeText={v => setForm({ ...form, email: v })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.gray}
            value={form.password}
            onChangeText={v => setForm({ ...form, password: v })}
            secureTextEntry
          />
          {isSignUp && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={colors.gray}
              value={form.confirm}
              onChangeText={v => setForm({ ...form, confirm: v })}
              secureTextEntry
            />
          )}

          <TouchableOpacity style={styles.authBtn} onPress={handleAuth}>
            <Text style={styles.authBtnTxt}>{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchBtn} onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchTxt}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.switchLink}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { padding: 28, alignItems: 'center' },
  iconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 20 },
  heading: { fontSize: 26, fontWeight: '800', color: colors.dark, marginBottom: 6 },
  sub: { fontSize: 14, color: colors.gray, marginBottom: 28 },
  input: { width: '100%', borderWidth: 1.5, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: colors.dark, marginBottom: 14 },
  authBtn: { width: '100%', backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 4 },
  authBtnTxt: { color: colors.white, fontWeight: '800', fontSize: 15, letterSpacing: 1 },
  switchBtn: { marginTop: 20 },
  switchTxt: { fontSize: 14, color: colors.gray },
  switchLink: { color: colors.brand, fontWeight: '700' },
});
