import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, TouchableWithoutFeedback  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import FormatNumber from '../../Components/FormatNumber';
import AddOption from '../CalculatorComponent/AddOption';
import PyeongStyleSelect from '../CalculatorComponent/PyeongStyleSelect';
import HaveHouseNotice from '../CalculatorComponent/HaveHouseNoticeModal';


function CalculatorFirst (props : any) {

  const totalCost = 723000000
  const [isAddOptionModalVisible, setAddOptionModalVisible] = useState(false);
  const [isHaveHouseNoticeModalVisible, setHaveHouseNoticeModalVisible] = useState(false);

  const HaveHouseNoticeToggleModal = () => {
    setHaveHouseNoticeModalVisible(!isHaveHouseNoticeModalVisible);
  };

  return (
    <ScrollView style={styles.container}>

      {/* 상단 박스 섹션 --------------------------------------- */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={()=>{props.navigation.goBack();}}
          >
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
          <Typography fontSize={16} color='#6F6F6F'>1 / 2</Typography>
        </View>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', marginTop: 10}}>
          <Image source={require('../../images/buildingsDetail/calendar.png')}/>
        </View>
      </View>

      {/* notice 섹션 --------------------------------------- */}
      <View style={styles.section}>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10} fontWeight='normal'>아쇼가</Typography>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10} fontWeight='normal'>원활한 아파트 분양을 위해</Typography>
        <Typography fontSize={24} color='#3D3D3D' marginBottom={10} fontWeight='normal'><Text style={{fontWeight: 'bold'}}>자금 스케줄</Text>을 만들어 드릴게요!</Typography>
      </View>

      {/* 평형 선택 섹션 --------------------------------------- */}
      <View style={styles.section}>
        <Typography fontSize={14} color='#555' marginBottom={10}>평형 선택</Typography>
        <PyeongStyleSelect/>
      </View>

      {/* 주택 보유수 세금 안내 섹션 --------------------------------------- */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom: 5}}>
          <Typography fontSize={14} color='#555'>세금 </Typography>
          <TouchableOpacity onPress={HaveHouseNoticeToggleModal} style={{padding:5}}>
            <AntDesign name="questioncircleo" size={14} color="black" />
          </TouchableOpacity>
        </View>
        <Typography fontSize={14} marginBottom={10} fontWeight='600'>
          세금은 <Typography fontSize={14}>1가구 무주택자가 1주택 구매시 기준</Typography>으로 적용되었어요.
        </Typography>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isHaveHouseNoticeModalVisible}
        onRequestClose={HaveHouseNoticeToggleModal}
      >
        <HaveHouseNotice HaveHouseNoticeToggleModal={HaveHouseNoticeToggleModal}/>
      </Modal>

      {/* 옵션 선택 섹션  --------------------------------------- */}
      <View style={styles.section}>
        <View style={{marginTop: 10}}>
          <Typography fontSize={14} color='#333' fontWeight='normal'>
            <Text style={{fontWeight: 'bold', color: '#555'}}>추가 옵션</Text>을 선택하시겠어요?
          </Typography>
        </View>
        <AddOption
          isAddOptionModalVisible={isAddOptionModalVisible}
          setAddOptionModalVisible={setAddOptionModalVisible}
        />
      </View>
    
     
      {/* 하단 박스 --------------------------------------- */}
      <View style={{bottom:0, width: '100%'}}>

        <Divider height={2}/>
        {/* 총 구매비용 섹션 */}
        <View style={styles.section}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <Typography fontSize={16} color='#1B1B1B'>총 구매비용   </Typography>
            <Typography fontSize={24} color='#E0413B'>{FormatNumber(totalCost)}</Typography>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 5}}>
            <Typography fontSize={12} color='#333' fontWeight='normal'>
              분양가는 <Text style={{fontWeight: 'bold', color: '#555'}}>최고가 기준</Text>입니다.
              </Typography>
          </View>
        </View>
  
        {/* 버튼 섹션 */}
        <TouchableOpacity 
          onPress={()=>{props.navigation.navigate('CalculatorSecond', 
          { 
            aptName : props.route.params.aptName,
            totalCost : totalCost
          }
          )}}
        >
          <View style={{width: '100%', height: 60, backgroundColor: '#E8726E', alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={16} color='#FFF'>다음</Typography>
          </View>
        </TouchableOpacity>
      </View>

      {/* 모달 백화면 커버창 */}
      <View style={isAddOptionModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={isHaveHouseNoticeModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      
    </ScrollView>
   );
}
export default CalculatorFirst;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  textBox: {
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


