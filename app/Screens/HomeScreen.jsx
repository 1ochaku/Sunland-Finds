import { SafeAreaView, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../Components/HomeScreen/Header'
import Categories from '../Components/HomeScreen/Categories'
import AvailableItem from '../Components/HomeScreen/AvailableItem'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { app } from '../../firebaseConfig'

export default function HomeScreen() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [availableItemList, setavailableItemList] = useState([]);
  
  useEffect(() => {
    getCategoryList();
    getAvailableItemList();
  },[]);

  const getCategoryList = async () => {
        try {
            // console.log("Getting documents...");
            const querySnapshot = await getDocs(collection(db, 'Category'));
            // console.log("Documents fetched: ", querySnapshot.docs.length);
            
            // Transform the query snapshot into an array of objects
            let categories = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { name: Object.keys(data)[0], icon: data[Object.keys(data)[0]] };
            });

            setCategoryList(categories);
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };

    const getAvailableItemList = async () => {
      try {
        setavailableItemList([]);
        const querySnapshot = await getDocs(collection(db, 'UserPost'));
        
        // Transform the query snapshot into an array of objects
        let availableItems = querySnapshot.docs.map(doc => doc.data());
        setavailableItemList(availableItems);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

  return (
    <SafeAreaView className="py-8 px-6 bg-white flex-1">
      <Header />
      {/* Category List  */}
      <ScrollView>
        <Categories categoryList={categoryList} />
        <AvailableItem availableItemList={availableItemList}
          heading={ 'Available Items'} />
      </ScrollView>
        
    </SafeAreaView>
    
  )
}
