import React, { useEffect,useState } from "react";
import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { Typography } from "../Components/Typography";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import Swiper from "react-native-swiper";

type SelectedItemType = {
    list: CityDataProps[][];
    city: {
        isSelected: boolean;
        code : string | undefined;
        name: string | undefined;
    };
    county:{
        isSelected: boolean;
        code : string | undefined ;
        name: string | undefined;
    }
}

type CityDataProps = {
    code: string;
    name: string;
}


export default function ResidenceSelect ( props : any) {
    
  const [selectedList, setSelectedList] = useState<SelectedItemType>(
      {
          list:[],
          city:{
              isSelected: false,
              code: "",
              name: "",
          },
          county:{
              isSelected: false,
              code: "",
              name: "",
          }
      }
  )
  
  // 구/군의 리스트 네임에서 도시의 이름을 추출하는 함수 
  const extractDistrictName = (cityName: string, districtName: string): string => {
      const extreatedtName = districtName.replace(cityName, ''); // 도시 코드를 제외한 부분이 구의 코드

      return extreatedtName;
  }

  // 받아온 데이터를 몇개 단위로 잘라서 state에 저장해주는 함수
  const createSlicedList = (data:CityDataProps[]) =>{
      const itemsPerSlide = 15;
      const slicedLists = Array.from({
          length: Math.ceil(data.length / itemsPerSlide)
      }).map((_, idx) =>
          data.slice(
              idx * itemsPerSlide,
              (idx + 1) * itemsPerSlide
          )
      )
      setSelectedList((prev)=>({
          ...prev,
          list: slicedLists,
      }))
      
  }
  
  // 구/군의 리스트를 받아오는 함수
  const fetchAllNeighborhoodsInCity = async (cityCode:string) => {
      try{
          const cityPrefix = cityCode.slice(0, 2); // 도시 코드에서 앞의 두 자리를 추출
          const res  = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityPrefix}*00000`);
          createSlicedList(res.data.regcodes );
      } catch (error) {
        console.log(error);
      }
  }
  
  // 도시의 리스트를 받아오는 함수
  const fetchCityDistrictData = async(cityCode:string = "*00000000") =>{
      try{
          const res = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityCode}`);
          const itemsPerSlide = 15;
          createSlicedList(res.data.regcodes );
      }catch(error){
          console.log(error);
      }
  }
  
  // 리스트 아이템들을 클릭 했을때 실행
  const handleListClick = (key: 'city'| 'county',name:string, code:string) => {
    if(key === 'city'){
        // state에 도시 선택이 되었다고 데이터를 저장 > 뷰에 도시 이름이 올라감
        setSelectedList((prevSelectedList) => ({
            ...prevSelectedList,
            [key]: {
                name: name,
                code: code,
                isSelected: true,
            },
        }));
        // 도시 코드로 구/군의 리스트들을 받아옴
        fetchAllNeighborhoodsInCity(code);
        return
    } else {
        // key === 'county'
        if(selectedList.city.name){
            const extractName = extractDistrictName(selectedList.city.name,name)
            setSelectedList((prevSelectedList) => ({
                ...prevSelectedList,
                [key]: {
                    name: extractName,
                    code: code,
                    isSelected: true,
                },
            }));
        }
        return;
    }   
  };
  
  useEffect(()=>{
    fetchCityDistrictData();
  }, [])

  const moveAgreePage = () => {
    if (selectedList.city.name !== "" && selectedList.county.name !== "") {
      const updatedData = { ...props.route.params.data, city : selectedList.city.name, county : selectedList.county.name };
      props.navigation.navigate('Agree', { data: updatedData });
    } else {
      Alert.alert('관심지역을 선택해주세요');
    }
  };

  return(

    <View style={styles.container}>
      <ScrollView style={{flex:1}}>
        
        <View style={styles.progressBarBox}>
          <View style={styles.progressBar}>
            <View style={styles.progress}></View>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View style={{}}>
            <Typography fontSize={24} marginBottom={10} fontWeightIdx={2}>{props.route.params.data.nickName}님의</Typography>
            <Typography fontSize={24} fontWeightIdx={2}>관심지역을 설정해 주세요.</Typography>
          </View>

          <View style={styles.contentInner}>
            <View style={styles.selectTitle}>
                <TouchableOpacity 
                  onPress={()=>{
                    setSelectedList({
                      list: [],
                      city:{ isSelected: false, code: "", name: "" },
                      county:{ isSelected: false, code: "", name: "" }
                  })
                    fetchCityDistrictData();
                  }}
                >
                  <View style={{minWidth:110, alignItems:'center'}}>
                      <Typography fontSize={16} fontWeightIdx={2} color={!selectedList.county.isSelected && selectedList.city.isSelected ? "#E8726E":"#8B8B8B"}>{selectedList.city.name !== "" ? selectedList.city.name : "시/도 선택" }</Typography>
                  </View>
                </TouchableOpacity>
                <SimpleLineIcons name="arrow-right" size={18} color="#E8726E" style={{marginBottom:-1}}/>
                <View style={{minWidth:110, alignItems:'center'}}>
                    <Typography fontSize={16} fontWeightIdx={2} color={selectedList.county.isSelected ? "#E8726E":"#8B8B8B"}>{selectedList.county.name !== "" ?  selectedList.county.name : "시/군/구 선택" }</Typography>
                </View>
            </View>
            <Swiper  
                showsButtons={false}
                key={selectedList.list.length} 
                dot={<View style={styles.paginationDot} />}
                activeDot={<View style={styles.activePaginationDot} />}
                style={{ height: 400}}>
                {selectedList.list.map((slicedArray: any, arrayIdx: number) => {
                    return <View key={arrayIdx} style={[styles.selectBox,{width:"100%",}]}>
                    {slicedArray.map((item: CityDataProps, idx: number) => {
                        return (
                        <TouchableOpacity
                        key={item.code}
                        onPress={() => handleListClick(selectedList.city.isSelected ? 'county' : 'city', item.name, item.code)}
                        style={[
                            styles.selectedItem,
                            !((idx + 1) % 3 === 0) && styles.noBorderRight,
                            idx < slicedArray.length - 3 && styles.noBorderBottom,
                            idx === slicedArray.length - 1 && { borderRightWidth: 1 },
                            item.code === selectedList.county.code && selectedList.county.isSelected && styles.selectedItemActive,
                        ]}>
                            <View style={{flexDirection:"row"}}>
                                <Typography fontSize={12} color="#1B1B1B">
                                    {selectedList.city.name && selectedList.city.isSelected
                                        ? extractDistrictName(selectedList.city.name, item.name)
                                        : item.name}
                                </Typography>
                            </View>
                        </TouchableOpacity>)
                        })}
                    </View>
                })}
            </Swiper>
          </View>

          <TouchableOpacity 
            onPress={moveAgreePage}
            style={
              selectedList.county.name !== "" ? [styles.nextBtnBox, { backgroundColor: '#E8726E'}] 
              : [styles.nextBtnBox, { backgroundColor: '#F0A3A1'}] 
            }>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
      
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight()
  },
  progressBarBox: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
  },
  progressBar: {
    backgroundColor: '#EFEFEF',    
  },
  progress: {
    width: '66%',
    height: 6,
    backgroundColor: '#F0A3A1',
  },
  mainContainer: {
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    width: 50,
    height: 50,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  

  flexCenter:{
      alignItems:'center',
      justifyContent:'center',
  },
  flexRow:{
      flexDirection:"row"
  },
  selectTitle:{
      borderWidth:2,
      borderColor:"#F0A3A1",
      borderRadius:4,
      flexDirection:'row',
      alignItems:"flex-end",
      justifyContent:"space-around",
      paddingHorizontal:24,
      paddingVertical:12,
  },
  resizeIcon : {
      width: 36,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: "#DFDFDF",
      marginVertical:15,
  },
  contentBox:{
      borderRadius: 16,
      width:"100%",
      backgroundColor:"#fff",
      paddingHorizontal:24,
      position:'absolute',
      bottom:0,
  },
  contentInner:{
    marginTop:20,
  },
  selectBox:{
      flexWrap:"wrap",
      flexDirection:'row',
      marginVertical:24,
      minHeight:60,
      position:"relative",
  },
  selectedItem:{
      width:"33%",
      alignItems:"center",
      justifyContent:"center",
      paddingVertical:23,
      paddingHorizontal:12,
      borderWidth:1,
      borderColor:"#DFDFDF",
  },
  noBorderRight: {
    borderRightWidth: 0,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  button:{
      padding:16,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      flexDirection:"row",
      marginVertical:30,
  },
  enabledButton:{
      backgroundColor:"#DFDFDF" 
  },
  abledButton:{
      backgroundColor:"#E8726E"
  },
  selectedItemActive: {
      backgroundColor: "rgba(240, 163, 161, 0.5)",
      color:"#E8726E",
  },
  imageBackground:{
      position:"absolute", 
      backgroundColor:"rgba(0,0,0,0.3)", 
      height:"100%",
      width:"100%", 
      alignItems:"center", 
      justifyContent:"center"
  },
  paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  activePaginationDot: {
    width: 24,
    height: 8,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: '#EB827F',
  },
  nextBtnBox: {
    backgroundColor: '#F0A3A1',
    borderRadius: 16,
    width: '100%',
    marginBottom: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
})