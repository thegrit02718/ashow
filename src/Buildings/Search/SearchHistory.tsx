import React,{useEffect, useState} from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { Typography } from '../../Components/Typography'
import { StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Divider } from '../../Components/Divider'
import { Alert } from 'react-native'


interface historyProps{
  visitedList : visitedListProps[];
  favoritedList: favoritedListProps[];
}

type visitedListProps = {
  address:string;
  type:string;
  aptKey: string | number;
}
type favoritedListProps = {
  name:string;
  address:string;
}

function SearchHistory( ) {
  const [historyList,setHistoryList] = useState<historyProps>({
    visitedList: [],
    favoritedList: []
  })
 
    const dummyData1 = [
        { address: "대구 수성구", type:"지역",aptKey:1 },
        { address: "대구", type:"지역",aptKey:2 },
        { address: "대구 수성구 만촌동", type:"지역", aptKey:3 },
        { address: "대구", type:"지역",aptKey:4 },
        { address: "대구 수성구", type:"지역", aptKey:5 },
    ]
    const dummyData2 = [
      {
        promotionSite:"수성더팰리스",
        addressCity: "대구광역시",
        addressCounty: "수성구",
        addressRest: "만촌동 1489"
      },
      {
        addressCity: "대구광역시",
        addressCounty: "수성구",
        addressRest: "수성동1가 649-19번지",
        promotionSite: "푸르지오더샵",
      }
    ]
    const filteredAddress = dummyData2?.map(item =>{
      let filteredCity = item.addressCity.slice(0,2);
      let filteredaddressRest = item.addressRest.split(" ")[0];
      return {
        name: item.promotionSite,
        address: filteredCity + " " + item.addressCounty+ " " + filteredaddressRest
      }
    })

    useEffect(() => {
      setHistoryList({
        visitedList: dummyData1,
        favoritedList: filteredAddress,
      })
    },[])
     
      const deleteAll = () => {
         setHistoryList((prev:any) =>{
          return {
            ...prev,
            visitedList: []
          }
         });
         // 전체삭제 api 필요
      };

      const deleteList = (aptKey: string) => {
        console.log(aptKey);
        setHistoryList((prev: historyProps) => {
          return {
            ...prev,
            visitedList: prev.visitedList.filter(item =>{
              console.log(item.aptKey,aptKey,item.aptKey !== aptKey);
              return item.aptKey.toString() !== aptKey
            }),
          };
        });
        //부분삭제 api 필요
      };

    return (
        <View style={styles.wrapper}>
            <View>
                <View style={[styles.titleBox,{  flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                  <Typography color='#333' fontSize={16} fontWeightIdx={0}>최근 방문</Typography>
                  <TouchableOpacity onPress={deleteAll} >
                    <Text style={styles.deleteAllBtn}>전체삭제</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {historyList.visitedList.length >= 1 ? historyList.visitedList.map((item,idx) => {
                    return (
                    <View key={idx} style={[styles.flexBox, styles.align_center,{justifyContent:'space-between', marginVertical:8}]}> 
                      <TouchableOpacity onPress={()=>Alert.alert('click')} style={[styles.flexBox, styles.align_center]}>
                         {/* onPress에 navigation 입력해야함*/} 
                        <Entypo  name="location-pin" size={18} color="#555555" style={{marginRight:8}}/> 
                        <View style={[styles.flexBox, styles.align_center ]}>
                          <Typography fontSize={14} fontWeightIdx={1} color='#1B1B1B'>{item.address} </Typography> 
                          <Text style={{fontSize:12, color:"#6F6F6F", marginBottom:2}}>· {item.type}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=> deleteList(item.aptKey.toString())}>
                       <EvilIcons  name="close" size={22} color="#555555" style={{marginBottom: 4}}/> 
                      </TouchableOpacity>
                    </View>)
                  }) : 
                  <View style={[styles.align_center,{justifyContent:'center', marginVertical:20}]}>
                     <Typography color='#8B8B8B' fontSize={14} fontWeightIdx={1}>최근 방문한 곳이 없어요.</Typography>
                  </View>
                  }
                </View>
            </View>
            <View >
              <View style={styles.titleBox}>
                <Typography fontSize={16}>관심단지</Typography>
              </View>
                <View>
                  {dummyData2.length > 1 ? filteredAddress.map(item => {
                    return (
                      <TouchableOpacity onPress={()=>Alert.alert('click')}style={{marginVertical:8}}>
                        {/* onPress에 navigation 입력해야함*/} 
                        <View style={[styles.flexBox,{alignItems:"center", justifyContent:"space-between", marginVertical:8}]}>
                          <View>
                            <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={2}>{item.address}</Typography>
                            <Typography fontSize={16} color='#1B1B1B' fontWeightIdx={1}>{item.name}</Typography>
                          </View>
                          <SimpleLineIcons name="arrow-right" size={12} color="#555555"/> 
                        </View>
                        <Divider height={1}/>
                      </TouchableOpacity>
                    )
                  }) : 
                  <Typography color='#8B8B8B' fontSize={14}>관심 단지가 없어요.</Typography>
                  }
                </View>
            </View>      
        </View>
    )
}

export default SearchHistory

const styles = StyleSheet.create({
    wrapper:{
        paddingHorizontal:24,
    },
    flexBox: {
        flexDirection:'row',
    },
    align_center:{
      alignItems:"center"
    },
    titleBox:{
        marginTop:24,
        marginBottom:8,
    },
    deleteAllBtn:{
        fontFamily: "Pretendard-Regular",
        textDecorationLine: 'underline',
        color:"#3D3D3D",
        fontSize:14,
    }
})