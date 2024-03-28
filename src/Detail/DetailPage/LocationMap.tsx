import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SubTitle } from '../../Components/SubTitle';
import { useRoute } from '@react-navigation/native';
import NaverMapView, { Marker, Circle } from "react-native-nmap";
import axios from 'axios';
import { Typography } from '../../Components/Typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LocationMap(props:any) {

  const route : any = useRoute();
  const addressQuery = route.params.addressData;
  const promotionQuery = route.params.promotionSite.includes(',') ? route.params.promotionSite.split(',')[0] : route.params.promotionSite;
  const [addressLatitude, setAddressLatitude] = useState<number>(0);
  const [addressLongitude, setAddressLongitude] = useState<number>(0);
  const [promotionLatitude, setPromotionLatitude] = useState<number>(0);
  const [promotionLongitude, setPromotionLongitude] = useState<number>(0);
  const [selectedBtn, setSelectedBtn] = useState(0);

  const addressAPI = async () => {
    try {
      const address = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${addressQuery}`, {
        headers : {
          "X-NCP-APIGW-API-KEY-ID": "ejocs5mnxg",
          "X-NCP-APIGW-API-KEY": "93tUhZoBOz4wKnMiDRWaisbtOujz5uaQfSRNJfuV",
        }
      });
      const promotion = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${promotionQuery}`, {
        headers : {
          "X-NCP-APIGW-API-KEY-ID": "ejocs5mnxg",
          "X-NCP-APIGW-API-KEY": "93tUhZoBOz4wKnMiDRWaisbtOujz5uaQfSRNJfuV",
        }
      });
      setAddressLatitude(parseFloat(address.data.addresses[0].y));
      setAddressLongitude(parseFloat(address.data.addresses[0].x));
      setPromotionLatitude(parseFloat(promotion.data.addresses[0].y));
      setPromotionLongitude(parseFloat(promotion.data.addresses[0].x));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    addressAPI();
  }, []);

  const P0 = {latitude: addressLatitude, longitude: addressLongitude};
  const P1 = {latitude: promotionLatitude, longitude: promotionLongitude};
  
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <SubTitle title='지도' navigation={props.navigation} />
      <View style={{flex:1, paddingBottom:130}}>
        {
          selectedBtn === 0 
          ?
          <NaverMapView 
            style={{width: '100%', height: '100%'}}
            showsMyLocationButton={true}
            center={{...P0, zoom: 16}}
          >
            <Marker 
              coordinate={P0} 
            />
          </NaverMapView>
          :
          <NaverMapView 
            style={{width: '100%', height: '100%'}}
            showsMyLocationButton={true}
            center={{...P1, zoom: 16}}
          >
            <Marker 
              coordinate={P1} 
            />
          </NaverMapView>
        }
        <View style={{width:100, height:150, position:'absolute', top:0, right:10, alignItems:'center'}}>
          <TouchableOpacity 
            activeOpacity={0.9}
            style={[styles.topRightBtn, {borderColor: selectedBtn === 0 ? "#E8726E" : "#DFDFDF"}]}
            onPress={()=>{setSelectedBtn(0);}}
          ><Typography color={selectedBtn === 0 ? "#E8726E" : "#1B1B1B"}>현장</Typography></TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.9}
            style={[styles.topRightBtn, {borderColor: selectedBtn === 1 ? "#E8726E" : "#DFDFDF"}]}
            onPress={()=>{setSelectedBtn(1);}}
          ><Typography color={selectedBtn === 1 ? "#E8726E" : "#1B1B1B"}>홍보관</Typography></TouchableOpacity>
        </View>
      </View>
      <View style={{position:'absolute', bottom:0, width:'100%', minHeight:150,
          backgroundColor:'#fff', paddingHorizontal:20, paddingTop:30, paddingBottom:50,
          borderTopColor:'#EAEAEA', borderTopWidth:2, borderTopRightRadius:30, borderTopLeftRadius:30
        }}>
        <Typography marginBottom={10}>{route.params.aptName} { selectedBtn === 0 ? '현장' : '홍보관'}</Typography>
        <Typography fontSize={14} color='#555' marginBottom={10}>
          {selectedBtn === 0 ? route.params.addressData : route.params.promotionSite}
        </Typography>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <FontAwesome  name='phone' color='#F0A3A1' size={12}/>
          <Typography fontSize={14} color='#555'> 전화번호  </Typography>
          <Typography fontSize={14} color='#555'>{route.params.promotionPhone}</Typography>
        </View>
        <View style={{flexDirection:'row', marginTop:20}}>
          <TouchableOpacity 
            onPress={()=>Linking.openURL(`tel:${route.params.promotionPhone}`)}
          >
          <View style={styles.bottomBtn}><Typography color='#6F6F6F' fontWeightIdx={2} fontSize={14}>전화</Typography></View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>Linking.openURL(route.params.companyHomePage)}
          >
          <View style={styles.bottomBtn}><Typography color='#6F6F6F' fontWeightIdx={2} fontSize={14}>홈페이지</Typography></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRightBtn : {
    marginTop:15,
    width:80, 
    borderWidth:2, 
    padding:10, 
    borderRadius:5,
    alignItems:'center',
    backgroundColor:'#fff'
  },
  bottomBtn : {
    width:100, 
    borderWidth:1, 
    borderColor:'#DFDFDF',
    borderRadius:5,
    padding:5, 
    alignItems:'center'
  }
});
