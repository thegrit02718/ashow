import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, Image, FlatList, Dimensions, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import { StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign'
import SearchRecommendations from './SearchRecommendations';
import SearchHistory from './SearchHistory';
import { Divider } from '../Components/Divider';


export default function SearchMain (props: any) {

  const aptlist = props.route.params.aptlist;
  const [inputValue, setInputValue] = useState('');
  const [searchAptAddressList, setSearchAptAddressList] = useState<any>([]);
  const [searchAptNameList, setSearchAptNameList] = useState<any>([]);
 
  const filteredAddress = (inputText: string) => {
    const filteredListAddress = aptlist.filter((apt: any) => {
        const searchFields = [apt.addressCity, apt.addressCounty, apt.addressRest];
        return searchFields.some((field) => field && field.includes(inputText));
    });
    const filteredListAptName = aptlist.filter((apt: any) => {
        const searchFields = [apt.aptName];
        return searchFields.some((field) => field && field.includes(inputText));
    });
    setSearchAptAddressList(filteredListAddress);
    setSearchAptNameList(filteredListAptName);
  }


  const changeInputValue = async(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const inputText = event.nativeEvent.text;
        
    setInputValue(inputText);
    filteredAddress(inputText);

  };
  
  
  const handleSearchPress = () => {

  }

  const handleResetPress = () => {
    setInputValue('')
  }

  const SearchComponentAddress = () => (
    <View style={styles.section}>
      <Typography fontSize={18} marginBottom={15}>지역</Typography>
      
      {
        searchAptAddressList.map((item:any, index:any)=>{
          return (
            <View key={index} style={{marginTop:10}}>
              <Typography fontWeightIdx={1} marginBottom={10}>{item.addressCity} {item.addressCounty} {item.addressRest}</Typography>
              { searchAptAddressList.length === index + 1 ? null : <Divider /> }
            </View>
          )
        })
      }
    </View>
  )

  const SearchComponentName = (propsdata:any) => (
    <View style={styles.section}>
      <Typography fontSize={18} marginBottom={15}>아파트</Typography>
      {
        searchAptNameList.map((item:any, index:any)=>{
          return (
            <View key={index} style={{marginTop:10}}> 
              <TouchableOpacity
                style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}
                onPress={()=>{
                  propsdata.navigation.navigate('Navi_Detail', {
                    screen: 'DetailMain',
                    params: {
                      aptKey : item.aptKey,
                      pyengKey : item.pyengKey,
                      userAccount : propsdata.asyncGetData.userAccount,
                      userNickName : propsdata.asyncGetData.userNickName
                    }
                  })
                }}
              >
                <View>
                  <Typography fontWeightIdx={1} fontSize={12} color='#8B8B8B' marginBottom={5}>{item.addressCity} {item.addressCounty}</Typography>
                  <Typography fontWeightIdx={1} marginBottom={10}>{item.aptName}</Typography>
                </View>
                <AntDesign name='right' size={16} color='#8B8B8B'/>
              </TouchableOpacity>
              { searchAptNameList.length === index + 1 ? null : <Divider /> }
            </View>
          )
        })
      }
    </View>
  )

  // 커스텀 탭 버튼
  const [currentTab, setCurrentTab] = useState(1);
  const [searchTab, setSearchTab] = useState(1);
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <TouchableOpacity
       style={{width:60, alignItems:'center', paddingTop:10}}
       onPress={() => setCurrentTab(tabNum)}
     >
       <Typography fontSize={14} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
       {
         currentTab === tabNum
         ? <View style={{width:50, height:2, backgroundColor:'#333', marginTop:10}}></View>
         : <View style={{width:50, height:2, backgroundColor:'#fff', marginTop:10}}></View>
       }
     </TouchableOpacity>
    )    
  };

  const SearchMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <TouchableOpacity
       style={{width:60, alignItems:'center', paddingTop:10}}
       onPress={() => setSearchTab(tabNum)}
     >
       <Typography fontSize={14} color={searchTab === tabNum ? '#E8726E' : '#8B8B8B'}>{title}</Typography>
       {
         searchTab === tabNum
         ? <View style={{width:50, height:2, backgroundColor:'#E8726E', marginTop:10}}></View>
         : <View style={{width:50, height:2, backgroundColor:'#fff', marginTop:10}}></View>
       }
     </TouchableOpacity>
    )    
  };

   
  return (
    <View style={styles.container}>

      <View style={styles.section}> 
        
        <TouchableOpacity 
          style={{marginBottom:20}}
          onPress={()=>{
            props.navigation.goBack();
          }}
          >
          <AntDesign name="left" size={30} color="#000" />
        </TouchableOpacity>
        
        <View style={{}}>
          <Typography fontSize={24} marginBottom={14}>어떤 아파트를{`\n`}찾고 계신가요?</Typography>
          
            <View style={styles.seachBar}>
              <View style={[styles.flexBox, { alignItems:"center"}]}>
                <FontAwesome6  name="magnifying-glass" size={22} color="#8B8B8B" style={{marginRight:13}}/> 
                <TextInput 
                  maxLength={20} 
                  placeholder='지역 또는 단지명으로 검색해보세요!' 
                  value={inputValue}
                  onChange={changeInputValue} 
                  onSubmitEditing={handleSearchPress}
                  style={{height:'100%', flex:1}}
                />
                <TouchableOpacity onPress={handleResetPress}>
                  <AntDesign  name="closecircle" size={14} color="#C1C1C1"/> 
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>

      {
        inputValue === ''
        ?
        <>
          <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                      borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
            <SelectMenu tabNum={1} title='추천'/>
            <SelectMenu tabNum={2} title='최근검색'/>
          </View>
          <ScrollView style={{flex:1}}>
            {currentTab === 1 && 
              <SearchRecommendations 
                navigation={props.navigation}
                aptlist={props.route.params.aptlist}
                asyncGetData={props.route.params.asyncGetData} 
            />}
            {currentTab === 2 && <SearchHistory navigation={props.navigation} asyncGetData={props.route.params.asyncGetData} />}
            <View style={{height:100}}></View>
          </ScrollView>
        </>
        :
        <>
        {
            searchAptAddressList.length === 0 && searchAptNameList.length === 0 
            ?
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../images/home/notSearch.png')} style={{width:150, height:150}}/>
              <TouchableOpacity style={{padding:5, borderWidth:1, borderColor:'#E5625D', borderRadius:10, marginTop:15}}>
                <Typography fontSize={12} fontWeightIdx={2} color='#E5625D'>매물 등록 요청</Typography>
              </TouchableOpacity>
            </View>
            :
            <>
              <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                          borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
                <SearchMenu tabNum={1} title='전체'/>
                <SearchMenu tabNum={2} title='아파트'/>
                <SearchMenu tabNum={3} title='지역'/>
              </View>
              <ScrollView style={{flex:1}}>
                {searchTab === 1 && 
                  <>
                  <SearchComponentAddress />
                  <View style={{paddingHorizontal:20}}>
                    <Divider height={2}/>
                  </View>
                  <SearchComponentName navigation={props.navigation} asyncGetData={props.route.params.asyncGetData}/>
                  </>
                }
                {searchTab === 2 && <SearchComponentName />}
                {searchTab === 3 && <SearchComponentAddress />}
                <View style={{height:100}}></View>
              </ScrollView>
            </>
          }
        </>
      }
      
      
    </View>
  )
}




export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section : {
    padding: 20
  },
  seachBar:{
    width:'100%',
    borderWidth:1,
    borderRadius:12,
    height: 48,
    borderColor: '#EAEAEA',
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:15,
  },
  flexBox:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between',
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