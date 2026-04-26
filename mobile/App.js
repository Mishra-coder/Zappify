import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, StatusBar, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from './src/context/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import LoginScreen from './src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator with badge support
function TabNavigator() {
  const { cartItems, wishlistItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          const iconSize = 26;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'WishlistTab') {
            iconName = 'heart';
          } else if (route.name === 'CartTab') {
            iconName = 'cart';
          } else if (route.name === 'AccountTab') {
            iconName = 'person';
          }

          return (
            <View style={styles.tabIconContainer}>
              <View style={[
                styles.iconWrapper,
                focused && styles.iconWrapperActive
              ]}>
                <Ionicons
                  name={focused ? iconName : `${iconName}-outline`}
                  size={iconSize}
                  color={color}
                />
                {/* Badge for Cart */}
                {route.name === 'CartTab' && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                  </View>
                )}
                {/* Badge for Wishlist */}
                {route.name === 'WishlistTab' && wishlistCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{wishlistCount > 99 ? '99+' : wishlistCount}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="WishlistTab" component={WishlistScreen} />
      <Tab.Screen name="CartTab" component={CartScreen} />
      <Tab.Screen name="AccountTab" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    AsyncStorage.getItem('zappify_user').then(saved => {
      if (saved) setInitialRoute('Home');
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.95, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <StatusBar backgroundColor="#000000" barStyle="light-content" />
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
            <Image source={require('./assets/logo1.png')} style={styles.splashLogoImg} />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogoImg: {
    width: 380,
    height: 220,
    resizeMode: 'contain',
  },
  splashSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 6,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
