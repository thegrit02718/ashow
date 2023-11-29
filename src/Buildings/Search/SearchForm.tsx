import React, { useState, useEffect, Children } from 'react';
import { View, TextInput, Text, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, FlatList, ScrollView, Dimensions , Image} from 'react-native';
import { Typography } from '../../Components/Typography';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons'
import { Shadow } from 'react-native-shadow-2';
import axios from 'axios';
import Tabs from '../../Components/Tab/Tabs';
import MainURL from '../../../MainURL';
import SearchDropdownInProgress from './SearchDropdownInProgress';
import SearchDropdownCompleted from './SearchDropdownCompleted';
import AddressNoResult from './AddressNoResult';
import SearchHistory from './SearchHistory';
import SearchRecommendations from './SearchRecommendations';


export type AptItemType = {
  name:string;
  houseHoldSum: number;
  inDate: string;
  address: string;
}

interface SearchFormProps{
  location:string
}

interface LayoutProps{
  cuerrentMode: boolean,
  children: React.ReactNode;
}

function Layout({cuerrentMode, children}:LayoutProps){
  return (
    cuerrentMode ? <View style={styles.wrapper}>{children}</View> : <ScrollView style={styles.wrapper}>{children}</ScrollView>
  );
}

function AptSearchForm({ location}: SearchFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [aptList, setAptList] = useState<AptItemType[]>([]);  
  const [error, setError] = useState(false);
 
  
  useEffect(()=>{
    aptApiHandler();
  },[])

  const changeInputValue = async(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const regExp = /[!?@#$%^&*():;+=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
    if( regExp.test(event.nativeEvent.text)){
      return // 특수문자 입력시 무시
    }
    setInputValue(event.nativeEvent.text); // 텍스트 변경 적용
    setIsHaveInputValue(true); // 검색 리스트 모달 on/ off
    setError(false);
    setIsSearch(false);
  
  };
  const aptApiHandler = async() => {
    try{
      const response = await axios.get(`${MainURL}/buildings/buildings`);
    
      const filteredAddress = response.data.map((item:any) =>  {
        let filteredCity = item.addressCity.slice(0,2);
        let filteredaddressRest = item.addressRest.split(" ")[0];
        console.log('item',item)
        return{
          name: item.name,
          houseHoldSum: item.houseHoldSum,
          inDate: item.inDate,
          address: filteredCity + " " + item.addressCounty+ " " + filteredaddressRest
        }
      });
      setAptList(filteredAddress);
    }catch(err){
      console.log('AptApiErr',err)
    }
  }

  const handleSearchPress = () =>{
    setIsSearch(true);
  }
  const handleResetPress = () =>{
    setInputValue("");
    setIsSearch(false);
    setIsHaveInputValue(false);

  }
  
  console.log('isSearch',isSearch)
  
    
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <FlatList
    data={[]}
    renderItem={null}
    ListEmptyComponent={ 
      <View style={styles.wrapper}> 
        <View style={[styles.searchContainer,styles.pad_24_0]}>
          <Typography fontSize={24} marginBottom={14}>어떤 아파트를{`\n`}찾고 계신가요?</Typography>
          <Shadow distance={3} >
            <View style={[styles.seachBar, { width: Dimensions.get('window').width - 48 }]}>
              <View style={[styles.flexBox,{ alignItems:"center"}]}>
                <TouchableOpacity onPress={handleSearchPress}>
                  <FontAwesome6  name="magnifying-glass" size={22} color="#8B8B8B" style={{marginRight:13}}/> 
                </TouchableOpacity>
                <TextInput maxLength={20} placeholder='지역 또는 단지명으로 검색해보세요!' value={inputValue}
                  onChange={changeInputValue} onSubmitEditing={handleSearchPress}/>
              </View>
              <TouchableOpacity onPress={handleResetPress}>
                <AntDesign  name="closecircle" size={14} color="#C1C1C1" style={{marginRight:13}}/> 
              </TouchableOpacity>
            </View>
          </Shadow>
        </View>
        {/* 검색 후 리스트 팝업창 */}
        {isSearch && !error && <SearchDropdownCompleted 
            aptList = {aptList}
            inputValue = {inputValue}/>}

        {/* 검색 중에 나오는 리스트 팝업창 */}
        <View style={styles.contentBox}>
          {inputValue?.length > 0 && error  &&
          <AddressNoResult/>}
          {inputValue.length !== 0 && !isSearch  &&
          <SearchDropdownInProgress
            aptList = {aptList}
            inputValue = {inputValue}
            Err={setError}
          />
          }
      
          {!isSearch && inputValue.length == 0 && 
          <View style={{flex:1}}>
            <Tabs defaultValue={1}>
              <Tabs.List>
                <Tabs.Trigger value={1} text="추천" />
                <Tabs.Trigger value={2} text="최근검색" />
              </Tabs.List>
              <Tabs.Panel value={1}>
                <SearchRecommendations location={location}/>
              </Tabs.Panel>
              <Tabs.Panel value={2}>
                <SearchHistory />
              </Tabs.Panel>
            </Tabs>
          </View>}
        </View>
      </View>
    }/>
     </View>
      
  )
}

export default AptSearchForm


export const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#fff"
    },
    flexBox:{
      flexDirection:'row',

    },
    searchContainer:{
      marginVertical:16, width:"100%",
    
    },
    pad_24_0:{
      paddingHorizontal:24,
    },
    seachBar:{
        borderWidth:0,
        borderRadius:12,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-between',
        paddingHorizontal:12,
        position:'relative'
    },
    contentBox:{
      position:'relative',
      marginVertical:12,
      flex:1,
    },
    serachResultBox:{
      paddingHorizontal:24,
      paddingVertical:12,
 
    },
}) 