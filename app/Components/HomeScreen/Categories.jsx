import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';

export default function Categories({ categoryList }) {

  const navigation = useNavigation();
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
              data={categoryList}
              numColumns={5}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('item-list', {
                  category:item.name
                })}
                className="flex-1 items-center justify-center
            p-2 border-[1px] border-gray-300 m-1 h-[80px] rounded-lg bg-blue-50">
                {console.log(item.icon)}
                <Image source={{uri:item.icon}}
                        className="w-[40px] h-[40px]" />
                    <Text className="text-[13px] mt-1 font-bold">{ item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


