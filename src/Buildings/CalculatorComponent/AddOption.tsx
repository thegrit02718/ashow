import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import FormatNumber from '../../Components/FormatNumber';
import SelectDropdown from 'react-native-select-dropdown'
import Entypo from 'react-native-vector-icons/Entypo';

export default function AddOption (props : any) {
 
  const toggleModal = () => {
    props.setAddOptionModalVisible(!props.isAddOptionModalVisible);
  };
  
  const part = ["29평(77㎡)", "32평(111㎡)", "40평(177㎡)"]
  const option = [
    { name : "발코니 확장 공사비", cost: 28000000 },
    { name : "현관 중문", cost: 1600000 },
    { name : "침실 붙박이장", cost: 1000000 },
    { name : "식기 세척기", cost: 900000 },
    { name : "광파오븐", cost: 800000 },
  ]
   
  const [selectedOptions, setSelectedOptions] = useState(Array(option.length).fill(false));  
  const [totalOptionCost, setTotalOptionCost] = useState(0);
  const [selectedOptionNames, setSelectedOptionNames] = useState({});

  
  const optionSelection = (index : any) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedOptions(updatedSelections);
  
    const selectedOptionNamesCopy = 
      option
        .filter((_, i) => updatedSelections[i])
        .map((selectedOption) => (selectedOption.name));
    setSelectedOptionNames(selectedOptionNamesCopy);
  
    const selectedOptionCosts = 
      option
        .filter((_, i) => updatedSelections[i])
        .map((selectedOption) => selectedOption.cost);
    const newTotalCost = selectedOptionCosts.reduce((acc, cost) => acc + cost, 0);
    setTotalOptionCost(newTotalCost);
  };

  return (
    <View>
      <View>
        {/* 선택한 옵션 */}
        <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          { 
            Array.isArray(selectedOptionNames) 
            && selectedOptionNames.length > 0 
            && selectedOptionNames.map((item : string, index : number)=>{
                return(
                  <View 
                    style={{
                      height:36, padding:5, borderWidth:1, borderColor: '#EFEFEF',
                      alignItems: 'center', justifyContent: 'center', borderRadius: 10,
                      flexDirection: 'row', margin: 5
                    }}
                    key={index}
                  >
                    <Typography>{item}</Typography>
                    <TouchableOpacity 
                      // onPress={toggleModal}
                      style={{marginLeft: 5}}
                      >
                      <AntDesign name="close" size={15} color="#C1C1C1" />
                    </TouchableOpacity>
                  </View>
                )
              })
          }
          <TouchableOpacity 
            onPress={toggleModal}
          >
            <View style={styles.optionButton}>
              <Entypo name="plus" size={20} color="#E8726E" />
            </View>
          </TouchableOpacity>    
        </View>
      </View>

      {/* 추가 옵션 선택 모달창 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isAddOptionModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', padding: 20 }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20}>추가옵션 선택하기</Typography>
          </View>
          <Divider height={2} marginVertical={10}/>
          {
            option.map((item, index)=>{
              const isSelected = selectedOptions[index];
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => optionSelection(index)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        width: 24, height: 24, borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                        backgroundColor : isSelected ? '#E8726E' : '#DFDFDF', 
                      }}>
                      <AntDesign name="check" size={18} color="#fff" />
                    </View>
                    <View style={styles.textBox}>
                      <Typography fontSize={14}>{item.name}</Typography>
                      <Typography fontSize={14}>+ {FormatNumber(item.cost)}</Typography>
                    </View>
                  </View>
                  </TouchableOpacity>
                  <Divider height={1} marginVertical={5}/>
                </View>
              )
            })
          }
          <View style={{alignItems: 'flex-end', marginVertical: 10 }}>
            <View style={{width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10}}>
              <Typography fontSize={16}>총합계</Typography>
              <Typography fontSize={20} color='#E8726E'>{FormatNumber(totalOptionCost)}</Typography>
            </View>
          </View>  

          <TouchableOpacity 
          onPress={toggleModal} 
          style={{alignItems: 'center', justifyContent: 'center' }}>
            <View style={{width: '90%', height: 50, backgroundColor: '#E8726E', borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
              <Typography fontSize={14} color='#fff'>선택 완료</Typography>
            </View>
          </TouchableOpacity>   
        </View>
      </Modal>
    </View>
  )
    
};


const styles = StyleSheet.create({
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
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
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

})