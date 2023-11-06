import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';

export default function FavorList (props : any) {

  return (
    
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={()=>{
          props.navigation.goBack();
        }}
        >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Typography>준비중입니다.</Typography>
    </View>
    
   );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 50,
    height: 50,
    marginTop: 14,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



