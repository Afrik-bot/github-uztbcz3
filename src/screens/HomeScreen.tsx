import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

import ExpressScreen from './Express/ExpressScreen';
import ConnectScreen from './Connect/ConnectScreen';
import StudioScreen from './Studio/StudioScreen';
import LiveScreen from './Live/LiveScreen';
import ProfileScreen from './Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.secondary,
        }}
      >
        <Tab.Screen
          name="Express"
          component={ExpressScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="play-circle-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="account-group-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Studio"
          component={StudioScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="plus-circle-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Live"
          component={LiveScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="broadcast" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="account-circle-outline" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}