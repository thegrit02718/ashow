import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity  } from 'react-native';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Prepare(props: any) {

  
    return (
      <View style={styles.container}>
        <View style={{position: 'absolute', top: 50, left: 30}}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Typography>준비중입니다.</Typography>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
   container : {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
   },
   backButton: {
    width: 24,
    height: 24,
    marginTop: 24,
    marginBottom: 42
  },
  });