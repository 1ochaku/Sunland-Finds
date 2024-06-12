import { View, FlatList} from 'react-native'
import React from 'react'
import MyPostedProducts from '../HomeScreen/MyPostedProducts'

export default function Slider({sliderContent}) {
  return (
      <View className="mt-3">
          <FlatList
            data={sliderContent}
            horizontal={true}
            renderItem={({ item, index }) => (
                <MyPostedProducts item={item}/>
            )}
        />
      </View>
  )
}