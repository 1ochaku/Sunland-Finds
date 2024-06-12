import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../Screens/ProductDetail'
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createStackNavigator();

export default function MyProductNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='my-profile' component={ProfileScreen}
        options={{
        headerShown:false
        }} />
        <Stack.Screen name='product-details' component={ProductDetail}
          options={{
              headerStyle: {
                  backgroundColor: '#3b82f6'
              },
              headerTitle:'Detail'
          }}
          />
    </Stack.Navigator>
  )
}