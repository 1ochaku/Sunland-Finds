import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import AvailableItem from '../Components/HomeScreen/AvailableItem';

export default function ItemList() {
    const { params } = useRoute();
    const db = getFirestore(app);
    const [selectedCategoryItemList, setSelectedCategoryItemList] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params && getItemListByCategory();
    }, [params])
    
    //queries for post related to the selected category
    const getItemListByCategory = async () => {
        try {
            setSelectedCategoryItemList([]);
            setLoading(true);
            const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
            const querySnapshot = await getDocs(q);
        
            // Transform the query snapshot into an array of objects
            let selectedCategoryItems = querySnapshot.docs.map(doc => doc.data());

            // console.log(selectedCategoryItems);
            setSelectedCategoryItemList(selectedCategoryItems);
            setLoading(false);
        } catch (error) {
            console.error("Error getting documents: ", error);
            setLoading(false);
        }
    }

  return (
      <ScrollView>
          <View className="mt-1">
          {loading ?
              <ActivityIndicator size={ 'large' } color={'black'} />
              :
          selectedCategoryItemList?.length > 0 ? <AvailableItem availableItemList={selectedCategoryItemList}
              heading={''} />
              : <Text className="p-5 text-[20px] justify-center text-center mt-24 text-gray-400">Sorry, Item not available right now!</Text>}
          
        </View>
      </ScrollView>
  )
}