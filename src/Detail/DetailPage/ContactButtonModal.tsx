import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Linking, Alert  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import AsyncGetItem from '../../AsyncGetItem';

export default function ContackButtonModal(props: any) {

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    asyncFetchData();
  }, []);

  return (
    <View style={{ width: '100%', height:'100%', position: 'absolute'}}>
      <View style={{ width: '100%', height:'100%', position: 'absolute', backgroundColor:'#333', opacity:0.8}}></View>
      <View style={{flex:1}}></View>
      
      <View style={{alignItems:'center'}}>
        <View style={{width:'90%', height:200}}>
          <Image source={require('../../images/buildingsDetail/presentInfo.png')} style={{width:'100%', height:'100%', resizeMode:'contain'}}/>
        </View>
      </View>

      <View style={{alignItems:'flex-end', padding:20, paddingBottom:50}}>
        <View style={{flexDirection:'row', marginBottom:15, alignItems:'center'}}>
          <Typography color='#fff'>모델하우스에 상담하기</Typography>
          <TouchableOpacity 
            style={{}}
            onPress={()=>Linking.openURL(`tel:${props.promotionPhone}`)}
          >
            <View style={{width:56, height:56, backgroundColor:"#fff", marginLeft:20,
                          borderRadius:28, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../../images/buildingsDetail/headset.png')}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', marginBottom:15, alignItems:'center'}}>
          <Typography color='#fff'>아쇼 통해서 혜택받고 상담하기</Typography>
          <TouchableOpacity 
            style={{}}
            onPress={()=>{
              Alert.alert('준비중입니다.')
            }}
          >
            <View style={{width:56, height:56, backgroundColor:"#fff", marginLeft:20,
                          borderRadius:28, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../../images/buildingsDetail/present.png')}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', marginBottom:15, alignItems:'center'}}>
          <Typography color='#fff'>카카오톡으로 상담받기</Typography>
          <TouchableOpacity 
            style={{}}
            onPress={()=>{
              Alert.alert('준비중입니다.')
            }}
          >
            <View style={{width:56, height:56, backgroundColor:"#fff", marginLeft:20,
                          borderRadius:28, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../../images/buildingsDetail/iconkakao.png')}/>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={{}}
          onPress={props.contactButtonToggleModal}
        >
          <View style={{width:56, height:56, backgroundColor:"#E8726E",
                        borderRadius:28, alignItems:'center', justifyContent:'center'}}>
            <AntDesign name="close" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

