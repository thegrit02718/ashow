import React, {useState} from 'react';
import {FlatList,View,Image} from 'react-native';
import { StyleSheet } from 'react-native';

interface ICarousel {
  gap: number;
  offset: number;
  pages: { num: number; color: string; image: any }[];
  pageWidth: number;
}

 

export default function Carousel({pages, pageWidth, gap, offset}: ICarousel) {


  function renderItem({item}: any) {
    return (
      <Image source={item.image} style={{width: pageWidth, marginHorizontal: gap / 2, height: 100, borderRadius:8}} />
    );
  }


  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item,index) => `page__${index}`}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap }
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    
    </View>
  );
}

const styles =StyleSheet.create({
    container:{
        height: 110,
        marginVertical:20,
    }
})