import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

export default function MyPostedProducts({ item }) {
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
      onPress={() => navigation.push('product-details',
        {
        product:item
      }
    )}>
      <Image source={{ uri: item.image }}
          className="w-[200px] h-[200px]" />
      <View>
            <Text className="text-[15px] font-bold mt-2 text-center">{item.productName}</Text>
            <Text className="text-[13px] font-bold p-1  bg-slate-200  text-center">{item.category}</Text>
      </View>
        </TouchableOpacity>
  )
}