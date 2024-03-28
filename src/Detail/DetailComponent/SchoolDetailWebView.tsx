import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import MainImageURL from '../../../MainImageURL';
import { WebView } from 'react-native-webview';
import { SubTitle } from '../../Components/SubTitle';

export default function SchoolDetailWebView (props : any) {
  
  const route : any = useRoute();

  return (
    <View style={styles.container}>
       {/* 상단 박스 섹션 */}

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={()=>{
            props.navigation.goBack()
          }}>
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity> 
      </View>

      <View style={{flex:1, height:500}}>
        <WebView 
          style={{flex:1, alignItems:'center', justifyContent:'center'}}
          source={{ uri: `https://www.schoolinfo.go.kr/ei/ss/Pneiss_b01_s0.do?GS_CD=S010000738` }}
        />
      </View>     

      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 20,
    alignItems:'flex-end',
    backgroundColor:'#333'
  },
  backButton: {
    alignItems: 'center',
    justifyContent:'center',
  },
});
