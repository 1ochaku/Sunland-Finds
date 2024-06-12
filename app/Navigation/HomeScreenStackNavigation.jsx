import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeScreenStackNavigation() {
  return (
      <Stack.Navigator>
          <Stack.Screen name='home' component={HomeScreen}
              options={{
                  headerShown:false
              }} />
          <Stack.Screen name='item-list' component={ItemList}
              options={({ route }) => ({
                  title: route.params.category, 
                  headerStyle: {
                      backgroundColor:'#3b82f6'
                  } 
              })}
          />
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