import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import FormatNumber from '../../Components/FormatNumber';
import HaveHouseNotice from '../CalculatorComponent/HaveHouseNoticeModal';
import { useRoute } from '@react-navigation/native';
import PyeongStyleSelectModal from '../CalculatorComponent/PyeongStyleSelectModal';

function CalculatorFirst (props : any) {

  const route : any = useRoute();
  const resultCost = route.params.resultCost;

  const [isViewOption, setIsViewOption] = useState<boolean>(false);
  const [pyeongStyleSelect, setPyeongStyleSelect] = useState(0);
  const [pyeongSelectNum, setStyleNum] = useState(0);
  
  const [isHaveHouseTexNoticeModalVisible, setIsHaveHouseTexNoticeModalVisible] = useState(false);
  const HaveHouseTexNoticeToggleModal = () => {
    setIsHaveHouseTexNoticeModalVisible(!isHaveHouseTexNoticeModalVisible);
  };
  const [isPyengChangeModalVisible, setIsPyengChangeModalVisible] = useState(false);
  const PyengChangeToggleModal = () => {
    setIsPyengChangeModalVisible(!isPyengChangeModalVisible);
  };

  return (
    <View style={styles.container}>

      {/* 상단 박스 섹션 --------------------------------------- */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={()=>{props.navigation.goBack();}}
          >
            <AntDesign name="left" size={30} color="black" />
          </TouchableOpacity>
          <Typography fontSize={16} color='#6F6F6F'>1 / 2</Typography>
        </View>
      </View>

      <ScrollView style={{flex:1}}>

      

        {/* notice 섹션 --------------------------------------- */}
        <View style={styles.section}>
          <Typography fontSize={20} color='#3D3D3D' marginBottom={5} fontWeightIdx={2}>아쇼가</Typography>
          <Typography fontSize={20} color='#3D3D3D' marginBottom={5} fontWeightIdx={2}>원활한 아파트 분양을 위해</Typography>
          <Typography fontSize={20} color='#3D3D3D' marginBottom={5} fontWeightIdx={2}><Text style={{fontWeight: 'bold'}}>필요 자본금</Text>을 알려 드릴게요!</Typography>
          <View style={{position:'absolute', top:10, right:20}}>
            <Image source={require('../../images/buildingsDetail/calendar.png')} style={{width:25, height:25}}/>
          </View>
        </View>

        {/* 평형 선택 섹션 --------------------------------------- */}
        <View style={styles.section}>
          <Typography fontSize={14} color='#555' marginBottom={10} fontWeightIdx={2}>분양 받으실 <Text style={{fontWeight: 'bold'}}>평형</Text>을 선택해주세요.</Typography>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap:'wrap'}}>
          {
            route.params.pyengInfo.map((item:any, index:any)=>{
              return (
                <TouchableOpacity 
                  key={index}
                  style={{flex:1}} 
                  onPress={()=>{
                    PyengChangeToggleModal();
                    setStyleNum(index);
                  }}
                >
                  <View style={[styles.pyeongStyleSelectBox, { 
                                borderWidth: pyeongStyleSelect === index ? 2 : undefined,
                                borderColor: pyeongStyleSelect === index ? '#E8726E' : undefined,
                                backgroundColor: pyeongStyleSelect === index ? '#fff' : '#F8F8F8',
                                }]}>
                    <Typography fontSize={14} color='#8B8B8B'>{item.pyeng}</Typography> 
                  </View>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>

        {/* 평형변경 모달창 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPyengChangeModalVisible}
          onRequestClose={PyengChangeToggleModal}
        >
        <PyeongStyleSelectModal PyengChangeToggleModal={PyengChangeToggleModal} setPyeongStyleSelect={setPyeongStyleSelect} pyeongSelectNum={pyeongSelectNum}/>
        </Modal>

        {/* 주택 보유수 세금 안내 섹션 --------------------------------------- */}
        <View style={[styles.section, {flex:1}]}>
          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 5}}>
            <Typography fontSize={14} color='#555'>세금 </Typography>
            <TouchableOpacity onPress={HaveHouseTexNoticeToggleModal} style={{padding:5}}>
              <AntDesign name="questioncircleo" size={14} color="black" />
            </TouchableOpacity>
          </View>
          <Typography fontSize={14} marginBottom={10} fontWeightIdx={1}>
            세금은 <Typography fontSize={14}>1가구 무주택자가 1주택 구매시 기준</Typography>으로 적용되었어요.
          </Typography>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isHaveHouseTexNoticeModalVisible}
          onRequestClose={HaveHouseTexNoticeToggleModal}
        >
          <HaveHouseNotice HaveHouseNoticeToggleModal={HaveHouseTexNoticeToggleModal}/>
        </Modal>

        {/* 옵션 선택 섹션  --------------------------------------- */}
        <View style={[styles.section]}>
          <View style={{marginTop: 10}}>
            <Typography fontSize={14} color='#333' fontWeightIdx={2}>
              <Text style={{fontWeight: 'bold', color: '#555'}}>추가 옵션</Text>을 선택하시겠어요?
            </Typography>
          </View>
          <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              isViewOption &&
              <View style={{
                height:36, padding:5, borderWidth:1, borderColor: '#EFEFEF',
                alignItems: 'center', justifyContent: 'center', borderRadius: 10,
                flexDirection: 'row', margin: 5
              }}>
                <Typography>발코니확장</Typography>
                <TouchableOpacity 
                  onPress={()=>{
                    setIsViewOption(false);
                  }}
                  style={{marginLeft: 10}}
                  >
                  <AntDesign name="close" size={20} color="#C1C1C1" />
                </TouchableOpacity>
              </View>
            }
            {
              !isViewOption &&
              <TouchableOpacity 
                  onPress={()=>{
                    setIsViewOption(true);
                  }}>
                <View style={styles.optionButton}>
                  <Entypo name="plus" size={20} color="#E8726E" />
                </View>
              </TouchableOpacity> 
            }
          </View>
        </View>

      </ScrollView>
      
      {/* 하단 박스 --------------------------------------- */}
      <View style={{width: '100%'}}>

        <Divider height={2}/>
        {/* 총 구매비용 섹션 */}
        <View style={styles.section}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <Typography fontSize={16} color='#1B1B1B'>총 구매비용   </Typography>
            <Typography fontSize={24} color='#E0413B'>{FormatNumber(resultCost)}</Typography>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 5}}>
            <Typography fontSize={12} color='#333' fontWeightIdx={2}>
              분양가는 <Text style={{fontWeight: 'bold', color: '#555'}}>최고가 기준</Text>입니다.
              </Typography>
          </View>
        </View>
  
        {/* 버튼 섹션 */}
        <TouchableOpacity 
          onPress={()=>{props.navigation.navigate('CalculatorSecond', 
          { 
            aptData : route.params.aptData, pyengInfo: route.params.pyengInfo, pyengSelect : route.params.pyengSelect, resultCost : resultCost,
            moveinDay: route.params.moveinDay, contractDay : route.params.contractDay, 
            // selectedOptionNames: selectedOptionNames
          }
          )}}
        >
          <View style={{width: '100%', height: 60, backgroundColor: '#E8726E', alignItems: 'center', justifyContent: 'center' }}>
            <Typography fontSize={16} color='#FFF'>다음</Typography>
          </View>
        </TouchableOpacity>
      </View>

      {/* 모달 백화면 커버창 */}
      <View style={isHaveHouseTexNoticeModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
      <View style={isPyengChangeModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    
    </View>
   );
}
export default CalculatorFirst;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  button : {
    height: 48,
    backgroundColor : '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ED9390',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 5
  },
  optionButton : {
    width: 32,
    height: 36,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  pyeongStyleSelectBox : {
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  },
});


