import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import { getStatusBarHeight } from "react-native-status-bar-height";
import axios from 'axios';
import MainURL from '../../MainURL';

export default function MainSelectLocationModal(props: any) {

  const [allLengths, setAllLength] = useState(0);
  const [lengths, setLength] = useState<string[]>([]);

  const locationlist = ["전체", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구", "군위군"]
  const fetchPosts = () => {
    axios.get(`${MainURL}/buildings/pyenginfoall/${locationlist[0]}`).then((res) => {
      let copy: any = [...res.data];
      setAllLength(copy.length);
      let lengths = []
      for (let i = 0; i < locationlist.length; i++) {
        const filteredData = copy.filter((e: any) => e.addressCounty === locationlist[i]);
        lengths.push(filteredData.length);
      }
      setLength(lengths);
    });
  };
    
  useEffect(()=>{
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={props.selectLocaionToggleModal}
        >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>  
      <Typography fontSize={24}>시/군/구 선택</Typography>

      <View style={{flex:1, flexDirection:'row', paddingVertical:20}}>
        <View style={{width:'40%'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{width:4, height:24, backgroundColor:"#E8726E", marginRight:10}}></View>
            <Typography fontSize={20}>대구시</Typography>
          </View>
        </View>
        <View style={{width:'60%', justifyContent:'space-between'}}>
          {
            props.locationlist.map((item:any, index:any)=>{
              return (
                <TouchableOpacity
                  key={index}
                  onPress={()=>{
                    props.setSelectLocation(item);
                    props.selectLocaionToggleModal();
                  }}
                >
                  <View 
                    key={index}
                    style={{height:30, flexDirection:'row', alignItems:"center", justifyContent:'space-between',
                            borderBottomWidth:1, borderBottomColor: props.selectLocation === item ? "#F0A3A1" : "#F5F4F3"
                    }}>
                    <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                      <Typography 
                        color={props.selectLocation === item ? '#1B1B1B' : '#6F6F6F'}
                        fontWeightIdx={props.selectLocation === item ? 0 : 2}
                      >{item}  </Typography>  
                      <Typography color='#8C8C8C' fontWeightIdx={2} fontSize={12}>
                        {index === 0 ? allLengths : lengths[index]}개
                      </Typography>  
                    </View>
                    { props.selectLocation === item && <AntDesign name='check' size={20} color="#E8726E"/> }
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
    marginBottom:20
  },
  backButton: {
    width: 50,
    height: 50,
    marginBottom: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})