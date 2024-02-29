import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import FormatNumber from '../../Components/FormatNumber';
import axios from 'axios';
import MainURL from "../../../MainURL";
import MainImageURL from "../../../MainImageURL";

export default function OptionsSelectModal (props : any) {
  
  const aptData = props.pyengSelect;

  interface optionsProps {
    id: number,
    aptKey: number,
    pyengKey: number,
    sort : string,
    name : string,
    notice : string,
    cost : number
  }  

  // 게시판 글 가져오기
  const [options, setOptions] = useState<optionsProps[]>([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/buildings/options/${aptData.aptKey}/${aptData.pyengKey}`)
    .then((res) => {
      setOptions(res.data);
    });
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const [isMinusOption, setIsMinusOption] = useState<boolean>();
  const [isExtendOption, setIsExtendOption] = useState<boolean>(true);

  // const defaultOptions = options?.filter((e) => e.sort === 'default');
  // const additionalOptions = options?.filter((e) => e.sort === 'additional');

  // const [selectedOptions, setSelectedOptions] = useState(Array(options.length).fill(false));  
  
  // const optionSelection = (index : any) => {
  //   const updatedSelections = [...selectedOptions];
  //   updatedSelections[index] = !updatedSelections[index];
  //   setSelectedOptions(updatedSelections);
  
  //   const selectedOptionNamesCopy = 
  //     options
  //       .filter((_, i) => updatedSelections[i])
  //       .map((selectedOption) => (selectedOption.name));
  //   props.setSelectedOptionNames(selectedOptionNamesCopy);
  
  //   const selectedOptionCosts = 
  //     options
  //       .filter((_, i) => updatedSelections[i])
  //       .map((selectedOption) => selectedOption.cost);
  //   const newTotalCost = selectedOptionCosts.reduce((acc, cost) => acc + cost, 0);
  //   props.setTotalOptionCost(newTotalCost);
  // };

  const handleTotalOptionPrice = () => {
    props.optionSelectToggleModal();
    
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1}}>
        {/* 상단바 ------------------------------------------------------------ */}
        <View style={styles.section}>
          <View style={{flexDirection:'row', justifyContent: 'center', marginVertical: 20, alignItems: 'center' }}>
            <TouchableOpacity
              style={{position:'absolute', left: 0}}
              onPress={()=>{props.optionSelectToggleModal();}}
            >
              <AntDesign name="left" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{position:'absolute', right: 0}}
              onPress={()=>{
                
              }}
            >
              <View style={{padding:10, flexDirection:'row', alignItems:'center',
                            borderWidth:1, borderColor:'#5D85F7', borderRadius:10 }}>
                <Typography fontSize={12} color='#5D85F7'>입주자모집공고</Typography>
                <Feather name="clipboard" size={12} color="#5D85F7" style={{marginLeft:5}}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Typography fontSize={24}>{aptData.personalArea}㎡ 분양옵션 선택</Typography>
        </View>

        {/* 마이너스 옵션 선택 ------------------------------------------------------------ */}
        <View style={styles.section}>
          <Typography fontSize={14} marginBottom={10}>옵션 선택<Typography fontSize={30} color='#E8726E'> .</Typography></Typography>
          <Divider height={5}/>

          <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:20}}>
            <TouchableOpacity
              style={isMinusOption === true ? styles.minusOptionBoxSelected : styles.minusOptionBox}
              onPress={()=>{
                setIsMinusOption(true)
                props.setTotalOptionCost(aptData.minusOption);
              }}
            > 
              { isMinusOption === true &&
                <View style={{width:24, height:24, position:'absolute', left:10, top:-10,
                              borderRadius:12, backgroundColor:'#E8726E', alignItems:'center', justifyContent:'center'}}>
                  <AntDesign name="check" size={14} color="#fff" />
                </View>
              }
              <Typography fontSize={14} color={isMinusOption === true ? '#1B1B1B' : '#8B8B8B'}>마이너스 옵션</Typography>
              <Typography fontSize={14} color={isMinusOption === true ? '#1B1B1B' : '#8B8B8B'} fontWeightIdx={2}>{FormatNumber(aptData.minusOption)}</Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={isMinusOption === false ? styles.minusOptionBoxSelected : styles.minusOptionBox}
              onPress={()=>{
                setIsMinusOption(false);
                props.setTotalOptionCost(aptData.extendOption);
              }}
            >
              { isMinusOption === false &&
                <View style={{width:24, height:24, position:'absolute', left:10, top:-10,
                              borderRadius:12, backgroundColor:'#E8726E', alignItems:'center', justifyContent:'center'}}>
                  <AntDesign name="check" size={14} color="#fff" />
                </View>
              }
              <Typography fontSize={14} color={isMinusOption === false ? '#1B1B1B' : '#8B8B8B'}>플러스 옵션</Typography>
              <Typography fontSize={14} color={isMinusOption === false ? '#1B1B1B' : '#8B8B8B'} fontWeightIdx={2}>유상 옵션</Typography>
            </TouchableOpacity>
          </View>

          <View style={{padding:15, backgroundColor:'#F5F4F3', borderRadius:5}}>
            <Typography fontSize={12} color='#6F6F6F' fontWeightIdx={2}>* 마이너스 옵션은 입주자모집공고 시 제시된 마감재 품목과 금액 범위 내에서 
                    사업주체가 정한 기준에 따라 계약을 체결할 수 있습니다. 상세 내용은 모집공고 및 사업주체에게 문의 바랍니다.</Typography>
          </View>
        </View>

        {/* 발코니 확장 공사 ------------------------------------------------------------ */}
        { isMinusOption === false &&
        <>
          <View style={styles.section}>
            <Typography fontSize={14} marginBottom={10}>발코니 확장 공사<Typography fontSize={30} color='#E8726E'> .</Typography></Typography>
            <Divider height={5}/>

            {/* <View style={{height:400}}>
              <Image 
                source={{uri: `${MainImageURL}/appimages/buildings/${props.pyengSelect.aptKey}/expand${props.pyengSelect.personalArea}.png`}} 
                style={{width:'100%', height:'100%', resizeMode:'contain'}}
              />
            </View> */}

            <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:20}}>
              <TouchableOpacity
                style={isExtendOption === false ? styles.minusOptionBoxSelected : styles.minusOptionBox}
                onPress={()=>{
                  setIsExtendOption(false);
                  props.setTotalOptionCost(0);
                }}
              >
                { isExtendOption === false &&
                  <View style={{width:24, height:24, position:'absolute', left:10, top:-10,
                                borderRadius:12, backgroundColor:'#E8726E', alignItems:'center', justifyContent:'center'}}>
                    <AntDesign name="check" size={14} color="#fff" />
                  </View>
                }
                <Typography fontSize={14} color={isExtendOption === false ? '#1B1B1B' : '#8B8B8B'}>확장 X</Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={isExtendOption === true ? styles.minusOptionBoxSelected : styles.minusOptionBox}
                onPress={()=>{
                  setIsExtendOption(true);
                  props.setTotalOptionCost(aptData.extendOption);
                }}
              > 
                { isExtendOption === true &&
                  <View style={{width:24, height:24, position:'absolute', left:10, top:-10,
                                borderRadius:12, backgroundColor:'#E8726E', alignItems:'center', justifyContent:'center'}}>
                    <AntDesign name="check" size={14} color="#fff" />
                  </View>
                }
                <Typography fontSize={14} color={isExtendOption === true ? '#1B1B1B' : '#8B8B8B'}>확장 O</Typography>
                <Typography fontSize={14} color={isExtendOption === true ? '#1B1B1B' : '#8B8B8B'} fontWeightIdx={2}>+{FormatNumber(aptData.extendOption)}</Typography>
              </TouchableOpacity>
            
            </View>
 
            <View style={{padding:15, backgroundColor:'#F5F4F3', borderRadius:5}}>
              <Typography fontSize={12} color='#6F6F6F' fontWeightIdx={2}>* 일부타입의 경우 발코니확장 미선택시 다른 추가선택품목 계약이 불가할 수도 있으니, 
                                유상옵션 선택 시 반드시 확인 바랍니다.</Typography>
            </View>
          </View>
          {/* <View style={styles.section}>
            <Typography fontSize={14} marginBottom={10}>인테리어 - 중복선택 가능<Typography fontSize={30} color='#E8726E'> .</Typography></Typography>
            <Divider height={5}/>

            {
              defaultOptions.map((item, index)=>{
                const isSelected = selectedOptions[index];
                return (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => optionSelection(index)}
                    style={{marginVertical:10}}
                  >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{
                          width: 16, height: 16, marginRight: 10,
                          borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                          borderWidth:1, borderColor: isSelected ? '#E8726E' : "#C1C1C1",
                          backgroundColor : isSelected ? '#E8726E' : '#fff',
                        }}>
                        <AntDesign name="check" size={12} color={isSelected ? '#fff' : "#C1C1C1"} />
                      </View>
                      <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{width:'30%'}}>
                          <Typography fontSize={14}>{item.name}</Typography>
                        </View>
                        <View style={{width:'30%'}}>
                          <Typography fontSize={12} fontWeightIdx={2}>{item.notice}</Typography>
                        </View>
                        <Typography fontSize={12} fontWeightIdx={2}>{FormatNumber(item.cost)}</Typography>
                      </View>
                    </View>
                    <Divider height={1} marginVertical={5}/>
                  </TouchableOpacity>
                )
              })
            }

            { isExtendOption === true &&
              <View>
                <Typography fontSize={14} marginBottom={10}>{additionalOptions[0].name}<Typography fontSize={30} color='#E8726E'> .</Typography></Typography>
                <Divider height={5}/>
                {
                  additionalOptions.map((item, index)=>{
                    const isSelected = selectedOptions[index + defaultOptions.length];
                    return (
                      <TouchableOpacity 
                        key={index}
                        onPress={() => optionSelection(index + defaultOptions.length)}
                        style={{marginVertical:10}}
                      >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{
                              width: 16, height: 16, marginRight: 10,
                              borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                              borderWidth:1, borderColor: isSelected ? '#E8726E' : "#C1C1C1",
                              backgroundColor : isSelected ? '#E8726E' : '#fff',
                            }}>
                            <AntDesign name="check" size={12} color={isSelected ? '#fff' : "#C1C1C1"} />
                          </View>
                          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{width:'30%'}}>
                              <Typography fontSize={14}>{item.name}</Typography>
                            </View>
                            <View style={{width:'30%'}}>
                              <Typography fontSize={12} fontWeightIdx={2}>{item.notice}</Typography>
                            </View>
                            <Typography fontSize={12} fontWeightIdx={2}>{FormatNumber(item.cost)}</Typography>
                          </View>
                        </View>
                        <Divider height={1} marginVertical={5}/>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            }
          </View> */}
        </> 
        }
        
        {/* 기타 선택 ------------------------------------------------------------ */}
        <View style={styles.section}>
          <Typography fontSize={14} marginBottom={10}>기타 선택<Typography fontSize={30} color='#E8726E'> .</Typography></Typography>
          <Divider height={5}/>
          <View style={{padding:15, backgroundColor:'#F5F4F3', borderRadius:5, marginTop:10}}>
            <Typography fontSize={12} color='#6F6F6F' fontWeightIdx={2}>기타 자세한 옵션 사항은 화면 우측 상단의 
                    입주자 모집공고를 확인해 주세요!</Typography>
          </View>
        </View>
      
        {/* 하단 버튼 ------------------------------------------------------------ */}
        <View style={{padding:20, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity 
          onPress={()=>{
            setIsMinusOption(undefined);
            setIsExtendOption(true);
            props.setTotalOptionCost(0);
          }}
        >
          <View style={[styles.bottomButton, {width:74, marginRight: 15, backgroundColor:'#EFEFEF'}]}>
            <Typography fontSize={14} color='#8B8B8B'>초기화</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{isMinusOption !== undefined ? handleTotalOptionPrice() : Alert.alert('옵션을 선택해주세요') }}
        >
          { isMinusOption === true
            ?
            <View style={[styles.bottomButton, {backgroundColor: '#E8726E'}]}>
              <Typography fontSize={14} color='#FFF'>{FormatNumber(aptData.minusOption)} 선택완료</Typography>
            </View>
            :
            <View>
            {
              isMinusOption === undefined
              ?
              <View style={[styles.bottomButton, {backgroundColor: '#DFDFDF'}]}>
                <Typography fontSize={14} color='#FFF'>선택완료</Typography>
              </View>
              :
              <View style={[styles.bottomButton, {backgroundColor: '#E8726E'}]}>
               <Typography fontSize={14} color='#FFF'>
                {props.totalOptionCost > 0 ? `+${FormatNumber(props.totalOptionCost)} 선택완료` : '선택완료'}
               </Typography>
              </View>
            }
            </View>
          }
          
        </TouchableOpacity>
      </View>

      </ScrollView>
    </View>
  )
    
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:20
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  minusOptionBox : {
    width: '48%',
    height: 96,
    borderWidth:1,
    borderColor:'#DFDFDF',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  minusOptionBoxSelected : {
    width: '48%',
    height: 96,
    borderWidth:1,
    borderColor:'#E8726E',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  bottomButton : {
    width: 250,
    borderRadius: 10,
    height: 50,
    padding: 10, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

})