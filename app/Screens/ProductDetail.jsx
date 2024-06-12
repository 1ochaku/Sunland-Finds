import { ScrollView, View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function ProductDetail() {
    const { params } = useRoute();
    const [product, setProduct] = useState([]);

    const sendEmailMessage = () => {
        const subject = 'Regarding ' + product.productName;
        const body = 'Hi ' + product.userName + '\n' + 'I am interested in buying your product.';
        Linking.openURL('mailto:' + product.userEmail + '?subject=' + subject + '&body=' + body);
    }

    useEffect(() => {
        // console.log(params);
        params&&setProduct(params.product);
    },[params])
    return (
      //product info
        <ScrollView>
          <Image source={{ uri:product.image }}
              className="h-[400px] w-full" />
          <View className="p-3">
              <Text className="text-[18px] font-bold">Local Name: <Text className="text-[18px] font-normal">{product?.productName}</Text></Text>
              <View className="items-baseline">
                  <Text className=" bg-blue-200 mt-2 p-2 px-1 rounded-full">{ product.category}</Text>
              </View>
              <Text className="mt-2 font-bold text-[18px]">Description</Text>
                <Text className="text-[16px]">{product?.desc}</Text>
            </View>
            {/* user info */}
        <View className="p-3 flex flex-row items-centre gap-3">
                <Image source={{ uri:product.userImage }}
                    className="h-10 w-10 rounded-full" />
                <View>
                    <Text className="font-bold text-[15px]">Sold by: {product.userName}</Text>
                    <Text>{product.userEmail}</Text>
                </View>
            </View>
            <TouchableOpacity className="z-40 bg-blue-400 rounded-lg p-4 m-2"
                onPress={() => sendEmailMessage()}>
                <Text className="text-center text-white">Place your Order</Text>
            </TouchableOpacity>
    </ScrollView>
        
        
  )
}