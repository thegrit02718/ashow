import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../../Components/Typography';
import SelectDropdown from 'react-native-select-dropdown'
import { Divider } from '../../Components/Divider';
import AsyncGetItem from '../../AsyncGetItem'
import FormatNumber from '../../Components/FormatNumber';
import CapitalGraph from '../CalculatorComponent/CapitalGraph';

function CalculatorResult (props : any) {

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
  
  useEffect(()=>{
    asyncFetchData();
  }, []);

  // 나의 분양정보 요약 모달
  const [isSummuryModalVisible, setSummuryModalVisible] = useState(false);
  const summuryToggleModal = () => {
    setSummuryModalVisible(!isSummuryModalVisible);
  };



  const menu = ["계약금", "중도금", "잔금"]
  const paymentDetail = [
    { title: '계약금', date : '2023년 9월 1일 (금)', sumCost : 11615000, loanCost : 0,
      depogitName : '분양 계약금', depogitCost : 10000000,
      balconyName: '발코니 확장비 계약금', balconyCost : 1400000,
      optionName1 : '현관 중문 금액의 5%', optionCost1 : 80000,
      optionName2 : '침실3 붙박이장 금액의 5%', optionCost2 : 50000,
      optionName3 : '식기세척기 금액의 5%', optionCost3 : 45000,
      optionName4 : '광파오븐 금액의 5%', optionCost4 : 40000
    },
    { title: '중도금', date : '2023년 10월 1일 (월)', sumCost : 74857000, loanCost : 0,
      depogitName : '분양 중도금', depogitCost : 73242000,
      balconyName: '발코니 확장비 중도금', balconyCost : 1400000,
      optionName1 : '현관 중문 금액의 5%', optionCost1 : 80000,
      optionName2 : '침실3 붙박이장 금액의 5%', optionCost2 : 50000,
      optionName3 : '식기세척기 금액의 5%', optionCost3 : 45000,
      optionName4 : '광파오븐 금액의 5%', optionCost4 : 40000
    },
    { title: '잔금', date : '2023년 11월 1일 (월)', sumCost : 295444400, loanCost : 499452000,
      depogitName : '분양 잔금', depogitCost : 749178000,
      balconyName: '발코니 확장비 잔금', balconyCost : 1400000,
      optionName1 : '현관 중문 금액의 잔금', optionCost1 : 80000,
      optionName2 : '침실3 붙박이장 금액의 잔금', optionCost2 : 50000,
      optionName3 : '식기세척기 금액의 잔금', optionCost3 : 45000,
      optionName4 : '광파오븐 금액의 잔금', optionCost4 : 40000
    },
  ]

  const taxDetail = [
    {taxName: "취득세", taxCost: 21220000, standard: "6억 초과 9억 이하 기준", imageHeight: 600, image: 1 },
    {taxName: "지방교육세", taxCost: 1660000, standard: "6억 초과 9억 이하 기준", imageHeight: 600, image: 2},
    {taxName: "농어촌특별세", taxCost: 0, standard: "전용 85㎡ 비과세", imageHeight: 600, image: 3},
    {taxName: "인지세", taxCost: 150000, standard: "1억 초과 10억 이하 기준", imageHeight: 600, image: 4},
    {taxName: "증지세", taxCost: 15000, standard: null, imageHeight: 600, image: 5},
    {taxName: "법무사 기본보수", taxCost: 0, standard: null, imageHeight: 600, image: 6},
    {taxName: "국민주택채권 즉시매도가격", taxCost: 0, standard: null, imageHeight: 600, image: 7}
  ]

   return (
    <ScrollView style={styles.container}>

      {/* 상단 박스 섹션 */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginVertical: 30, alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={()=>{props.navigation.goBack();}}
          >
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
          <Typography fontSize={16} color='#6F6F6F'>자금 스케줄</Typography>
          <TouchableOpacity 
            onPress={()=>{props.navigation.navigate('CalculatorFilter', { totalCost : props.route.params.totalCost})}}
          >
            <View style={{padding:10}}>
              <Typography fontSize={16} color='#E8726E'>필터</Typography>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', justifyContent: 'flex-start', marginTop: 10}}>
          <Image source={require('../../images/buildingsDetail/calendar.png')}/>
        </View>
      </View>

      {/* notice 섹션 */}
      <View style={styles.section}>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10} fontWeight='normal'>
          {asyncGetData.userNickName}님의 <Typography fontSize={24}>자금스케줄</Typography>이
        </Typography>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10} fontWeight='normal'>완성되었어요!</Typography>
      </View>

      {/* 버튼 섹션 */}
      <View style={styles.section}>
        <TouchableOpacity onPress={summuryToggleModal}>
          <View style={{borderWidth:1, padding: 10, borderColor: '#DFDFDF', borderRadius: 10}}>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#1B1B1B'>설정한 분양정보 확인</Typography>
              <AntDesign name="right" size={14} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* 분양정보 확인 모달창 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSummuryModalVisible}
        onRequestClose={summuryToggleModal}
      >
        <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{borderRadius: 20, backgroundColor: 'white', padding: 20, width: '90%'}}>
            <View style={styles.textBox}>
              <Typography fontSize={20} color='#555'>{asyncGetData.userNickName}님의 분양 정보</Typography>
              <TouchableOpacity 
                onPress={()=>{
                  props.navigation.navigate('CalculatorFilter', { totalCost : props.route.params.totalCost});
                  summuryToggleModal();
                }}>
                <Typography fontSize={14} color='#E8726E'>필터</Typography>
              </TouchableOpacity>
            </View>
            <Divider height={2} marginVertical={15}/>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>평형 정보</Typography>
              <Typography fontSize={14} color='#1B1B1B'>29평(77㎡)</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>계약일</Typography>
              <Typography fontSize={14} color='#1B1B1B'>{paymentDetail[0].date}</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>희망입주일</Typography>
              <Typography fontSize={14} color='#1B1B1B'>{paymentDetail[2].date}</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>주택 보유수</Typography>
              <Typography fontSize={14} color='#1B1B1B'>생애 최초 주택 구입</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>옵션 선택</Typography>
              <Typography fontSize={14} color='#1B1B1B'>5개 선택 (+3,230만원)</Typography>
            </View>
            <View style={{marginVertical: 10}}></View>
            <Typography fontSize={16} color='#1B1B1B' marginBottom={10}>대출정보</Typography>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>대출금 비율</Typography>
              <Typography fontSize={14} color='#1B1B1B'>60%</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>상환방식</Typography>
              <Typography fontSize={14} color='#1B1B1B'>원리금균등분할상환 (30년)</Typography>
            </View>
            <View style={styles.textBox}>
              <Typography fontSize={14} color='#8B8B8B'>금리</Typography>
              <Typography fontSize={14} color='#1B1B1B'>5.0%</Typography>
            </View>
            <View style={{marginVertical: 10}}></View>
            <TouchableOpacity onPress={summuryToggleModal} style={{alignItems: 'center', justifyContent: 'center' }}>
              <View style={{width: '90%', height: 50, backgroundColor: '#E8726E', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Typography fontSize={14} color='#fff'>확인</Typography>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    
      {/* 총정리 섹션 */}
      <View style={styles.section}>
        <Typography fontSize={20}>필요 자금 총정리</Typography>
        <View style={{alignItems: 'center', padding: 20}}>
          <Image source={require('../../images/buildingsDetail/resulticon.png')} style={{marginVertical: 10}}/>
          <Typography fontSize={16} fontWeight='normal' marginBottom={5}>
            <Typography fontSize={16}>{asyncGetData.userNickName}님</Typography>은 현재
          </Typography>
          <Typography fontSize={16} fontWeight='normal' marginBottom={5}>
            자본금 <Typography fontSize={16}>{FormatNumber(props.route.params.capitalCost)}</Typography>으로
          </Typography>
          <Typography fontSize={16} fontWeight='normal' marginBottom={5}>{props.route.params.aptDataName} 아파트를</Typography>
          <Typography fontSize={16} fontWeight='normal' >분양받으실 수 있어요!</Typography>
        </View>
        <View style={{borderWidth:1, borderColor:'#DFDFDF', borderRadius:10, padding: 20}}>
          <View style={styles.textBox}>
            <Typography fontSize={16}>총 구매비용</Typography>
            <Typography fontSize={18}>{FormatNumber(props.route.params.totalCost)}</Typography>
          </View>
          <Divider height={1} marginVertical={10}/>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#555' >대출금</Typography>
            <Typography fontSize={14}>{FormatNumber(props.route.params.loanCost)}</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#555' >필요 자본금 (취득세 포함)</Typography>
            <Typography fontSize={14}>{FormatNumber(props.route.params.capitalCost)}</Typography>
          </View>
          <View style={styles.textBox}>
            <Typography fontSize={14} color='#555'>월 납입금</Typography>
            <Typography fontSize={14} color='#E0413B'>{FormatNumber(props.route.params.monthyCost)}</Typography>
          </View>
        </View>
      </View>
      
      <View style={{marginVertical:10}}></View>

      {/* 총정리 섹션 */}
      {/* <View style={styles.section}>
        <Typography fontSize={20}>시기별 필요한 자본금</Typography>
        <CapitalGraph />
      </View> */}

      <Divider height={5} marginVertical={10}></Divider>
      
      {/* 상세내역 섹션 */}
      <View style={styles.section}>
        <ScrollView 
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
        > 
          {
            menu.map((item, index)=>{
              return (
                <View style={styles.menubox} key={index}>
                  <Typography fontSize={16}>{item}</Typography>
                </View>
              )
            })
          }
        </ScrollView>
      </View>

      <View style={{backgroundColor: '#FAFAFA', padding: 20}}>
        {
          paymentDetail.map((item, index)=>{
            return (
              <View key={index}>
                <View style={[styles.paymentalDetailBox, {alignItems:'center'}]}>
                  <Typography fontSize={14} color='#E5625D' marginBottom={10}>{item.title} 납부일</Typography>
                  <Typography fontSize={20} color='#1B1B1B' marginBottom={10}>{item.date}</Typography>
                </View>
                <View style={[styles.paymentalDetailBox, {marginBottom:20}]}>
                  <View style={styles.textBox2}>
                    <Typography fontSize={18} color='#3D3D3D'>필요자금</Typography>
                    <Typography fontSize={20} color='#E0413B'>{FormatNumber(item.sumCost)}</Typography>
                  </View>
                  <Divider height={1} marginVertical={10}/>
                  {
                    item.loanCost ?
                    <View style={styles.textBox}>
                      <Typography fontSize={18} color='#3D3D3D'>대출금</Typography>
                      <Typography fontSize={20} color='#555'>{FormatNumber(item.loanCost)}</Typography>
                    </View>
                    : null
                  }
                  <View style={styles.textBox2}>
                    <Typography fontSize={14} color='#6F6F6F'>{item.depogitName}</Typography>
                    <Typography fontSize={14} color='#6F6F6F'>{FormatNumber(item.depogitCost)}</Typography>
                  </View>
                  <View style={styles.textBox2}>
                    <Typography fontSize={14} color='#6F6F6F'>{item.optionName1}</Typography>
                    <Typography fontSize={14} color='#6F6F6F'>{FormatNumber(item.optionCost1)}</Typography>
                  </View>
                  <View style={styles.textBox2}>
                    <Typography fontSize={14} color='#6F6F6F'>{item.optionName2}</Typography>
                    <Typography fontSize={14} color='#6F6F6F'>{FormatNumber(item.optionCost2)}</Typography>
                  </View>
                  <View style={styles.textBox2}>
                    <Typography fontSize={14} color='#6F6F6F'>{item.optionName3}</Typography>
                    <Typography fontSize={14} color='#6F6F6F'>{FormatNumber(item.optionCost3)}</Typography>
                  </View>
                  <View style={styles.textBox2}>
                    <Typography fontSize={14} color='#6F6F6F'>{item.optionName4}</Typography>
                    <Typography fontSize={14} color='#6F6F6F'>{FormatNumber(item.optionCost4)}</Typography>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>

      <View style={{backgroundColor: '#FAFAFA', padding: 20}}>
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 15}}>
          <View>
            <Typography color='#1B1B1B' marginBottom={10}>법무사 비용 및 취등록세</Typography>
            <Typography fontSize={12} color='#555' marginBottom={10}>잔금 납부 3~5일 전 미리 납부하실 세금을 확인하세요!</Typography>
          </View>
          <Divider height={1} marginVertical={10}/>
          <View style={{alignItems:'center'}}>
            <Typography color='#E8726E' fontSize={13} marginBottom={10}>[ 1가구 무주택자 1주택 구매 기준 ]</Typography>
          </View>
          
            {
              taxDetail.map((item : any, index : any)=>{
                return (
                  <View style={styles.textBox3} key={index}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Typography fontSize={14} color='#333'>{item.taxName}</Typography>  
                      <TouchableOpacity 
                        onPress={()=>{props.navigation.navigate('TaxDetail', {data : item})
                      }}
                        style={{padding:10}}>
                        <AntDesign name="questioncircleo" size={14} color="black" />
                      </TouchableOpacity>
                    </View>
                    <View style={{alignItems:'flex-end'}}>
                      <Typography fontSize={14} color='#1B1B1B'>{FormatNumber(item.taxCost)}</Typography>
                      { item.standard ?
                       <Typography fontSize={12} color='#6F6F6F'>{item.standard}</Typography>
                       : null
                      } 
                    </View>
                  </View>
                )
              }) 
            }
          <View style={{alignItems:'center'}}>
            <View style={{height:40, borderWidth:1, borderColor:'#E8726E', flexDirection:'row', paddingHorizontal:15,
                          alignItems:'center', justifyContent:'center', borderRadius:10}}>
              <Typography color='#E8726E' fontSize={14}>법무사 추천받기</Typography>
              <AntDesign name="right" size={14} color="#E8726E" style={{marginLeft:10}}/>
            </View>
          </View>
          <Divider height={1} marginVertical={10}/>
          <View style={{alignItems:'center'}}>
            <Typography color='#1B1B1B' fontSize={10} marginBottom={5}>세금 및 법무사 비용은 개인별로 차이가 있습니다.</Typography>
            <Typography color='#1B1B1B' fontSize={10}>참고용으로만 사용해 주세요.</Typography>
          </View>
        </View>
      </View>
      
     
      {/* 모달 백화면 커버창 */}
      <View style={isSummuryModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>     

    </ScrollView>
   );
}
export default CalculatorResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  selectBox: {
    width: 126,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  textBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  textBox2: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  },
  textBox3: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60
  },
  menubox: {
    width: 90,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
  paymentalDetailBox:{
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 15, 
    marginVertical: 10
  }
});


