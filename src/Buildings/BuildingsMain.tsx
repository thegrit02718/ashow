import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Modal, FlatList, Dimensions  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import FormatNumber from '../Components/FormatNumber';
import axios from 'axios';
import MainURL from "../../MainURL";
import MainImageURL from '../../MainImageURL';
import AsyncGetItem from '../AsyncGetItem';
import AptSelectLocationModal from './AptSelectLocationModal';
import { TabScreen1, TabScreen2, TabScreen3} from './BuildinsListFilterModal';
import Loading from '../Loading';
import { useRecoilState } from 'recoil';
import { recoilAptSearchlist, recoilAptlist, recoilAptlistView, recoilHandleArrange, recoilHouseHoldsReset, recoilIsTabNames, recoilPriceReset, recoilPyengReset, 
        recoilTabNames, recoilAptSelectLocation, recoilselectTab } from '../RecoilStore';


export default React.memo(function BuildingsMain (props : any) {

  const locationlist = ["전체", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구", "군위군"]
  const [selectLocation, setSelectLocation] = useRecoilState(recoilAptSelectLocation);

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  interface AptlistProps {
    aptKey : number;
    aptName: string;
    inDate : string;
    AddressCity : string;
    AddressCounty : string;
    pyengName : string;
    pyengNum : number;
    houseHoldSum : number;
    houseHold : number;
    personalArea: number;
    priceDefaultHigh: number;
    priceDefaultLow: number;
    discountHigh: number; 
    discountLow: number; 
    explanation : string;
  }


interface AptlistViewProps {
  aptKey : any,
  pyengKey : number,
  aptName: string,
  inDate: string,
  addressCity: string,
  addressCounty: string,
  houseHold : number,
  priceDefaultHigh : number,
  priceDefaultLow : number
}

  // 게시판 글 가져오기
  const [aptlist, setAptlist] = useRecoilState<AptlistProps[]>(recoilAptlist);
  const [aptViewlist, setAptViewlist] = useRecoilState<AptlistViewProps[]>(recoilAptlistView);
  const [isHandleArrange, setIsHandleArrange] = useRecoilState<boolean>(recoilHandleArrange);
  const [aptSearchlist, setAptSearchlist] = useRecoilState<AptlistProps[]>(recoilAptSearchlist);

  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/buildings/pyenginfoall/${selectLocation}`);
    if (res.data) {
      let copy : any = [...res.data];
      copy.reverse();
      setAptlist(copy);
      const filteredData = copy.filter((e:any)=> e.mainType === 'true');
      setAptSearchlist(filteredData);
      handleArrangeAptData(copy);
    } 
  };
  
  useEffect(() => {
    asyncFetchData();
    fetchPosts();
  }, [selectLocation]);

   
  const handleArrangeAptData = async (aptlist:any) => {
    const uniqueAptKeys = [...new Set(aptlist.map((item:any) => item.aptKey))];
    const result = await uniqueAptKeys.map(aptKey => {
      const filteredValues = aptlist.filter((item:any) => item.aptKey === aptKey);
      const priceDefaultHigh = Math.max(...filteredValues.map((item:any) => item.priceDefaultHigh));
      const priceDefaultLow = Math.min(...filteredValues.map((item:any) => item.priceDefaultHigh));
      const houseHold = filteredValues.reduce((sum:any, item:any) => sum + item.houseHold, 0);
      const priceHighPyengInfo = filteredValues.find((item:any) => item.priceDefaultHigh === priceDefaultLow);

      return {
        aptKey,
        sort : priceHighPyengInfo.sort,
        pyengKey : priceHighPyengInfo.pyengKey,
        aptName: priceHighPyengInfo.aptName,
        inDate: priceHighPyengInfo.inDate,
        addressCity: priceHighPyengInfo.addressCity,
        addressCounty: priceHighPyengInfo.addressCounty,
        houseHold,
        priceDefaultHigh,
        priceDefaultLow
     };
    });
    if (result) {
      setAptViewlist(result);
      setIsHandleArrange(true);
    }
  }  
  
 
  // 지역 모달창 --------------------------------------------------------

  const [isSelectLocaionModalVisible, setSelectLocaionModalVisible] = useState(false);
  const selectLocaionToggleModal = () => {
    setSelectLocaionModalVisible(!isSelectLocaionModalVisible);
  }; 

  const screenWidth = Dimensions.get('window').width;

  // 고정 메뉴 기능 --------------------------------------------------------
  const [selectTab, setSelectTab] = useRecoilState(recoilselectTab);
  const [tabNames, setTabNames] = useRecoilState(recoilTabNames);
  const [isTabNames, setIsTabNames] = useRecoilState(recoilIsTabNames);

  interface SelectMenu {
    title: string;
    select: number;
    index : number;
  }
  
  const SelectMenu: React.FC<SelectMenu> = ({ title, select, index }) => (
    <TouchableOpacity
      onPress={()=>{
        setSelectTab(select);
      }}
    >
     <View style={[styles.topSelectMenu, {borderColor: isTabNames[index] ? '#E8726E' : '#DFDFDF' }]}>
         <Typography fontSize={14} color={isTabNames[index] ? '#E8726E' : '#6F6F6F'}>{title}</Typography>
     </View>
   </TouchableOpacity>
  );  

  

  // 필터 함수 ----------------------------------------------------------------------------------------------------------------

  
  const handleReset = () => {
    setTabNames(["금액대", "평형", "세대수"]);
    setIsTabNames([false, false, false]);
    setPriceReset('reset');
    setPyengReset('reset');
    setHouseHoldsReset('reset');
    handleArrangeAptData(aptlist);
  }
  const [priceReset, setPriceReset] = useRecoilState(recoilPriceReset);
  const [pyengReset, setPyengReset] = useRecoilState(recoilPyengReset);
  const [houseHoldsReset, setHouseHoldsReset] = useRecoilState(recoilHouseHoldsReset);

 
  // 금액별 필터
  const handlePriceFilterAll = () => {
    handleArrangeAptData(aptlist);
  }
  const handlePriceFilterSingle = (price : string) => {
    const results = aptlist.filter((item:any) =>  item.priceDefaultHigh <= parseInt(`${price}00000000`) );
    handleArrangeAptData(results);
  }
  const handlePriceFilterDouble = (price1 : string, price2 : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(`${price1}00000000`) <= item.priceDefaultHigh && item.priceDefaultHigh < parseInt(`${price2}00000001`));
    handleArrangeAptData(results);
  }
  const handlePriceFilterHigher = (price : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(`${price}00000000`) <= item.priceDefaultHigh );
    handleArrangeAptData(results);
  }
  
  // 평형별 필터
  const handlePyengFilterAll = () => {
    handleArrangeAptData(aptlist);
  }
  const handlePyengFilterLower = (pyeng : string) => {
    const results = aptlist.filter((item:any) =>  item.pyengNum <= parseInt(pyeng));
    handleArrangeAptData(results);
  }
  const handlePyengFilterSingle = (pyeng : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(pyeng) <= item.pyengNum && item.pyengNum < parseInt(pyeng) + 10 );
    handleArrangeAptData(results);
  }
  const handlePyengFilterDouble = (pyeng1 : string, pyeng2 : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(pyeng1) <= item.pyengNum && item.pyengNum < parseInt(pyeng2) + 10 );
    handleArrangeAptData(results);
  }
  const handlePyengFilterHigher = (pyeng : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(pyeng) <= item.pyengNum );
    handleArrangeAptData(results);
  }


  // 세대수 필터
  const handleHouseHoldsFilterAll = () => {
    handleArrangeAptData(aptlist);
  }
  const handleHouseHoldsFilterLower = (HouseHolds : string) => {
    const results = aptlist.filter((item:any) =>  item.houseHoldSum <= parseInt(HouseHolds));
    handleArrangeAptData(results);
  }
  const handleHouseHoldsFilterSingle = (HouseHolds : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(HouseHolds) <= item.houseHoldSum );
    handleArrangeAptData(results);
  }
  const handleHouseHoldsFilterDouble = (HouseHolds1 : string, HouseHolds2 : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(HouseHolds1) <= item.houseHoldSum && item.houseHoldSum < parseInt(HouseHolds2) + 10 );
    handleArrangeAptData(results);
  }
  const handleHouseHoldsFilterHigher = (HouseHolds : string) => {
    const results = aptlist.filter((item:any) =>  parseInt(HouseHolds) <= item.houseHoldSum );
    handleArrangeAptData(results);
  }
  
  // components --------------------------------------------------------

  const BuildingListBox = ( subprops: any) => (
    <>
      <View style={styles.imgbox}>
        <Image source={{uri: `${MainImageURL}/appimages/buildings/${subprops.item.aptKey}/default/mainimage.png`}} style={styles.image}/>  
      </View>
      <View style={{marginBottom:5}}>
        <Typography marginBottom={3} fontSize={12} color='#8B8B8B' fontWeightIdx={2}>{subprops.item.addressCity} {subprops.item.addressCounty}</Typography>
        <Typography marginBottom={3} fontSize={14}>{subprops.item.aptName}</Typography>
        <Typography fontSize={13} color='#8B8B8B' fontWeightIdx={2} marginBottom={10}>{subprops.item.houseHold}세대 ・ {subprops.item.inDate}입주</Typography>
        <Typography marginBottom={3}>
          {
            // subprops.item.discountPer === 0 ? null : <Typography color='#0696FF'>{subprops.item.discountDefault / subprops.item.priceDefault *100}% </Typography>
          }                
          {FormatNumber(subprops.item.priceDefaultLow)}
        </Typography>
        <Typography marginBottom={10}>
          ~ {FormatNumber(subprops.item.priceDefaultHigh)}
        </Typography>
        
      </View> 
      <View style={{marginBottom:10, flexDirection:'row', alignItems:'center'}}>
        {
          subprops.item.discountPer !== 0 &&
          <View style={{padding:5, backgroundColor:'#F76661', borderRadius:5, marginRight:5 }}>
            <Typography color='#fff' fontSize={12}>최대혜택</Typography>
          </View>
        }
        {
          subprops.item.isAshowShopping === 'true' &&
          <View style={{width:100, height:15}}>
            <Image source={require('../images/buildings/ashowShopping.png')} style={styles.image}/>  
          </View>
        }
      </View>
    </>
  )
 

  return (
    aptlist.length === 0 || !isHandleArrange
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>

      <View style={styles.section}>
        <View style={{flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{width:30}}></View>
          <TouchableOpacity 
            style={{flexDirection:'row', alignItems:'center'}}
            onPress={selectLocaionToggleModal}
          >
            <Typography fontSize={20}>대구시 {selectLocation}</Typography>
            <AntDesign name="down" size={14} color="#333" style={{marginLeft:10}}/>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{
              props.navigation.navigate('Navi_Search', {
                screen: 'SearchMain',
                params: { aptlist : aptSearchlist, asyncGetData: asyncGetData}
              })
            }}
          >
            <Feather name="search" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSelectLocaionModalVisible}
        onRequestClose={selectLocaionToggleModal}
      >
        <AptSelectLocationModal 
            locationlist={locationlist} selectLocation={selectLocation} setSelectLocation={setSelectLocation}
            selectLocaionToggleModal={selectLocaionToggleModal}/>
      </Modal>
    
      <View style={{paddingHorizontal:20, width:'100%', backgroundColor:'#fff', height:50, zIndex:9,
                    marginTop: selectTab !== 0 ? 10 : 0,
                    justifyContent: selectTab !== 0 ? 'flex-end' :'center',  
                    position: selectTab !== 0 ? 'absolute' : 'relative'}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          { selectTab !== 0 &&
            <TouchableOpacity 
              style={{width:30, height:30, borderRadius:15, borderWidth:1, borderColor:'#DFDFDF', alignItems:'center', justifyContent:'center'}}
              onPress={handleReset}
            >
              <Image source={require('../images/buildings/reset.png')} style={{width: 12, resizeMode:'contain'}}/>
            </TouchableOpacity>}
          <SelectMenu title={tabNames[0]} select={1} index={0}/>
          <SelectMenu title={tabNames[1]} select={2} index={1}/>
          <SelectMenu title={tabNames[2]} select={3} index={2}/>
          {/* <SelectMenu title={tabNames[3]} select={4} index={3}/> */}
        </View>
      </View>
      {selectTab !== 0 && <View style={[styles.section, {backgroundColor:'#fff', height:50}]}></View>}      
      <View style={{position:'absolute', width:'100%', top:70, zIndex:9, backgroundColor:'#fff'}}>
        {selectTab === 1 && 
          <TabScreen1  
              priceReset={priceReset} setPriceReset={setPriceReset} 
              tabNames={tabNames} setTabNames={setTabNames} isTabNames={isTabNames} setIsTabNames={setIsTabNames}
              handlePriceFilterAll={handlePriceFilterAll}
              handlePriceFilterSingle={(price:string) => handlePriceFilterSingle(price)} 
              handlePriceFilterHigher={(price:string) => handlePriceFilterHigher(price)} 
              handlePriceFilterDouble={(price1:string, price2:string) => handlePriceFilterDouble(price1, price2)}
          /> 
        } 
        {selectTab === 2 && 
            <TabScreen2
              pyengReset={pyengReset} setPyengReset={setPyengReset} 
              tabNames={tabNames} setTabNames={setTabNames} isTabNames={isTabNames} setIsTabNames={setIsTabNames}
              handlePyengFilterAll={handlePyengFilterAll}
              handlePyengFilterLower={(pyeng:string) => handlePyengFilterLower(pyeng)} 
              handlePyengFilterSingle={(pyeng:string) => handlePyengFilterSingle(pyeng)} 
              handlePyengFilterHigher={(pyeng:string) => handlePyengFilterHigher(pyeng)} 
              handlePyengFilterDouble={(pyeng1:string, pyeng2:string) => handlePyengFilterDouble(pyeng1, pyeng2)}
            />}
        {selectTab === 3 && 
            <TabScreen3
              houseHoldsReset={houseHoldsReset} setHouseHoldsReset={setHouseHoldsReset} 
              tabNames={tabNames} setTabNames={setTabNames} isTabNames={isTabNames} setIsTabNames={setIsTabNames}
              handleHouseHoldsFilterAll={handleHouseHoldsFilterAll}
              handleHouseHoldsFilterLower={(HouseHolds:string) => handleHouseHoldsFilterLower(HouseHolds)} 
              handleHouseHoldsFilterSingle={(HouseHolds:string) => handleHouseHoldsFilterSingle(HouseHolds)} 
              handleHouseHoldsFilterHigher={(HouseHolds:string) => handleHouseHoldsFilterHigher(HouseHolds)} 
              handleHouseHoldsFilterDouble={(HouseHolds1:string, HouseHolds2:string) => handleHouseHoldsFilterDouble(HouseHolds1, HouseHolds2)}
            />}
        {selectTab !== 0 &&
        <TouchableOpacity
          onPress={()=>{setSelectTab(0)}}
        >
          <View style={{height:50, borderBottomWidth:1, borderBottomColor:'#8B8B8B', alignItems:'center', justifyContent:'center'}}>
            <AntDesign name='up' size={16} color='#8B8B8B'/>
          </View>
        </TouchableOpacity>
        }
      </View>
      {
        aptViewlist.length === 0
        ?
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Typography>검색결과가 없습니다.</Typography>
        </View>
        :
        <ScrollView style={{flex:1}}>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 20, paddingTop:20, alignItems:'center'}}>
            <Typography>{asyncGetData.userNickName}님을 위한 추천단지</Typography>
            <View style={{width:40, height:24, borderWidth:1, borderColor:'#EFEFEF', alignItems:'center', justifyContent:'center'}}>
              <Typography color='#8B8B8B' fontWeightIdx={2} fontSize={12}>AD</Typography>
            </View>
          </View>
          <ScrollView style={{ padding:20 }} horizontal>
            { aptViewlist.map((item:any, index:any)=>{

                return item.sort === 'advertise' && ( 
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={index}
                    style={{width: screenWidth * 50 / 100 , marginRight:20}}
                    onPress={()=>{
                      props.navigation.navigate('Navi_Detail', {
                        screen: 'DetailMain',
                        params: {
                          aptKey : item.aptKey,
                          pyengKey : item.pyengKey,
                          userAccount : asyncGetData.userAccount,
                          userNickName : asyncGetData.userNickName
                        }
                      })
                    }}
                  >
                    <BuildingListBox item={item}/>
                </TouchableOpacity>
                )
            })}
          </ScrollView>
          <Divider height={8}/>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding:20 }}>
          { aptViewlist.map((item:any, index:any)=>{
              
              return ( 
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={index}
                  style={{width:'48%', marginBottom:20}}
                  onPress={()=>{
                      props.navigation.navigate('Navi_Detail', {
                        screen: 'DetailMain',
                        params: {
                          aptKey : item.aptKey,
                          pyengKey : item.pyengKey,
                          userAccount : asyncGetData.userAccount,
                          userNickName : asyncGetData.userNickName
                        }
                      })
                  }}
                >
                  <BuildingListBox item={item}/>
              </TouchableOpacity>
              )
          })}
          </View>
        </ScrollView>
      }
      
      <TouchableOpacity 
        style={selectTab !== 0 ? styles.modalBackCover :  { display: 'none'}}
        onPress={()=>{setSelectTab(0);}}
      >
      </TouchableOpacity>

    </View> 
    )
  );
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding:20
  },
  topSelectMenu : {
    height:32, 
    paddingHorizontal:10, 
    flexDirection:'row', 
    borderRadius:5, 
    borderWidth:1, 
    alignItems:'center', 
    justifyContent:'center',
    marginHorizontal:3
  },
  imgbox: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:5
  },
  image: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    opacity: 0.2
  },

  selectMenuContainer: {
    width:'100%',
    overflow: 'hidden',
  },
});


