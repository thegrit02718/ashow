import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Typography } from "../Components/Typography";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
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

export default function EditResidenceModal (props:any) {
    
  const [isAbled,setIsAbled] = useState(false);
  const [isPopuped, setIsPopuped] = useState(true);
  const [selectedList, setSelectedList] = useState<SelectedItemType>(
      { list:[], city:{ isSelected: false, code: "", name: "" }, county:{ isSelected: false, code: "", name: "",}}
  )

  const fetchPosts = async () => {
    const cityCode:string = "*00000000";
    try{
      const res = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityCode}`);
      createSlicedList(res.data.regcodes);
    } catch (error) {
      console.log(error);
    }
  };

	useEffect(() => {
    fetchPosts();
  }, []);
  
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
  
  // 리스트 아이템들을 클릭 했을때 실행
  const handleListClick = async (key: 'city'| 'county',name:string, code:string) => {
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
            await setSelectedList((prevSelectedList) => ({
                ...prevSelectedList,
                [key]: {
                    name: extractName,
                    code: code,
                    isSelected: true,
                },
            }));
            setIsAbled(true);
            const copy = {...props.userData}
            copy.city = selectedList.city.name?.trim();
            copy.county = extractName.trim();
            props.setUserData(copy);
        }
        return;
    }   
  };

  return(
    <View style={{ flex: 1}}>
      <View style={styles.contentBox}>
        <View style={{paddingTop:20}}>
          <Typography fontSize={18} color="#1B1B1B">거주지역</Typography>
          {/* <Typography fontSize={12} color="#6F6F6F">멘트추가</Typography> */}
        </View>
        <View style={styles.contentInner}>
          <View style={styles.selectTitle}>
              <View style={{minWidth:110, alignItems:'center'}}>
                  <Typography fontSize={16} color={!selectedList.county.isSelected && selectedList.city.isSelected ? "#E8726E":"#8B8B8B"}>{selectedList.city.name ?? '시/도 선택' }</Typography>
              </View>
              <SimpleLineIcons name="arrow-right" size={18} color="#E8726E" style={{marginBottom:-1}}/>
              <View style={{minWidth:110, alignItems:'center'}}>
                  <Typography fontSize={16} color={selectedList.county.isSelected ? "#E8726E":"#8B8B8B"}>{selectedList.county.name?? '시/군/구 선택' }</Typography>   
              </View>
          </View>
          <Swiper  
            showsButtons={false}
            key={selectedList.list.length} 
            dot={<View style={styles.paginationDot} />}
            activeDot={<View style={styles.activePaginationDot}/>}
            style={{height:400}}
          >
            {
              selectedList.list.map((slicedArray: any, arrayIdx: number) => {
                return (
                  <View key={arrayIdx} style={[styles.selectBox,{width:"100%", height:400}]}>
                    {
                      slicedArray.map((item: CityDataProps, idx: number) => {
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
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </Swiper>
          {
            isPopuped && <TouchableOpacity onPress={()=>setIsPopuped(false)} style={styles.imageBackground}>
            <Image source={require("../images/mypage/scroll_image.png")} resizeMode="contain" style={{width:"60%"}}/>
            </TouchableOpacity>
          }
        </View>
        <TouchableOpacity 
          onPress={()=>{props.setIsChanged(true); props.editLocationToggleModal();}}
        >
          <View style={[styles.button, isAbled ? styles.abledButton : styles.enabledButton]}>
              <Typography fontSize={16} color="#fff">설정 완료</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ) 
}



const styles = StyleSheet.create({
  contentBox:{
    position:'absolute',
    bottom:0,
    borderRadius: 16,
    width:"100%",
    backgroundColor:"#fff",
    paddingHorizontal:24,
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
  contentInner:{
    marginTop:20,
  },
  selectBox:{
    flexWrap:"wrap",
    flexDirection:'row',
    marginVertical:24,
    minHeight:50,
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
    marginBottom:30,
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
    bottom:0,
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
    
})