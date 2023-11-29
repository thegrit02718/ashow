import React,{useState,useEffect,useCallback} from 'react';
import { View, TouchableOpacity, ScrollView, Image, Modal,Dimensions,Text} from 'react-native';
import { Typography } from '../../Components/Typography';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons'
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs'
import axios from 'axios';
import Carousel from './Carousel';
import { Alert } from 'react-native';

type Props = {
    location: string;
}
type CityDataProps = {
  code: string;
  name: string;
}
function SearchRecommendations({location} :Props) {
    const dummyData = [
        {
          name: "평촌자이아이파크",
          address:"경기도 안양시 동안구 비산동",
        },
        {
          name:"동탄레이크파크자연앤e편한세상(민영)",
          address:"경기도 화성시 장지동",
        },
        {
          name: "동탄레이크파크자연앤e편한세상(국민)",
          address: "경기도 화성시 장지동",
        },
        {
          name: "탕정푸르지오리버파크",
          address: "충청남도 아산시 탕정면 갈산리"
        },
        {
          name: "이문아이파크자이",
          address: "서울 동대문구 이문동"
        }]
    
    const today = dayjs();
    const formattedToday = today.format('YYYY.MM.DD')
    const [isPopuped, setIsPopuped] = useState(false);
    const [selectedList, setSelectedList] = useState<CityDataProps[]>([]);
    const [currentRegion, setCurrentRegion] = useState('전국');
    const width = Dimensions.get('window').width;
    const [page, setPage] = useState(0);
    const toggle = () =>{
      setIsPopuped(!isPopuped);
    }

    const fetchCityDistrictData = useCallback(async(cityCode:string = "*00000000") =>{
      try{
          const res = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityCode}`);
          const nationwideData = { name: "전국" };
          const updatedList = [nationwideData, ...res.data.regcodes];
          setSelectedList(updatedList);
      }catch(error){
          console.log(error);
      }
    },[]);
  
    const handleListClick = (name:string) => {
      setCurrentRegion(name);
      toggle();

      // 단지 리스트를 불러올 api 필요 
   }
   
    useEffect(()=>{
      fetchCityDistrictData();
    },[])
 
    const [pages, setPages] = useState(0);

    const CarouselCardItem = ({  index }:any) => {
      return (
        <View style={{width: width}}>
          <Image style={{width: "100%"}}
            source={require('../../images/search/swiper_apt1.png')} resizeMode='contain'
          />
        </View>
      )
    }
 
    const PAGES = [
      {
        num: 1,
        color: '#86E3CE',
        image: require('../../images/search/swiper_apt1.png') 
      },
      {
        num: 2,
        color: '#D0E6A5',
        image: require('../../images/search/swiper_apt1.png') 
      },
      {
        num: 3,
        color: '#FFDD94',
        image: require('../../images/search/swiper_apt1.png') 
      },
      {
        num: 4,
        color: '#FA897B',
        image: require('../../images/search/swiper_apt1.png') 
      },
      {
        num: 5,
        color: '#CCABD8',
        image: require('../../images/search/swiper_apt1.png') 
      },
    ];

  return (
      <View style={{paddingVertical:20}}>
        <View style={{paddingHorizontal:24}}>
          <View style={[styles.flexBox,styles.justi_between,{alignItems:'flex-start'}]}>
            <View style={styles.titleContainer}>
              <Image style={styles.titleImage} source={require('../../images/search/title.png')} resizeMode='contain'/> 
              <Typography fontSize={18} color='#1B1B1B'>전국 인기 급상승 단지</Typography>
            </View>
            <TouchableOpacity style={[styles.flexBox,styles.align_center,styles.selectButton]} onPress={toggle}>
              <Typography color='#1B1B1B' fontSize={14} fontWeightIdx={1}>{currentRegion}</Typography>
              <SimpleLineIcons  name="arrow-down" size={10} color="#3D3D3D" style={{marginLeft:8}}/> 
            </TouchableOpacity>
          </View>
          <View style={styles.topTrendingSections}>
            {dummyData.map((item,idx)=> {
              
              return (
                <TouchableOpacity onPress={()=>Alert.alert('click')} style={[styles.flexBox,{marginBottom:12}]} key={idx}>
                  {/* onPress에 navigation 입력해야함*/} 
                  <View style={{width:30, alignItems:"center"}}> 
                    <Typography fontSize={16} color={idx < 3 ? "#E8726E" : "#8B8B8B"} fontWeightIdx={0}>{idx+1}</Typography>
                  </View>
                  <View style={{marginLeft:5}}>
                    <Typography fontSize={14} color='#1B1B1B' >{item.name}</Typography>  
                    <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={1}>{item.address}</Typography>
                  </View>
                </TouchableOpacity>
              )
            })}
            <View style={{position:"absolute",right:0, bottom:0}}>
              <Typography color='#8B8B8B' fontSize={12} fontWeightIdx={1}>{formattedToday} 기준</Typography>
            </View>
          </View>
        </View>
        <View>
          <Carousel
            gap={16}
            offset={10}
            pages={PAGES}
            pageWidth={width - (16 + 16) * 2}
          />
        </View>
        <View style={{paddingHorizontal:24}}>
          <View style={styles.titleContainer}>
            <Image source={require('../../images/search/title2.png')} style={styles.titleImage} resizeMode='contain' /> 
            <Typography fontSize={16} color='#1B1B1B' fontWeightIdx={0}>{location}의 이 단지 어떠세요?</Typography>
          </View>
          <TouchableOpacity onPress={()=>Alert.alert('click')} style={[styles.flexBox, styles.locationData]}>
            {/* onPress에 navigation 입력해야함*/} 
            <Image style={{ width:80,height:80}}source={require('../../images/search/apt_list1.png')} resizeMode='contain'/>
            <View style={styles.locationDataContent}> 
              <View>
                <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={1}>수성구 수성동</Typography>
                <Typography fontSize={15} color='#333' fontWeightIdx={0}>더샵수성오클레어</Typography>
                <Typography fontSize={12} color='#333333' fontWeightIdx={1}>899세대·2023.05 입주</Typography>
              </View>
              <SimpleLineIcons  name="arrow-right" size={16} color="#C1C1C1" style={{marginLeft:8}}/> 
            </View>
          </TouchableOpacity>
        </View>
        <Modal  
        animationType="slide"
        transparent={true}
        visible={isPopuped}
        onRequestClose={toggle}>
           <TouchableOpacity onPress={toggle}><View style={styles.curtain}/></TouchableOpacity>      
           <View style={styles.modalInner}>
              <View style={styles.resizeIcon}/>
              <View style={{flexDirection:'row', flexWrap:'wrap',padding:24}}>
              {selectedList.map((item: CityDataProps, idx: number) => {
                return (
                    <TouchableOpacity
                    key={idx}
                    onPress={() => handleListClick(item.name)}
                    style={[
                        styles.selectedItem,
                        !((idx + 1) % 3 === 0) && styles.noBorderRight,
                        idx < selectedList.length - 3 && styles.noBorderBottom,
                        idx === selectedList.length - 1 && { borderRightWidth: 1 }
                    ]}>
                        <View style={{flexDirection:"row"}}>
                            <Typography fontSize={12} color="#1B1B1B">
                                {item.name}
                            </Typography>
                        </View>
                    </TouchableOpacity>)
                })}
              </View>
           </View>
        </Modal>
      </View> 
  )
}

export default SearchRecommendations

export const styles = StyleSheet.create({
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
       marginVertical:15,
       position:'relative'
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