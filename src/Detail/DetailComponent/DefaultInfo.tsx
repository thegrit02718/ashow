import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Typography } from '../../Components/Typography';

interface DefaultInfoContentProps {
  name: string;
  notice: string;
}

interface DefaultInfoContentDoubleProps {
  name1: string;
  notice1: string;
  name2: string;
  notice2: string;
}

const DefaultInfoContent: React.FC<DefaultInfoContentProps> = ({ name, notice }) => (
  <View>
    <View style={{flexDirection:'row'}}>
      <View style={{width:80, minHeight:40, backgroundColor:'#F5F4F3', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
        <Typography fontSize={12} color='#8B8B8B'>{name}</Typography>
      </View>
      <View style={{flex:1, minHeight:40, backgroundColor:'#fff', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
        <Typography fontSize={14} color='#333' fontWeightIdx={2}>{notice}</Typography>
      </View>
    </View>
    <View style={{width:'100%', minHeight:1, backgroundColor:'#EFEFEF'}}></View>
  </View>
);

const DefaultInfoContentDouble: React.FC<DefaultInfoContentDoubleProps> = ({ name1, notice1, name2, notice2 }) => (
  <View>
    <View style={{flexDirection:'row'}}>
      <View style={{width:'50%', flexDirection:'row'}}>
        <View style={{width:80, minHeight:40, backgroundColor:'#F5F4F3', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
          <Typography fontSize={12} color='#8B8B8B'>{name1}</Typography>
        </View>
        <View style={{flex:1, minHeight:40, backgroundColor:'#fff', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
          <Typography fontSize={14} color='#333' fontWeightIdx={2}>{notice1}</Typography>
        </View>
      </View>
      <View style={{width:'50%', flexDirection:'row'}}>
        <View style={{width:80, minHeight:40, backgroundColor:'#F5F4F3', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
          <Typography fontSize={12} color='#8B8B8B'>{name2}</Typography>
        </View>
        <View style={{flex:1, minHeight:40, backgroundColor:'#fff', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
          <Typography fontSize={14} color='#333' fontWeightIdx={2}>{notice2}</Typography>
        </View>
      </View>
    </View>
    <View style={{width:'100%', minHeight:1, backgroundColor:'#EFEFEF'}}></View>
  </View>
);


export default function DefaultInfo (props:any) {
 
  return (
    <View style={styles.container}>
      <View style={{width:'100%', height:1, backgroundColor:'#EFEFEF'}}></View>
      <DefaultInfoContent name='주소' notice={`${props.aptData.addressCity} ${props.aptData.addressCounty} ${props.aptData.addressRest}`} />
      <DefaultInfoContent name='입주시기' notice={props.aptData.inDate} />
      <DefaultInfoContentDouble name1='세대수' notice1={props.aptData.houseHoldSum} name2='동수' notice2={props.aptData.buildingsNum} />
      <DefaultInfoContent name='평형' notice={props.aptData.pyengTypes} />
      <DefaultInfoContentDouble name1='용적률' notice1={props.aptData.floorAreaRatio} name2='건폐율' notice2={props.aptData.buildingCoverRatio} />
      <DefaultInfoContent name='최저/고층' notice={`${props.aptData.lowFloor}/${props.aptData.highFloor}`} />
      <DefaultInfoContent name='난방' notice={props.aptData.heating} />
      <DefaultInfoContent name='시공사' notice={props.aptData.constructorCompany} />
      <DefaultInfoContent name='시행사' notice={props.aptData.developerCompany} />
      <DefaultInfoContent name='현관구조' notice={props.aptData.doorStructure} />
      <View>
        <View style={{flexDirection:'row'}}>
          <View style={{width:80, minHeight:40, backgroundColor:'#F5F4F3', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}>
            <Typography fontSize={12} color='#8B8B8B'>홈페이지</Typography>
          </View>
          <TouchableOpacity 
            style={{flex:1, minHeight:40, backgroundColor:'#fff', justifyContent:'center', paddingHorizontal:10, paddingVertical:10}}
            onPress={()=>Linking.openURL(props.aptData.companyHomePage)}
          >
            <Typography fontSize={14} color='#0054FF' fontWeightIdx={2}><Text style={{textDecorationLine:'underline'}}>{props.aptData.companyHomePage}</Text></Typography>
          </TouchableOpacity>
        </View>
        <View style={{width:'100%', minHeight:1, backgroundColor:'#EFEFEF'}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
