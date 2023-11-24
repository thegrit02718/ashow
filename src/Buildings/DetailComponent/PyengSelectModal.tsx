import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import FormatNumber from '../../Components/FormatNumber';

export default function PyengSelectModal(props: any) {

  return (
    <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: '#fff', padding: 16 }}>
      <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal:10}}>
        <Typography fontSize={20}>평형 선택</Typography>
        <TouchableOpacity onPress={props.pyengSelectToggleModal}>
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Divider height={2} marginVertical={10}/>
      
      <View style={{}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{flex:2, marginRight:10}}>
            <Typography fontSize={14}>평형</Typography>
          </View>
          <View style={{flex:2, marginRight:10}}>
            <Typography fontSize={14}>전용면적</Typography>
          </View>
          <View style={{flex:3, marginRight:10}}>
            <Typography fontSize={14}>아쇼혜택가격</Typography>
          </View>
          <View style={{flex:3}}>
            <Typography fontSize={14}>최대할인</Typography>
          </View>
        </View>
        {
          props.pyengInfo.map((item : any, index: any)=>{
            
            const ashowPriceCopy = item.priceDefault - (item.discountDefault + item.ashowDiscountSum);
            const discountCopy = item.discountDefault + item.ashowDiscountSum;

            return (
              <TouchableOpacity 
                key={index}
                onPress={()=>{
                  props.setPyengSelect(item);
                  props.pyengSelectToggleModal();
                }}
              >
                <View style={{width:'100%', height: 80, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <View style={{flex:2, marginRight:10}}>
                    <Typography fontSize={20} marginBottom={7}>{item.pyeng}</Typography>
                    <Typography fontSize={12} color='#6F6F6F'>{item.houseHold}세대</Typography>
                  </View>
                  <View style={{flex:2, marginRight:10}}>
                    <View style={{flexDirection:'row'}}>
                      <Typography fontSize={13} fontWeightIdx={2}>공급  </Typography>
                      <Typography fontSize={13} >{item.officialArea}㎡</Typography>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <Typography fontSize={13} fontWeightIdx={2}>전용  </Typography>
                      <Typography fontSize={13} >{item.personalArea}㎡</Typography>
                    </View>
                  </View>
                  <View style={{flex:3, marginRight:10}}>
                    <Typography fontSize={13}>{FormatNumber(ashowPriceCopy)}</Typography>
                  </View>
                  <View style={{flex:3}}>
                    <Typography fontSize={13} color='#E0413B'>- {FormatNumber(discountCopy)}</Typography>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>  
    </View>
  );
}

