import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Typography } from '../../Components/Typography';
import { SubTitle } from '../../Components/SubTitle';

export default function BusinessInfo (props : any) {
    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
       <SubTitle title='사업자정보' navigation={props.navigation}/>
       <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
          <Typography marginBottom={10}>(주) 더그릿</Typography>
          <Typography marginBottom={10}>사업자등록번호 : 146-87-02718</Typography>
          <Typography marginBottom={10}>대표 E-Mail : thegrit02718@naver.com</Typography>
          <Typography marginBottom={10}>대표 카카오톡 ID : thegrit02718</Typography>
        </View>
    </View>
    );
  }


