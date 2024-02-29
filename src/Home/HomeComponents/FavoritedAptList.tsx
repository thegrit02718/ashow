import React,{useState,useEffect,useCallback} from 'react';
import { View, TouchableOpacity, Image,} from 'react-native';
import { Typography } from '../../Components/Typography';
import { Alert } from 'react-native';
import dayjs from 'dayjs'
import { StyleSheet } from 'react-native';
import axios from 'axios';
import MainURL from '../../../MainURL';

export default function FavoritedAptList(props:any) {


  interface AptlistProps {
    aptKey : number;
    aptName: string;
    AddressCity : string;
    AddressCounty : string;
    AddressRest : string;
  }

  const [aptlist, setAptlist] = useState<AptlistProps[]>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/buildings/buildingsall`).then((res) => {
      let copy: any = [...res.data];
      const aptData = copy.sort((a:any, b:any) => b.viewCount - a.viewCount);
      setAptlist(aptData);
    });
  };
    
  useEffect(()=>{
    fetchPosts();
  }, []);

    const today = dayjs();
    const formattedToday = today.format('YYYY.MM.DD')
   
     
    return (
      <View style={{paddingHorizontal:15}}>
        <View style={[styles.flexBox,styles.justi_between,{alignItems:'flex-start'}]}>
          <View style={styles.titleContainer}>
            <Image style={styles.titleImage} source={require('../../images/home/title.png')} resizeMode='contain'/> 
            <Typography fontSize={18} color='#1B1B1B'>대구 조회 급상승 단지</Typography>
          </View>
        </View>
        <View style={styles.topTrendingSections}>
          {
            aptlist?.slice(0,5).map((item:any,index:any)=> {

              const copy = item.addressRest.split(' ');
              const addressRestCopy = copy[0];

              return (
                <TouchableOpacity 
                  style={[styles.flexBox,]} key={index}
                  onPress={()=>{
                    props.navigation.navigate('Navi_Detail', {
                      screen: 'DetailMain',
                      params: {
                        aptKey : item.aptKey,
                        pyengKey : 1,
                        userAccount : props.asyncGetData.userAccount,
                        userNickName : props.asyncGetData.userNickName
                      }
                    })
                  }} 
                  
                >
                  {/* onPress에 navigation 입력해야함*/} 
                  <View style={{width:30, alignItems:"center"}}> 
                    <Typography fontSize={16} color={index < 3 ? "#E8726E" : "#8B8B8B"} fontWeightIdx={0}>{index+1}</Typography>
                  </View>
                  <View style={{marginLeft:5}}>
                    <Typography fontSize={16} color='#1B1B1B' fontWeightIdx={1} >{item.aptName}</Typography>  
                    <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={2}>{item.addressCity} {item.addressCounty} {addressRestCopy}</Typography>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          <View style={{position:"absolute",right:0, bottom:0}}>
            <Typography color='#8B8B8B' fontSize={12} fontWeightIdx={2}>{formattedToday} 기준</Typography>
          </View>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#fff"
    },
    flexBox:{
      flexDirection:'row',
   
    },
    align_center:{
      alignItems:"center",
    },
    justi_between:{
      justifyContent:'space-between'
    },
    titleImage:{
      height: 30,
      width:30,
      marginRight:4,
    },
    selectButton:{
      paddingVertical:6, 
      paddingHorizontal:12,
      minWidth:70,
      borderWidth:1,
      borderColor:"#DFDFDF",
      borderRadius: 8
    },
  
    topTrendingSections:{
       marginVertical:16,
       position:'relative',
       flexDirection:'column',
       gap: 14
    },
    titleContainer:{
      flexDirection:'row',
      alignItems:"center",
      marginBottom: 5,
    },
    topImgSwifeBox: {
      width: '100%',
      justifyContent: 'center',
      marginTop:20
    },
    scrollImages: {
      width: "180%",
      height: 100,
      borderRadius: 20,
   
    },
    locationData:{
      alignItems:"center",
      marginVertical:8
    },
    locationDataContent:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
       marginLeft: 16 
    },
    curtain:{
      height:"100%",
      backgroundColor:"rgba(0,0,0,0.8)",
      position:'relative',
    },
    modalInner:{
      position:'absolute',
      bottom:0,
      left:0,
      minHeight:"50%",
      width:"100%",
      backgroundColor:"#fff",
      borderTopLeftRadius: 16,
      borderTopRightRadius:16,
      alignItems:'center'
    },
    resizeIcon:{
      width:36,
      height:5,
      backgroundColor: "#DFDFDF",
      borderRadius:5,
      alignItems:"center",
      marginVertical:15
    },
    selectedItem:{
      width:"33%",
      alignItems:"center",
      justifyContent:"center",
      paddingVertical:23,
      paddingHorizontal:12,
      borderWidth:1,
      borderColor:"#DFDFDF",
    },noBorderRight: {
      borderRightWidth: 0,
    },
    noBorderBottom: {
      borderBottomWidth: 0,
    },

}) 