import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const { user } = useUser();

  return (
    <View className="mt-5">
      {/* User Info Section */}
      <View className="flex flex-row items-center gap-2">
        <Image source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12" />
        
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-3 px-5 mt-3 flex flex-row items-center bg-blue-50 border-[1px] border-black rounded-full">
          <Ionicons name="search" size={24} color="black"/>
        <TextInput placeholder='Type here to Search'
          className="ml-5 text-[18px]"
          
          onChangeText={(value)=>console.log(value)}/>
      </View>
    </View>
  )
}

