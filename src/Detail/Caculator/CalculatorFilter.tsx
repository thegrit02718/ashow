import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, TouchableWithoutFeedback  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import HaveHouseNum from '../CalculatorComponent/HaveHouseNoticeModal';
import FormatNumber from '../../Components/FormatNumber';
import LoanInfo from '../CalculatorComponent/LoanInfo';
import LoanSelectBar from '../CalculatorComponent/LoanSelectBar';
import CalendarBox from '../DetailComponent/CalendarBox';

function CalculatorFilter (props : any) {

  const resultCost = parseInt(props.route.params.resultCost);

  const [contractDay, setContractDay] = useState('08/07(월)')
  const [moveinDay, setMoveinDay] = useState('08/07(월)')
  
  const [isAddOptionModalVisible, setAddOptionModalVisible] = useState(false);
  const [isHaveHouseNumModalVisible, setHaveHouseNumModalVisible] = useState(false);
  
  const [calcMonth, setCalcMonth] =  useState<number>(1);
  const [isLoanInfoModalVisible, setLoanInfoModalVisible] = useState(false);

  // LoanSelectBar에서 전달된 값을 상태로 관리
  const [loanCost, setLoanCost] = useState(0);
  const [capitalCost, setCapitalCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);

  // LoanSelectBar에서 전달된 값을 설정
  const handleSliderValueChange = (loanCostValue: number, capitalCostValue: number, monthlyCostValue: number) => {
    setLoanCost(loanCostValue);
    setCapitalCost(capitalCostValue);
    setMonthlyCost(monthlyCostValue);
  };

  return (
    <ScrollView style={styles.container}>

      {/* 상단 박스 섹션 */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'center', marginVertical: 30, alignItems: 'center' }}>
          <Typography fontSize={16} color='#6F6F6F'>자금 스케줄 필터</Typography>
          <TouchableOpacity 
            style={{position:'absolute', right: 0}}
            onPress={()=>{props.navigation.goBack();}}
          >
            <View style={{padding:10}}>
              <AntDesign name="close" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* 계약일, 입주일 설정 섹션 */}
      {/* <View style={styles.section}>
        <Typography fontSize={18} color='#555' marginBottom={10}>계약일 ・ 입주일 설정</Typography>
        <CalendarBox></CalendarBox>
      </View> 

      <Divider height={6} marginVertical={15}/> */}

      {/* 평형 ・ 옵션 설정 섹션 */}
      <View style={styles.section}>
        <Typography fontSize={18} color='#555' marginBottom={15}>평형 ・ 옵션 설정</Typography>

        {/* 평형 선택 */}
        <Typography fontSize={14} color='#555' marginBottom={15}>평형선택</Typography>
        
        
        <View style={{marginVertical: 10}}></View>
                          
      
        {/* 추가 옵션 설정 */}
        <Typography fontSize={14} color='#555' marginBottom={15}>추가 옵션</Typography>
        
        <View style={{marginVertical: 10}}></View>

        <View style={styles.resultBox}>
          <Typography fontSize={14} color='#1B1B1B' marginBottom={15} fontWeightIdx={2}>
            분양가는 <Typography fontSize={14} color='#1B1B1B'>최고가 기준</Typography>입니다.
          </Typography>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Typography fontSize={16} color='#1B1B1B'>총 구매비용   </Typography>
            <Typography fontSize={20} color='#E8726E'>{FormatNumber(resultCost)}</Typography>
          </View>
        </View>
      </View>

      <Divider height={6} marginVertical={15}/>

      {/* 대출 설정 섹션 */}
      <View style={styles.section}>
        <Typography fontSize={18} color='#555' marginBottom={15}>대출 설정</Typography>

        {/* 대출 정보 선택 */}
        <LoanInfo 
          isLoanInfoModalVisible={isLoanInfoModalVisible}
          setLoanInfoModalVisible={setLoanInfoModalVisible}
          setCalcMonth={setCalcMonth}
        />
        <View style={{marginVertical: 10}}></View>
        
        <LoanSelectBar 
          resultCost={resultCost}
          calcMonth={calcMonth}
          onSliderValueChange={handleSliderValueChange}
        />
        <View style={{marginVertical: 10}}></View>
      </View>

      {/* 하단 버튼 섹션 */}
      <View style={styles.bottomButtonBox}>
        <TouchableOpacity 
          onPress={()=>{}}
        >
          <View style={[styles.bottomButton, {width:74, marginRight: 15, backgroundColor:'#EFEFEF'}]}>
            <Typography fontSize={16} color='#8B8B8B'>초기화</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{
            props.navigation.goBack();
          }}
        >
          <View style={[styles.bottomButton, {width:250}]}>
            <Typography fontSize={16} color='#FFF'>적용하기</Typography>
          </View>
        </TouchableOpacity>
      </View>


      {/* 모달 백화면 커버창 */}
      <View style={isAddOptionModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={isHaveHouseNumModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={isLoanInfoModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

    </ScrollView>
  )
}

export default CalculatorFilter;

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  calendarBox : {
    width: '47%',
    height : 60,
    justifyContent: 'flex-end'
  },
  calendar: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E3514C',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  calendarText : {
    top: 0,
    left: 10,
    height:18, 
    position: 'absolute',
    backgroundColor:'#FEF7FF', 
    paddingHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  resultBox : {
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 20,
    borderWidth: 1,
    borderColor : '#DFDFDF',
    borderRadius: 10
  },
  bottomButtonBox : {
    bottom:0, 
    padding: 20,
    width: '100%', 
    backgroundColor: '#fff', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  bottomButton : {
    borderRadius: 10,
    height: 50,
    padding: 10, 
    backgroundColor: '#E8726E', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },

})