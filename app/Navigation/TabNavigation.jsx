import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPostScreen from '../Screens/AddPostScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNavigation'
import MyProductStackNavigation from './MyProductStackNavigation'

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
        name='home-nav' 
        component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => (
              <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
            ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color}/>
          )
        }} 
      />
        
        <Tab.Screen
          name='addpost'
          component={AddPostScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{color:color,fontSize:12,marginBottom:3}}>To Sell</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen
          name='profile-nav'
          component={MyProductStackNavigation}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 3,
  },
});

