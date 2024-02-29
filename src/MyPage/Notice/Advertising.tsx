import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Typography } from '../../Components/Typography';
import { SubTitle } from '../../Components/SubTitle';

function Advertising (props : any) {
    return (
      <View style={{flex:1}}>
       <SubTitle title='사업 제휴 및 광고 문의' navigation={props.navigation}/>
       <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
          <Typography marginBottom={10}> 메일&카카오톡으로 문의해주세요 </Typography>
          <Typography marginBottom={10}> thegrit02718@naver.com </Typography>
          <Typography marginBottom={10}> 카카오톡 ID : thegrit02718 </Typography>
        </View>
    </View>
    );
  }

export default Advertising ;
