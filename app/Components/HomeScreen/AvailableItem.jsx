import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function AvailableItem({ availableItemList, heading }) {
  return (
    <View className="mt-5">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <>
        {availableItemList.map((item, index) => (
          <PostItem item={item} />
        ))}
      </>
    </View>
  );
}
