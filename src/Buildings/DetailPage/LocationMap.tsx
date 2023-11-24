import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { SubTitle } from '../../Components/SubTitle';
import { useRoute } from '@react-navigation/native';
import NaverMapView, { Marker } from "react-native-nmap";
import axios from 'axios';
import { Typography } from '../../Components/Typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LocationMap(props:any) {

  const route : any = useRoute();
  const query = route.params.addressData;
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const addressAPI = async () => {
    try {
      const res = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`, {
        headers : {
          "X-NCP-APIGW-API-KEY-ID": "ejocs5mnxg",
          "X-NCP-APIGW-API-KEY": "93tUhZoBOz4wKnMiDRWaisbtOujz5uaQfSRNJfuV",
        }
      });
      setLatitude(parseFloat(res.data.addresses[0].y));
      setLongitude(parseFloat(res.data.addresses[0].x));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    addressAPI();
  }, []);

  const P0 = {latitude: latitude, longitude: longitude};
  
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <SubTitle title='지도' navigation={props.navigation} />
      <View style={{flex:1}}>
        <NaverMapView 
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={true}
          center={{...P0, zoom: 16}}
        >
          <Marker 
            coordinate={P0} 
            caption={{text : `${route.params.aptName}`, color:'#fff', haloColor: '#E5625D', textSize: 20}}
          />
        </NaverMapView>
      </View>
      <View style={{backgroundColor:'#fff', padding:20}}>
        <Typography marginBottom={10}>{route.params.aptName}현장</Typography>
        <Typography fontSize={14} color='#555' marginBottom={10}>{route.params.addressData}</Typography>
        <TouchableOpacity 
          onPress={()=>Linking.openURL(`tel:${route.params.aptSitePhone}`)}
        >
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <FontAwesome  name='phone' color='#F0A3A1' size={12}/>
            <Typography fontSize={14} color='#555'> 전화번호 </Typography>
            <Typography fontSize={14} color='#555'>{route.params.aptSitePhone}</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
