import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import AccountScreen from '../features/Accounts/AcoountScreen'
import CartScreen from '../features/Cart/CartScreen'
import WishlistScreen from '../features/Wishlist/WishlistScreen'
import HomeScreen from '../features/Home/HomeScreen'
import COLORS from '../themes/COLORS'

const Tab = createBottomTabNavigator();

const tabBarIconMap = {
  Home: 'home',
  Wishlist: 'auto-awesome',
  Cart: 'shopping-cart',
  Account: 'account-circle'
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = tabBarIconMap[route.name];
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.blue,
          tabBarInactiveBackgroundColor: COLORS.white,
          tabBarActiveBackgroundColor: COLORS.white,
          tabBarHideOnKeyboard: true,
          tabBarItemStyle: { padding: 5 },
          tabBarStyle: { height: 70 },
          headerShown: false
        })}
        initialRouteName='Add'
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Wishlist" component={WishlistScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}