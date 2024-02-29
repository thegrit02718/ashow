import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Alert, FlatList, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AsyncGetItem from '../AsyncGetItem'
import Schoolinfo from './DetailComponent/Schoolinfo';
import Childcareinfo from './DetailComponent/Childcareinfo';
import Neighborhood from './DetailComponent/Neighborhood';
import FormatNumber from '../Components/FormatNumber';
import PyengSelectModal from './DetailComponent/PyengSelectModal';
import ParkingPublicTransit from './DetailComponent/ParkingPublicTransit';
import Community from './DetailComponent/Community';
import GiftContent from './DetailComponent/GiftContent';
import axios from 'axios';
import MainURL from "../../MainURL";
import MainImageURL from '../../MainImageURL';
import Loading from '../Loading';
import ContackButtonModal from './DetailPage/ContactButtonModal';
import PyengColorBox from './DetailComponent/PyengColorBox';
import DefaultInfo from './DetailComponent/DefaultInfo';
import OptionsSelectModal from './DetailPage/OptionsSelectModal';
import Clipboard from '@react-native-clipboard/clipboard';
import { Shadow } from 'react-native-shadow-2';

const screenWidth = Dimensions.get('window').width;

const DetailMain = (props : any) => {
 
  const aptKey = props.route.params.aptKey;
  const pyengKey = props.route.params.pyengKey;
  const userNickName = props.route.params.userNickName;

  interface PyengInfoProps {
    aptKey : number,
    aptName: string,
    inDate: string,
    addressCity: string,
    addressCounty: string,
    mainType: string,
    pyengName : string,
    pyengNum : number,
    pyengKey : number,
    houseHoldSum : number,
    houseHold : number,
    officialArea : number,
    personalArea : number,
    personalAreaText : string,
    imageFiles: string,
    priceDefaultHigh : number,
    priceDefaultLow : number
    discountHigh: number,
    discountLow: number,
    ashowDiscountSum: number,
    ashowDiscountGriting: number,
    ashowDiscountFirstUse: number,
    ashowDiscountMember: number,
    ashowDiscountToday: number,
    keyColor: string,
    minusOption : number,
    extendOption : number,
    explanation : string
  }
    
  const [aptData, setAptData] = useState<any>([]);
  const [pyengInfo, setPyengInfo] = useState<any>([]);
  const [pyengSelect, setPyengSelect] = useState<PyengInfoProps | null>(null);
  const [pyengOrMeter, setPyengOrMeter] = useState("평");
  // const [selectOptionCost, setSelectOptionCost]  = useState(0);
  // const [selectedOptionNames, setSelectedOptionNames] = useState([]);
  const [totalOptionCost, setTotalOptionCost] = useState(0);
  const resultCost = pyengSelect ? pyengSelect.priceDefaultHigh - (pyengSelect.priceDefaultHigh - pyengSelect.discountHigh) - pyengSelect.ashowDiscountSum + totalOptionCost : 0;

  // 해당 매물 정보 가져오기
  const fetchPosts = async () => {
    try {
      const aptData = await axios.get(`${MainURL}/buildings/buildings/${aptKey}`);
      if (aptData) {
        let copy: any = aptData.data
        setAptData(copy[0]);
      }
      const pyengInfo = await axios.get(`${MainURL}/buildings/pyenginfo/${aptKey}`);
      if (pyengInfo) {
        let copy: any = [...pyengInfo.data];
        setPyengInfo(copy);
        const selectedPyeng = copy.filter((e:any)=> e.pyengKey === pyengKey);
        setPyengSelect(selectedPyeng[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const [isCheckFavor, setIsCheckFavor] = useState<boolean | null>(null);
  // favorList 데이터 가져오기
  const getFavorListDate = async () => {
    axios
      .get(`${MainURL}/mypage/getfavorlist/${props.route.params.userAccount}`)
      .then((res) => {
        if (res.data.find((e : any) => e === JSON.stringify(aptKey))) {
          setIsCheckFavor(true);
        } else {
          setIsCheckFavor(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // favorList 입력&취소 토글
  const favorListToggle = async () => {
    axios
      .post(`${MainURL}/buildings/favorlisttoggle`, {
        userAccount : props.route.params.userAccount,
        aptKey : aptKey
      })
      .then((res) => {
        if (res.data) {
          setIsCheckFavor(!isCheckFavor);
        }        
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // lastViewedBuilding 입력 함수
  const lastViewedBuilding = async () => {
    axios
      .post(`${MainURL}/buildings/lastviewedbuilding`, {
        userAccount : props.route.params.userAccount,
        aptKey : aptKey
      }).then(() => {}).catch(() => {});
  };

  useEffect(() => {
    fetchPosts();
    getFavorListDate();
    lastViewedBuilding();
  }, []);

  
  // 서브 메뉴 선택 -----------------------------------------------------------------------------------------

  const menu = ["분양가", "자금스케줄", "혜택", "단지갤러리", "단지배치도", "주차 및 교통", "학군", "보육시설", "주변환경"]
  const [currentTab, setCurrentTab] = useState(1);
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <TouchableOpacity
        style={{width:80, alignItems:'center'}}
        onPress={() => setCurrentTab(tabNum)}
      >
        <Typography fontSize={14} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
        {
          currentTab === tabNum
          ? <View style={{width:70, height:2, backgroundColor:'#333', marginTop:10}}></View>
          : <View style={{width:70, height:2, backgroundColor:'#fff', marginTop:10}}></View>
        }
      </TouchableOpacity>
    )    
  };

  // 단지 갤러리 -----------------------------------------------------------------------------------------

  const images = aptData.images ? JSON.parse(aptData.images) : null;
  function renderItem({item}: any) {
    return (
      <View style={{width: screenWidth - 100, height: 200, marginRight:15, marginVertical:20,  borderRadius:10}}>
        <Image 
          source={{uri: `${MainImageURL}/appimages/buildings/${aptKey}/default/${item.name}`}} 
          style={{width: '100%', height: '100%',  borderRadius:10, resizeMode:'cover'}}
        />
      </View>
    );
  }

  // 달력 날짜 선택 -----------------------------------------------------------------------------------------
  // const currentDate = new Date;
  // const year = currentDate.getFullYear(); 
  // const monthcopy = currentDate.getMonth() + 1; 
  // const month = monthcopy < 10 ? `0${monthcopy}` : `${monthcopy}`
  // const day = currentDate.getDate();
  // const formattedDate = `${year}-${month}-${day}`;

  // const [contractDay, setContractDay] = useState(formattedDate)
  // const [moveinDay, setMoveinDay] = useState(formattedDate)
    

  // 평형 선택 모달 -----------------------------------------------------------------------------------------
  const [pyengSelectModalVisible, setPyengSelectModalVisible] = useState(false);
  const pyengSelectToggleModal = () => {
    setPyengSelectModalVisible(!pyengSelectModalVisible);
  };

  // 평형 선택 모달
  const [optionSelectModalVisible, setOptionSelectModalVisible] = useState(false);
  const optionSelectToggleModal = () => {
    setOptionSelectModalVisible(!optionSelectModalVisible);
  };
  

  // 전화 버튼 모달
  const [contactButtonModalVisible, setContactButtonModalVisible] = useState(false);
  const contactButtonToggleModal = () => {
    setContactButtonModalVisible(!contactButtonModalVisible);
  };

  // 링크 복사 함수
  const handleInviteEvent = async () => {
    Clipboard.setString('https://ashow.page.link/Ak1i')
    Alert.alert('초대링크가 복사되었습니다.')
  }  
  
  // [메인 이미지]: mainimage
  // [평면도(평형별)]: groundplan(평형) ex) groundplan77, groundplan88
  // [평면도디테일(평형별)]: groundplandetail(평형) ex) groundplandetail77, groundplandetail88
  // [배치도(2개)]: arrangebuilding, arrangebuildingsimple
  // [투시도(2개)]: 3dview1, 3dview2 // [조감도]: airview
  // [동호수배치도]: arrangehouse // [입지환경]: environment
  // [커뮤니티시설(2개)]: community1, community2


  return (
    aptData === undefined || pyengInfo.length === 0 || pyengSelect === undefined || pyengSelect === null
    ? 
    <Loading />
    :
    <View style={styles.container}>
      {/* 타이틀 섹션 ------------------------------------------------------------- */}
      <View style={{paddingHorizontal:20, paddingBottom:15}}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
          <TouchableOpacity 
            style={{}}
            onPress={()=>{
              props.navigation.navigate('Navi_Main', {screen: '매물'})
            }}
            >
            <AntDesign name="left" size={30} color="#000" />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <Typography fontSize={14} marginBottom={7}>{aptData.aptName}</Typography>
            <View style={{flexDirection: 'row'}}>
              <Typography fontSize={12} >{aptData.houseHoldSum}세대 / </Typography>
              <Typography fontSize={12} >{aptData.inDate}입주</Typography>
            </View>
          </View>
          <View style={{width: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity 
              style={{}}
              onPress={()=>{
                props.navigation.navigate('LocationMap', {
                  aptName : aptData.aptName, companyHomePage : aptData.companyHomePage,
                  promotionSite : aptData.promotionSite, promotionPhone : aptData.promotionPhone,
                  addressData : `${aptData.addressCity} ${aptData.addressCounty} ${aptData.addressRest}`
                })
              }}
            >
              <Entypo name="location-pin" size={30} color="#E8726E" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleInviteEvent}
                style={{}}>
                <Ionicons name="share-social-sharp" size={24} color="#8B8B8B" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={favorListToggle}
            >
              <AntDesign name="star" size={30} color={isCheckFavor ? "#FFDC23" : "#DFDFDF"} />
            </TouchableOpacity> 
          </View>
        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* 서브타이틀 섹션 ------------------------------------------------------------- */}
        <View style={{width: '100%', height:400, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={{uri: `${MainImageURL}/appimages/buildings/${aptKey}/default/mainimage.png`}} style={{width: '100%', height:'100%', resizeMode:'cover'}}/>
        </View>    
        <View style={styles.section}>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Typography fontSize={24} marginBottom={7}>{aptData.aptName}</Typography>
            <Typography fontSize={14} marginBottom={7} fontWeightIdx={1}>{aptData.inDate}입주 | {aptData.houseHoldSum}세대</Typography>
            <Typography fontSize={14} color='#8B8B8B' fontWeightIdx={2}>{aptData.addressCity} {aptData.addressCounty} {aptData.addressRest}</Typography>  
          </View>
        </View>

        <Divider height={2} />

        <View style={{paddingHorizontal:10, paddingTop:15 }}>
          {/* 서브 메뉴 */}
          <ScrollView 
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
          > 
            { menu.map((item, index)=>(<SelectMenu tabNum={index+1} title={item} key={index}/>))}
          </ScrollView>
        </View>

        <Divider height={2} />

        <View style={[styles.section, {paddingBottom: 1}]}> 
          {/* 평형 선택 ------------------------------------------------------------- */}
          <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems:'center', marginVertical: 20}}>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity onPress={pyengSelectToggleModal}>
                <View style={{width:88, height:40, borderWidth:1, borderColor:'#DFDFDF', flexDirection:'row',
                              borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                  <Typography fontSize={14}>{pyengOrMeter === '평' ? pyengSelect.pyengName : pyengSelect.personalAreaText}</Typography>
                  <AntDesign name="down" size={15} color="#1B1B1B" style={{marginLeft: 5}}/>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={()=>{ 
                if (pyengOrMeter === '평' ) {
                  setPyengOrMeter('㎡');
                } else {
                  setPyengOrMeter('평');
                }
            }}>
              <View style={[styles.selectBox, {width: 40, marginLeft: 10, alignItems: 'center', justifyContent: 'center'}]}>
                <Typography fontSize={14} color='#1B1B1B' fontWeightIdx={2}>{pyengOrMeter}</Typography>
              </View>
            </TouchableOpacity>
          </View>
          {/* 평형 선택 모달창 ------------------------------------ */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={pyengSelectModalVisible}
            onRequestClose={pyengSelectToggleModal}
          >
            <PyengSelectModal 
              pyengSelectToggleModal={pyengSelectToggleModal} pyengInfo={pyengInfo}
              setPyengSelect={setPyengSelect}
            />
          </Modal>

          {/* 배치도 ------------------------------------------------------------- */}
          <View style={{width:'100%', height:300, alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={{uri: `${MainImageURL}/appimages/buildings/${aptKey}/pyeng/${pyengSelect.imageFiles}`}} 
              style={{width: '100%', height:'100%', resizeMode:'contain'}}
            />
            <TouchableOpacity 
              style={{position:'absolute', right:0, top:0}}
              onPress={() => {
                props.navigation.navigate('GroundPlanDetail', 
                {
                  aptKey : pyengSelect.aptKey, imageFiles : pyengSelect.imageFiles,  personalAreaText: pyengSelect.personalAreaText
                });
              }}
            >
              <View style={[styles.selectBox, {width: 40, marginLeft: 10, alignItems: 'center', justifyContent: 'center'}]}>
                <Image source={require('../images/buildings/magnifyGlass.png')} style={{width: '90%', resizeMode:'contain'}}/>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:20, alignItems:'flex-end'}}>
            <View>
              <Typography fontSize={14} color='#3D3D3D' marginBottom={5}>정상판매가</Typography>
              <View style={{height:35, flexDirection:'row', alignItems:'flex-end'}}>
                <Typography fontSize={24} color='#1B1B1B'>{FormatNumber(pyengSelect.priceDefaultHigh)} </Typography>
                <Typography fontSize={14} color='#8B8B8B'><Text style={{textDecorationLine:'line-through'}}>{FormatNumber(pyengSelect.priceDefaultHigh)}</Text></Typography>
              </View>
            </View>
            <View>
              <Typography fontSize={11} color='#8B8B8B' marginBottom={5}>분양 최고가 기준</Typography>
              <View style={{height:35, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <AntDesign name="caretdown" size={16} color="#E0413B" style={{marginRight: 5, marginBottom:3}}/>
                <Typography color='#E0413B'>{Math.round( 100 - (pyengSelect.discountHigh / pyengSelect.priceDefaultHigh * 100 ))}%</Typography>
              </View>
            </View>
          </View>
          
        </View>

        <Divider height={8} />

        {/* 분양가 섹션 */}
        <View style={styles.section}>
          {/* 할인 상세 금액 ------------------------------------------------------------- */}
          <Shadow distance={5} startColor="#dfdfdf" style={{width:'100%', borderRadius: 15, padding: 18, marginVertical: 5 }}>
            <View style={{marginBottom: 15}}>
              <Typography fontSize={18} color='#1B1B1B'>{userNickName}님이</Typography>
              <Typography fontSize={18} color='#1B1B1B'>받을 수 있는 최대 혜택!</Typography>
            </View>
            <View style={{backgroundColor:'#FAFAFA', padding:10}}>
              <View style={styles.textBox}>
                <Typography fontSize={14} color='#6F6F6F'>아쇼 첫 이용 할인</Typography>
                <Typography fontSize={14} color='#494949'>- {FormatNumber(pyengSelect.ashowDiscountFirstUse)}</Typography>
              </View>
              <View style={styles.textBox}>
                <Typography fontSize={14} color='#6F6F6F'>첫 계약 축하 분양 지원금</Typography>
                <Typography fontSize={14} color='#494949'>- {FormatNumber(pyengSelect.ashowDiscountGriting)}</Typography>
              </View>
              
              <View style={styles.textBox}>
                <Typography fontSize={14} color='#6F6F6F'>아쇼 회원님께만 드리는 특별 할인</Typography>
                <Typography fontSize={14} color='#494949'>- {FormatNumber(pyengSelect.ashowDiscountMember)}</Typography>
              </View>
              <View style={styles.textBox}>
                <Typography fontSize={14} color='#6F6F6F'>오늘 계약시 지원금</Typography>
                <Typography fontSize={14} color='#494949'>- {FormatNumber(pyengSelect.ashowDiscountToday)}</Typography>
              </View>
            </View>
            <View style={[styles.textBox, {marginVertical:15}]}>
              <Typography color='#555'>총 할인 금액</Typography>
              <Typography fontSize={20} color='#F46D69'>- {FormatNumber(pyengSelect.ashowDiscountSum)}</Typography>
            </View>
          </Shadow>
          {/* 추가 옵션 선택 ------------------------------------------------------------- */}
          <TouchableOpacity onPress={optionSelectToggleModal}>
            <View style={[styles.optionButton, {backgroundColor: totalOptionCost !== 0 ?  "#E8726E": "#F5F4F3" }]}>
              {totalOptionCost === 0 && <Entypo name="plus" size={20} color={totalOptionCost !== 0 ? "#fff" : "#6F6F6F"} style={{marginRight:5}}/>}
              <Typography color={totalOptionCost !== 0 ? "#fff" : "#6F6F6F"} fontSize={14}>
                {totalOptionCost === 0 ? `분양 옵션 추가 0원` : `선택 옵션  ${FormatNumber(totalOptionCost)}`}
              </Typography>
            </View>
          </TouchableOpacity>

          {/* 옵션 선택 모달창 ------------------------------------ */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={optionSelectModalVisible}
            onRequestClose={optionSelectToggleModal}
          >
            <OptionsSelectModal
              optionSelectToggleModal={optionSelectToggleModal} 
              pyengSelect={pyengSelect}
              // setSelectOptionCost={setSelectOptionCost}
              // setSelectedOptionNames={setSelectedOptionNames}
              totalOptionCost={totalOptionCost}
              setTotalOptionCost={setTotalOptionCost}
            /> 
          </Modal>

          <Divider height={2} marginVertical={20}/>
          
          {/* 최종 금액 ------------------------------------------------------------- */}
          <View style={{marginBottom:10}}>
            <Typography fontSize={18}>최종 구매 가능 가격</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>공급금액</Typography>
            <Typography fontSize={14} color='#8B8B8B'>{FormatNumber(pyengSelect.priceDefaultHigh)}</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>추가 옵션</Typography>
            <Typography fontSize={14} color='#8B8B8B'>
              { totalOptionCost >= 0 ? `+ ${FormatNumber(totalOptionCost)}` : FormatNumber(totalOptionCost)}
            </Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>기본 할인</Typography>
            <Typography fontSize={14} color='#8B8B8B'>- {FormatNumber(pyengSelect.priceDefaultHigh - pyengSelect.discountHigh)}</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#8B8B8B'>아쇼 할인</Typography>
            <Typography fontSize={14} color='#8B8B8B'>- {FormatNumber(pyengSelect.ashowDiscountSum)}</Typography>
          </View>
          <Divider marginVertical={10}/>
          <View style={styles.textBox}>
            <Typography fontSize={14}>최종 구매 가능 가격</Typography>
            <Typography fontSize={20} color='#E0413B'>
              {FormatNumber(resultCost)}
            </Typography>
          </View>
        </View>

        <Divider height={8}/>

        {/* 자금스케줄 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage2.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>{userNickName}님의 자금 스케줄</Typography>  
          </View>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('CalculatorFirst', {
                aptData : aptData, pyengInfo: pyengInfo, pyengSelect : pyengSelect, resultCost : resultCost
              })
            }}
          >
            <Image source={require('../images/buildings/schedule.png')} style={{width: '100%', height: 400, resizeMode:'contain'}}/>
          </TouchableOpacity>
        </View>  
      
        <Divider height={8}/>

        {/* 혜택 모아보기 섹션  ------------------------------------------------------------- */}
        <View style={styles.section}>
          <GiftContent/>
        </View>

        <Divider height={8}/>

        {/* 단지 갤러리 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage4.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>단지 갤러리</Typography>  
          </View>
          <Typography fontSize={12} fontWeightIdx={2}>이미지를 옆으로 넘기거나 탭해서 단지 갤러리를 확인해보세요!</Typography>
          <FlatList
            horizontal
            data={images}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false} 
          />
          <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate('Gallery', {aptKey: aptData.aptKey, images: aptData.images})
              }}
              style={{alignItems:'center', justifyContent:'center'}}
          >
            <View style={{padding:15, borderWidth:1, borderColor:'#DFDFDF', flexDirection:'row', borderRadius:10 }}>
              <Typography>전체 갤러리 확인</Typography>
              <AntDesign name="right" size={20} color="#000" style={{marginLeft:10}} />
            </View>  
          </TouchableOpacity>
        </View>

        <Divider height={8}/>
        
        {/* 단지 배치도 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage5.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>단지 배치도</Typography>  
          </View>
          <Typography fontSize={12} fontWeightIdx={2}>상세 배치도를 확인하여 타입별 향을 확인해보세요.</Typography>
      
          <View style={{height: 250, marginVertical: 15}}>
            <Image 
              source={{uri: `${MainImageURL}/appimages/buildings/${aptKey}/default/arrangebuildings.png`}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          
          <PyengColorBox pyengInfo={pyengInfo}/>
          
          <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate('ArrangeBuildingDetail', {aptKey: aptKey, pyengInfo: pyengInfo})
              }}
              style={{alignItems:'center', justifyContent:'center'}}
          >
            <View style={{padding:15, borderWidth:1, borderColor:'#DFDFDF', flexDirection:'row', borderRadius:10 }}>
              <Typography>상세 배치도 확인</Typography>
              <AntDesign name="right" size={20} color="#000" style={{marginLeft:10}} />
            </View>  
          </TouchableOpacity>
        </View>
        
        <Divider height={8}/>

        {/* 커뮤니티 시설 섹션 ------------------------------------------------------------- */}
        <View style={styles.section}>
          <Community aptKey={aptKey} community={aptData.community} communityImages={aptData.communityImages} navigation={props.navigation}/>
        </View>    

        <Divider height={8}/>

        {/* 주차 및 교통정보 섹션 ------------------------------------------------------------- */}
        {/* <View style={styles.section}>
          <ParkingPublicTransit 
            aptData={aptData}
          />
        </View>

        <Divider height={8}/> */}

        {/* 학군정보 섹션 ------------------------------------------------------------- */}
        {/* <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage8.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>학군정보</Typography>  
          </View>
          <Schoolinfo></Schoolinfo>
          <View style={{marginVertical: 15}}></View>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage9.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>반경 1km 내 보육시설</Typography>
          </View>
          <Childcareinfo></Childcareinfo>
        </View>

        <Divider height={8}/> */}

        {/* 주변환경 섹션 ------------------------------------------------------------- */}
        {/* <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Image source={require('../images/buildings/titleImage10.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>주변환경</Typography>  
          </View>
          <Neighborhood></Neighborhood>    
        </View>

        <Divider height={8}/> */}

        {/* 기본정보 섹션 ------------------------------------------------------------- */}
        <View style={[styles.section, {marginBottom:50}]}>
          <View style={styles.sectionTitle}>
            <Typography fontSize={20}>{aptData.aptName} 기본정보</Typography>  
          </View>
          <DefaultInfo aptData={aptData}/>
        </View>  
      </ScrollView>

      {/* 전화 버튼 모달 */}
      <TouchableOpacity 
        style={{position:'absolute', right: 10, bottom: 20}}
        onPress={contactButtonToggleModal}
      >
        <View style={{width:56, height:56, backgroundColor:"#E8726E",
                      borderRadius:28, alignItems:'center', justifyContent:'center'}}>
          <FontAwesome name="phone" size={24} color="#fff"/>
        </View>
      </TouchableOpacity>
    
      {/* 전화 버튼 모달창 ------------------------------------ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactButtonModalVisible}
        onRequestClose={contactButtonToggleModal}
      >
        <ContackButtonModal 
          contactButtonToggleModal={contactButtonToggleModal}
          promotionPhone={aptData.promotionPhone}
        />
      </Modal>

      {/* 모달 백화면 커버창 */}
      <View style={pyengSelectModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={contactButtonModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={optionSelectModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

    </View>
  );
};

export default DetailMain;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    section: {
      padding: 22,
    },
    selectBox: {
      height: 40,
      backgroundColor: '#fff',
      borderColor: '#DFDFDF',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 15,
    },
    menubox: {
      width: 90,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionTitle: {
      flexDirection: 'row',
      height: 30,
      alignItems: 'center',
      marginVertical: 10
    },
    sectionTitleImage : {
      width: 24, 
      height: 16,
      marginRight: 10
    },
    optionButton : {
      height: 48,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginVertical: 20
    },
    button2 : {
      height: 48,
      backgroundColor : '#ED9390',
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginVertical: 10
    },
    textBox: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10
    },
    textBox2: {
      flex: 1,
      paddingHorizontal: 15,
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10
    },    
    modalBackCover : {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#333',
      opacity: 0.8,
      zIndex: 1
    },
  });
  