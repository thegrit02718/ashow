import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { Typography } from '../../Components/Typography';
import { useRoute } from '@react-navigation/native';

export default function PyeongStyleSelectModal (props : any) {

  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{borderRadius: 20, backgroundColor: 'white', padding: 20, width: '90%'}}>
        <View style={{alignItems:'center', paddingTop:10, marginBottom:10}}>
          <Typography color='#E5625D' marginBottom={10}>평형 변경</Typography>
          <Typography fontSize={14} color='#555' fontWeightIdx={2}>지금 평형을 변경하시면</Typography>
          <Typography fontSize={14} color='#555' fontWeightIdx={2}>선택한 추가 옵션이 모두 초기화됩니다.</Typography>
        </View>
        <View style={{width:'100%', marginVertical: 10, flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity 
            onPress={()=>{
              props.PyengChangeToggleModal();
            }}
            style={{width: '48%', height: 50, backgroundColor: '#EFEFEF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
            >
            <Typography fontSize={14} color='#C1C1C1'>취소</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{
              props.PyengChangeToggleModal();
              props.setPyeongStyleSelect(props.pyeongSelectNum);
            }} 
            style={{width: '48%', height: 50, backgroundColor: '#E8726E', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
            >
            <Typography fontSize={14} color='#fff'>변경할래요</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  )
    
};


const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  pyeongStyleSelectBox : {
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  },

})