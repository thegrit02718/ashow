import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';

export default function LoanInfo (props : any) {

  const loanInfoToggleModal = () => {
    props.setLoanInfoModalVisible(!props.isLoanInfoModalVisible);
  };
  const loanInfo = [
    "대출상환 10년", "대출상환 20년", "대출상환 30년"
  ]
  const [loanInfoSelect, setLoanInfoSelect] = useState(loanInfo[0])

  return (
  <View style={{flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
    <View style={styles.selectBox}>
      <Typography fontSize={13}>원리금균등분할상환</Typography>
    </View>
    <View style={styles.selectBox}>
      <Typography fontSize={13}>금리 5.0%</Typography>
    </View>
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity onPress={loanInfoToggleModal}>
        <View style={styles.selectBox}>
          <Typography color='#1B1B1B'>{loanInfoSelect}</Typography>
          <AntDesign name="down" size={14} color="black" style={{marginLeft:3}} />
        </View>
      </TouchableOpacity>
    </View>

    {/* 추가 옵션 선택 모달창 */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.isLoanInfoModalVisible}
        onRequestClose={loanInfoToggleModal}
      >
        <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', padding: 20 }}>
          {
            loanInfo.map((item, index)=>{
              return (
                <TouchableOpacity 
                  key={index}
                  onPress={()=>{
                    setLoanInfoSelect(item);
                  }}>
                <View style={styles.loanInfoSelectTextRow}>
                  <Typography fontSize={14} 
                  color={
                    loanInfoSelect === item ? '#1B1B1B' : '#6F6F6F'
                  }
                  >{item}</Typography>
                  {
                    loanInfoSelect === item 
                    ? <Image source={require('../../images/buildingsDetail/circleSeleted.png')}/>
                    : <Image source={require('../../images/buildingsDetail/circleDefault.png')}/>
                  }
                </View>
                </TouchableOpacity>
              )
            })
          }
        <TouchableOpacity onPress={loanInfoToggleModal} style={{alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
          <View style={{width: '90%', height: 50, backgroundColor: '#E8726E', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={14} color='#fff'>설정 완료</Typography>
          </View>
        </TouchableOpacity>
        </View>
      </Modal>
  </View>
  )
    
};


const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  selectBox: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#DFDFDF',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  loanInfoSelectTextRow : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15,
    backgroundColor : '#F5F4F3',
    borderRadius: 10,
    marginVertical: 7
  },
})