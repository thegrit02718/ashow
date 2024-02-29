import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';

export default function TaxDetail(props: any) {

  const route : any = useRoute();
  const image = route.params.data.image;

  let imageSource;
  if (image === 1) {
    imageSource = require('../../images/taxImages/tax1.png');
  } else if (image === 2) {
    imageSource = require('../../images/taxImages/tax2.png');
  } else if (image === 3) {
    imageSource = require('../../images/taxImages/tax3.png');
  } else if (image === 4) {
    imageSource = require('../../images/taxImages/tax4.png');
  } else if (image === 5) {
    imageSource = require('../../images/taxImages/tax5.png');
  } else if (image === 6) {
    imageSource = require('../../images/taxImages/tax6.png');
  } else if (image === 7) {
    imageSource = require('../../images/taxImages/tax7.png');
  } 

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row', justifyContent: 'space-between', marginVertical: 30, alignItems: 'center' }}>
        <Typography fontSize={16} color='#333'>{route.params.data.taxName}</Typography>
        <TouchableOpacity 
          onPress={()=>{props.navigation.goBack();}}
        >
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', height: route.params.data.imageHeight, marginBottom: 50 }}>
        <Image source={imageSource} style={{ width: '100%', height: '100%', resizeMode:'contain' }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container : {
    padding:20,
  }
});
