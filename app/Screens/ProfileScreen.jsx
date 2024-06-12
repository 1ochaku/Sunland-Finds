import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { getFirestore, query, getDocs, collection, where } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import Slider from '../Components/ProfileScreen/Slider';

export default function ProfileScreen() {
  const { user } = useUser();
  const db = getFirestore(app);
  const [myProducts, setMyProducts] = useState([]);
  const { signOut } = useAuth();
  const [loading, setLoading] = useState();

  useEffect(() => {
    getMyProducts();
  },[])

  const getMyProducts = async () => {
    try {
      setMyProducts([]);
      setLoading(true);
      // {console.log(user?.fullName)}
      const q = query(collection(db, 'UserPost'), where('userName', '==', user?.fullName));
      const querySnapshot = await getDocs(q);
        
      // Transform the query snapshot into an array of objects
      let uploadedProducts = querySnapshot.docs.map(doc => doc.data());

      // console.log(uploadedProducts);
      setLoading(false);
      setMyProducts(uploadedProducts);
    } catch (error) {
      console.error("Error getting documents: ", error);
      setLoading(false);
    }
  }

  const onPress = () => {
    signOut();
    return;
  }

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View className="p-1 mt-10">
          <View className="items-center mt-1">
            <Image source={{ uri: user?.imageUrl }}
              className="w-[100px] h-[100px] rounded-full" />
            <Text className="text-[25px] mt-5">{user?.fullName }</Text>
            <Text className="text-[20px] mt-1 text-gray-500">{user?.primaryEmailAddress?.emailAddress}</Text>
          </View>
          <View className="p-10">
            <Text className="text-[25px] mb-1font-bold">My Products</Text>
            
            {loading ?
              <ActivityIndicator size={ 'large' } color={'black'} />
              :
              myProducts?.length > 0 ? <Slider sliderContent={myProducts} />
                : <Text className="p-5 text-[20px] justify-center text-center mt-20 text-gray-400">Start crafting and sell your products!</Text>}
          </View>
          <TouchableOpacity onPress={ onPress } className="p-4 bg-blue-400 mt-8 rounded-full">
            <Text className=" text-center text-[15px] text-white">Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </GestureHandlerRootView>
  )
}