import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

export default function PostItem({ item }) {
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity className="flex-1 m-5 p-5 rounded-lg border-[1px] border-black"
      onPress={() => navigation.push('product-details',
        {
        product:item
      }
    )}>
      <Image source={{ uri: item.image }}
          className="w-[240px] h-[240px]" />
      <View>
            <Text className="text-[15px] font-bold mt-2 text-center">{item.productName}</Text>
            <Text className="text-[14px] font-bold text-center">₹{item.price}</Text>
            <Text className="text-[13px] font-bold p-1  bg-slate-200  text-center">{item.category}</Text>
      </View>
        </TouchableOpacity>
  )
}