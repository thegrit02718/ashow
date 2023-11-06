import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import LoanInfo from '../CalculatorComponent/LoanInfo';
import LoanSelectBar from '../CalculatorComponent/LoanSelectBar';

function CalculatorSecond (props : any) {
 
  const totalCost = parseInt(props.route.params.totalCost);
  
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
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={()=>{props.navigation.goBack();}}
          >
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
          <Typography fontSize={16} color='#6F6F6F'>2 / 2</Typography>
        </View>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', marginTop: 10}}>
          <Image source={require('../../images/buildingsDetail/calendar.png')}/>
        </View>
      </View>

      {/* 대출정보 섹션 */}
      <View style={styles.section}>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10}>마지막으로</Typography>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10}>대출정보를 입력해주세요.</Typography>
        <LoanInfo 
          isLoanInfoModalVisible={isLoanInfoModalVisible}
          setLoanInfoModalVisible={setLoanInfoModalVisible}
          setCalcMonth={setCalcMonth}
        />
      </View>

      {/* 대출금 조절 섹션 */}
      <View style={[styles.section]}>
        <LoanSelectBar
          totalCost={totalCost}
          calcMonth={calcMonth}
          onSliderValueChange={handleSliderValueChange}
        />
      </View>
  
      {/* 하단 박스 */}
      <View style={{}}>
        {/* 버튼 섹션 */}
        <TouchableOpacity 
          onPress={()=>{props.navigation.navigate('CalculatorResult', 
          { 
            aptName : props.route.params.aptName,
            totalCost : totalCost,
            loanCost : loanCost,
            capitalCost : capitalCost,
            monthyCost : monthlyCost
          }
          );}}
        >
          <View style={{width: '100%', height: 60, backgroundColor: '#E8726E', alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={16} color='#FFF'>자금스케줄 확인하기</Typography>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* 모달 백화면 커버창 */}
      <View style={isLoanInfoModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      
    </ScrollView>
   );
}
export default CalculatorSecond;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 8
  },
  textBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
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


