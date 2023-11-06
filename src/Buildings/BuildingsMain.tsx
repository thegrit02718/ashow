import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../Components/Typography';

function BuildingsMain (props : any) {

  const aptlist = [    
  { name : "만촌 자이르네", address: "수성구 만촌동" }, 
  { name : "수성 자이르네", address:  "수성구 수성동"}, 
  { name : "서대구역 반도유보라센텀", address: "서구 평리동"}, 
  { name :  "태왕아너스프리미어", address: "북구 관음동" }, 
  { name : "화성파크드림 수산공원", address:  "북구 읍내동"}, 
  { name : "대구노곡한신더휴", address: "북구 노곡동" }, 
  { name : "황금 자이르네", address: "수성구 황금동"}, 
  { name : "동호센트럴파크", address:  "동구 동호동"}
  ]

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        {
          aptlist.map((item, index)=>{
            return(
              <TouchableOpacity
                key={index} 
                onPress={()=>{
                  props.navigation.navigate('Detail');
                }}
              >
                <View style={{ width:'100%', height: 100, borderTopWidth:1, borderColor:'gray', padding: 10, flexDirection:'row'}}>
                  <View style={{width:60, marginRight:10, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../images/buildings/buildingIcon.png')} style={{width:50, resizeMode:'contain'}}/>
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <Typography color='#F15F5F' fontSize={12}>할인분양  즉시입주</Typography>
                    <Typography fontSize={20}>{item.name}</Typography>
                    <Typography color='gray'>{item.address}</Typography>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View> 
   );
}
export default BuildingsMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    padding: 24
  },
  imgbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    flex: 1,
    width: '100%',
    height: 700,
    resizeMode: 'contain'
  }
});

