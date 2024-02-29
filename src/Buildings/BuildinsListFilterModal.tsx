import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput  } from 'react-native';
import { Typography } from '../Components/Typography';
import RangeSlider from 'rn-range-slider';
import { useRecoilState } from 'recoil';
import { recoilCostHigh, recoilCostLow, recoilPriceFirstButton, 
        recoilSelectedPriceButtonNum, recoilSelectedPriceMax, recoilSelectedPriceMin, 
        recoilPyengHigh, recoilPyengLow, recoilPyengFirstButton, recoilAllSelectPyeng, 
        recoilSelectedPyengButtonNum, recoilSelectedPyengMin, recoilSelectedPyengMax, recoilHouseHoldsLow, recoilHouseHoldsHigh, recoilHouseHoldsFirstButton, recoilSelectedHouseHoldsButtonNum, recoilAllSelectHouseHolds, recoilSelectedHouseHoldsMin, recoilSelectedHouseHoldsMax, 
} from '../RecoilStore';


const tabNamesReset = (props : any, index:number, text : string) => {
  const tabNames = [...props.isTabNames];
  tabNames[index] = false;
  props.setIsTabNames(tabNames);
  const copy = [...props.tabNames]
  copy[index] = text
  props.setTabNames(copy);
}



export function TabScreen1(props: any) {

  const costs = ['1', '2', '3', '4', '5', '10', '20', '30'];
  const [costLow, setCostLow] = useRecoilState(recoilCostLow);
  const [costHigh, setCostHigh] = useRecoilState(recoilCostHigh);
  const [priceFirstButton, setPriceFirstButton] = useRecoilState(recoilPriceFirstButton);
  const [selectedButtonNum, setSelectedButtonNum] = useRecoilState<number>(recoilSelectedPriceButtonNum);
  const [selectedMin, setSelectedMin] = useRecoilState<number>(recoilSelectedPriceMin);
  const [selectedMax, setSelectedMax] = useRecoilState<number>(recoilSelectedPriceMax);

  const statesReset = () => {
    setCostLow('');
    setCostHigh('');
    setPriceFirstButton('');
    setSelectedButtonNum(0);
    setSelectedMin(0);
    setSelectedMax(0);
  }

  useEffect(() => {
    if (props.priceReset === 'reset') {
      statesReset();
    }
  }, [props.priceReset]);

  const changeTabNames = (minCopy:string, maxCopy:string) => {
    const tabNames = [...props.isTabNames];
    tabNames[0] = true;
    props.setIsTabNames(tabNames);
    const copy = [...props.tabNames]
    if (minCopy === maxCopy) {
      if (maxCopy === '30' ) {
        copy[0] = `${maxCopy}억~`;
        props.setTabNames(copy);
      } else {
        copy[0] = `~${maxCopy}억`;
      props.setTabNames(copy);
      }
    } else if (minCopy === '1' && maxCopy === '30') {
      copy[0] = `전체`;
      props.setTabNames(copy);
    } else {
      copy[0] = `${minCopy}억~${maxCopy}억`;
      props.setTabNames(copy);
    }
  }

  return (
    
    <View style={{padding:10}}>
      <View style={{width:'100%', alignItems:'center'}}>
        {
          selectedMin === 0 && selectedMax === 0
          ?
          <Typography fontSize={18} color='#C1C1C1'>금액대</Typography>
          :
          <Typography fontSize={18} color='#1B1B1B'>
            { selectedMin === selectedMax && selectedMax !== 8 && selectedButtonNum === 1 && `~ ${costHigh}억원 이하`}
            { selectedMin === 8 && selectedMax === 8 && `${costLow}억원 이상 ~`}
            { selectedMin === 1 && selectedMax === 8 &&  `전체`}
            { (selectedMin !== 1 || selectedMax !== 1) && (selectedMin !== 8 || selectedMax !== 8) &&
              (selectedMin !== 1 || selectedMax !== 8) && selectedButtonNum > 1 && `${costLow}억원 ~ ${costHigh}억원` }
          </Typography>
        }
      </View>
      
      <View style={{flexDirection:'row', width:'100%', height:120, justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          costs.map((item:any, index:any)=>{

            return (
              <TouchableOpacity
                key={index} 
                style={[
                  (index+1 >= selectedMin && index+1 <= selectedMax)
                  ? TabScreenStyle.selectedbox : TabScreenStyle.box
                  , {width:'22%'}
                ]}
                onPress={()=>{
                  // 선택한 버튼을 눌렀을 때 공통
                  setSelectedButtonNum(selectedButtonNum+1);

                  if (selectedButtonNum === 0) {
                    props.setPriceReset(item); 
                    setSelectedMin(index+1); 
                    setSelectedMax(index+1); 
                    setPriceFirstButton(item);
                    changeTabNames(item, item);
                    if (index === 7 ) {
                      setCostLow('30'); 
                      setCostHigh(' '); 
                      props.handlePriceFilterHigher(item)
                    } else {
                      setCostLow(' '); 
                      setCostHigh(item);
                      props.handlePriceFilterSingle(item)
                    }
                  } else {
                    if (index+1 === selectedMin || index+1 === selectedMax) {
                      // 이미 선택한 범위를 다시 눌렀을 경우, 초기화
                      statesReset();
                      props.setPriceReset('reset');
                      props.handlePriceFilterAll();
                      tabNamesReset(props, 0, '금액대')
                    }
                    if (index+1 > selectedMin) {
                      // 이전 선택값보다 큰 값을 선택할때
                      setCostLow(priceFirstButton);
                      setCostHigh(item);
                      setSelectedMax(index+1);
                      props.handlePriceFilterDouble(priceFirstButton, item);
                      changeTabNames(priceFirstButton, item);
                    } 
                    if (index+1 < selectedMax) {
                      // 이전 선택값보다 작은 값을 선택할때
                      setCostHigh(priceFirstButton);
                      setCostLow(item);
                      setSelectedMin(index+1);
                      props.handlePriceFilterDouble(item, priceFirstButton);
                      changeTabNames(item, priceFirstButton);
                    } 
                    if ((selectedMin === 1 && index+1 === 8)||(index+1 === 1 && selectedMax === 8)) {
                      // 전체선택 : 1억에서 30억이상 선택할때 (이전 1억 선택->30억 선택 // 이전 30억선택 -> 1억 선택)
                      setCostLow('');
                      setCostHigh('');
                      setSelectedMin(1);
                      setSelectedMax(8);
                      props.handlePriceFilterAll();
                      changeTabNames('1', '30');
                    }
                    if (selectedButtonNum === 2 || (selectedMin === 1 && selectedMax === 8)) {
                      // 2개 이상 (전체 포함) 선택되어 있을때
                      if (selectedMin <= index+1 && index+1 <= selectedMax ) {
                        props.setPriceReset(item); 
                        setSelectedMin(index+1); 
                        setSelectedMax(index+1); 
                        setPriceFirstButton(item);
                        changeTabNames(item, item);
                        setSelectedButtonNum(1);
                        if (index === 7 ) {
                          setCostLow('30'); 
                          setCostHigh(' '); 
                          props.handlePriceFilterHigher(item)
                        } else {
                          setCostLow(' '); 
                          setCostHigh(item);
                          props.handlePriceFilterSingle(item)
                        }
                      }
                    }
                  } 
                }}
              >
                <Typography fontSize={14} color={(index+1 >= selectedMin && index+1 <= selectedMax) ? '#E8726E' : '#1B1B1B'}>
                  {index === 0 || index === 7 ? <>{index === 0 ? `~${item}억` : `${item}억~`}</> : `${item}억`}
                </Typography>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View style={{width:'100%', alignItems:'flex-end'}}>
        <Typography fontSize={12} color='#8B8B8B'>* 원하시는 금액대를 선택하거나, 입력해주세요.</Typography>
      </View>
      
    </View>
  );
}

const TabScreenStyle = StyleSheet.create({ 
  textInput : {
    width: 130,
    height: 48,
    borderWidth:1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    padding:5
  },
  box : {
    alignItems:'center', 
    paddingHorizontal: 5, 
    paddingVertical:10,
    borderWidth:1, 
    borderColor:'#DFDFDF', 
    borderRadius:5, 
    marginVertical:5
  },
  selectedbox : {
    alignItems:'center', 
    paddingHorizontal: 5, 
    paddingVertical:10,
    borderWidth:1, 
    borderColor:'#E8726E', 
    borderRadius:5, 
    marginVertical:5
  },
})
  
// TabScreen2 -------------------------------------------------------------------------------------

export function TabScreen2(props: any) {

  const pyengs = ["전체", "20", "20", "30", "40", "50", "60", "70"]
  const [pyengLow, setPyengLow] = useRecoilState(recoilPyengLow);
  const [pyengHigh, setPyengHigh] = useRecoilState(recoilPyengHigh);
  const [pyengFirstButton, setPyengFirstButton] = useRecoilState(recoilPyengFirstButton);
  const [selectedButtonNum, setSelectedButtonNum] = useRecoilState<number>(recoilSelectedPyengButtonNum);
  const [allSelectPyeng, setAllSelectPyeng] = useRecoilState<boolean>(recoilAllSelectPyeng);
  const [selectedMin, setSelectedMin] = useRecoilState<number>(recoilSelectedPyengMin);
  const [selectedMax, setSelectedMax] = useRecoilState<number>(recoilSelectedPyengMax);
  
  const statesReset = () => {
    setPyengLow('');
    setPyengHigh('');
    setPyengFirstButton('');
    setSelectedButtonNum(0);
    setSelectedMin(0);
    setSelectedMax(0);
  }


  useEffect(() => {
    if (props.pyengReset === 'reset') {
      statesReset();
    }
  }, [props.pyengReset]);

  const changeTabNames = (minCopy:string, maxCopy:string, index:number) => {
    const tabNames = [...props.isTabNames];
    tabNames[1] = true;
    props.setIsTabNames(tabNames);
    const copy = [...props.tabNames]
    if (minCopy === maxCopy) {
      if (index === 7 ) {
        copy[1] = `${maxCopy}평~`;
        props.setTabNames(copy);
      } else if (index === 0 ) {
        copy[1] = `전체`;
        props.setTabNames(copy);
      } else if (index === 1 ) {
        copy[1] = `~${maxCopy}평`;
        props.setTabNames(copy);
      } else {
        copy[1] = `${maxCopy}평~${parseInt(maxCopy)+9}평`;
        props.setTabNames(copy);
      }
    } else if (index === 0) {
      copy[1] = `전체`;
      props.setTabNames(copy);
    } else {
      copy[1] = `${minCopy}평~${maxCopy}평`;
      props.setTabNames(copy);
    }
  }

  console.log(selectedButtonNum);

  return (
    <View style={{padding:10}}>
      <View style={{width:'100%', alignItems:'center'}}>
        {
          pyengLow === '' && pyengHigh === ''
          ?
          <Typography fontSize={18} color='#C1C1C1'>평형</Typography>
          :
          <>
            {
              allSelectPyeng
              ? <Typography fontSize={18} color='#1B1B1B'>전체</Typography>
              : 
              <Typography>
                { selectedMin === 8 && selectedMax === 8 && `${pyengLow}평 이상 ~`}
                { selectedMin === 1 && selectedMax === 8 &&  `전체`}
                { selectedMin === selectedMax && selectedMax === 2 && selectedButtonNum === 1 && `~ ${pyengHigh}평 이하`}
                { selectedMin === selectedMax && selectedMax !== 2 && selectedMax !== 8 && selectedButtonNum === 1 && `${pyengHigh}평~${parseInt(pyengHigh)+9}평`}
                { (selectedMin !== 1 || selectedMax !== 1) && (selectedMin !== 8 || selectedMax !== 8) &&
                  (selectedMin !== 1 || selectedMax !== 8) && selectedButtonNum > 1 && `${pyengLow}평대 ~ ${parseInt(pyengHigh)+9}평대` }
              </Typography>
            }
          </>
        }
      </View>
      <View style={{flexDirection:'row', width:'100%', height:120, justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          pyengs.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index} 
                style={[
                  (index+1 >= selectedMin && index+1 <= selectedMax)
                  ? TabScreenStyle.selectedbox : TabScreenStyle.box
                  , {width:'22%'}
                ]}
                onPress={()=>{
                   // 선택한 버튼을 눌렀을 때 공통
                   setSelectedButtonNum(selectedButtonNum+1);
               
                  if ( index === 0 ) {
                    if (!allSelectPyeng) {
                      setSelectedMin(1);
                      setSelectedMax(8);
                      setPyengHigh('1')
                      setPyengLow('1')
                      setAllSelectPyeng(true);
                      changeTabNames(item, item, index);
                    } else {
                      setSelectedMin(0);
                      setSelectedMax(0);
                      setPyengHigh('')
                      setPyengLow('')
                      setSelectedButtonNum(0);
                      setAllSelectPyeng(false);
                      props.setIsTabNames([false, false, false]);
                    }
                  } else {
                    if (selectedButtonNum === 0) {
                      props.setPyengReset(item);
                      setPyengHigh(item);
                      setSelectedMin(index+1);
                      setSelectedMax(index+1);
                      setPyengFirstButton(item)
                      changeTabNames(item, item, index);
                      if (index === 1) {
                        setPyengHigh(' '); 
                        setPyengHigh('20'); 
                        props.handlePyengFilterLower(item);
                      } else if (index === 7) {
                        setPyengLow('70'); 
                        setPyengHigh(' '); 
                        props.handlePyengFilterHigher(item);
                      } else {
                        props.handlePyengFilterSingle(item)
                      }
                    } else {
                      if (index+1 === selectedMin || index+1 === selectedMax) {
                        // 이미 선택한 범위를 다시 눌렀을 경우, 초기화
                        statesReset();
                        props.setPyengReset('reset');
                        props.handlePyengFilterAll();
                        tabNamesReset(props, 1, '평형')
                      } else {
                        if (index === 1) {
                          setSelectedButtonNum(1);
                          setPyengHigh(item);
                          setSelectedMin(index+1);
                          setSelectedMax(index+1);
                          setPyengFirstButton(item)
                          setPyengLow(' ');
                          setPyengHigh('20');
                          props.setPyengReset(item);
                          props.handlePyengFilterHigher(item);
                          changeTabNames(item, item, index);
                        }  else if (index === 7) {
                          setSelectedButtonNum(1);
                          setPyengHigh(item);
                          setSelectedMin(index+1);
                          setSelectedMax(index+1);
                          setPyengFirstButton(item)
                          setPyengLow('70'); 
                          setPyengHigh(' '); 
                          props.setPyengReset(item);
                          props.handlePyengFilterHigher(item);
                          changeTabNames(item, item, index);
                        } else {
                            if (index+1 > selectedMin) {
                              // 이전 선택값보다 큰 값을 선택할때
                              setPyengLow(pyengFirstButton);
                              setPyengHigh(item);
                              setSelectedMax(index+1);
                              props.handlePyengFilterDouble(pyengFirstButton, item);
                              changeTabNames(pyengFirstButton, item, index);
                            } 
                            if (index+1 < selectedMax) {
                              // 이전 선택값보다 작은 값을 선택할때
                              setPyengHigh(pyengFirstButton+9);
                              setPyengLow(item);
                              setSelectedMin(index);
                              props.handlePyengFilterDouble(item, pyengFirstButton);
                              changeTabNames(item, pyengFirstButton, index);
                            } 
                            if (selectedButtonNum === 2 || (selectedMin === 1 && selectedMax === 8)) {
                              // 2개 이상 (전체 포함) 선택되어 있을때
                              if (selectedMin <= index+1 && index+1 <= selectedMax ) {
                                props.setPyengReset(item);
                                setPyengHigh(item);
                                setSelectedMin(index+1);
                                setSelectedMax(index+1);
                                setPyengFirstButton(item)
                                changeTabNames(item, item, index);
                                if (index === 1) {
                                  setPyengHigh(' '); 
                                  setPyengHigh('20'); 
                                  props.handlePyengFilterLower(item);
                                } else if (index === 7) {
                                  setPyengLow('70'); 
                                  setPyengHigh(' '); 
                                  props.handlePyengFilterHigher(item);
                                } else {
                                  props.handlePyengFilterSingle(item)
                                }
                              }
                            }
                          }
                      }
                    }
                  }
                }}
              >
                <Typography fontSize={14} color={index+1 >= selectedMin && index+1 <= selectedMax ?  '#E8726E' : '#1B1B1B'}>
                  {index === 0 || index === 7 ? <>{index === 0 ? item : `${item}평~`}</> : <>{index === 1 ? `~${item}평` : `${item}평대`}</>}
                </Typography>
              </TouchableOpacity>
            )
          })
        }
      </View>

    </View>
  );
}


// TabScreen3 -------------------------------------------------------------------------------------

export function TabScreen3(props : any) {
  
  const houseHolds = ["전체", "100", "100", "300", "500", "700", "1000", "2000"]
  const [houseHoldsLow, setHouseHoldsLow] = useRecoilState(recoilHouseHoldsLow);
  const [houseHoldsHigh, setHouseHoldsHigh] = useRecoilState(recoilHouseHoldsHigh);
  const [houseHoldsFirstButton, setHouseHoldsFirstButton] = useRecoilState(recoilHouseHoldsFirstButton);
  const [selectedButtonNum, setSelectedButtonNum] = useRecoilState<number>(recoilSelectedHouseHoldsButtonNum);
  const [allSelectHouseHolds, setAllSelectHouseHolds] = useRecoilState<boolean>(recoilAllSelectHouseHolds);
  const [selectedMin, setSelectedMin] = useRecoilState<number>(recoilSelectedHouseHoldsMin);
  const [selectedMax, setSelectedMax] = useRecoilState<number>(recoilSelectedHouseHoldsMax);
  
  useEffect(() => {
    if (props.houseHoldsReset === 'reset') {
      setHouseHoldsLow('');
      setHouseHoldsHigh('');
      setHouseHoldsFirstButton('');
      setAllSelectHouseHolds(false);
      setSelectedButtonNum(0);
      setSelectedMin(0);
      setSelectedMax(0);
    }
  }, [props.houseHoldsReset]);

  const changeTabNames = (minCopy:string, maxCopy:string, index:number) => {
    const tabNames = [...props.isTabNames];
    tabNames[2] = true;
    props.setIsTabNames(tabNames);
    const copy = [...props.tabNames]

    console.log(index, maxCopy, minCopy);
    
    if (minCopy === maxCopy) {
      if (index === 0 ) {
        copy[2] = `전체`;
        props.setTabNames(copy);
      } else if (index === 1 ) {
        copy[2] = `~${maxCopy}세대`;
        props.setTabNames(copy);
      } else {
        copy[2] = `${maxCopy}세대 이상~`;
        props.setTabNames(copy);
      }
    } else if (index === 0) {
      copy[2] = `전체`;
      props.setTabNames(copy);
    } else {
      copy[2] = `${minCopy}세대~${maxCopy}세대`;
      props.setTabNames(copy);
    }
  }

  return (
    <View style={{padding:10}}>
      <View style={{width:'100%', alignItems:'center'}}>
        {
          houseHoldsLow === '' && houseHoldsHigh === ''
          ?
          <Typography fontSize={18} color='#C1C1C1'>세대수</Typography>
          :
          <>
            {
              allSelectHouseHolds
              ? <Typography fontSize={18} color='#1B1B1B'>전체</Typography>
              : 
              <Typography>
                { selectedMin === 1 && selectedMax === 8 &&  `전체`}
                { selectedMin === selectedMax && selectedMax === 2 && selectedButtonNum === 1 && `~ ${houseHoldsHigh}세대 이하`}
                { selectedMax !== 2 && selectedButtonNum !== 0 && `${houseHoldsLow}세대 이상~`}
              </Typography>
            }
          </>
        }
      </View>
      <View style={{flexDirection:'row', width:'100%', height:120, justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          houseHolds.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index} 
                style={[
                  (index+1 >= selectedMin && index+1 <= selectedMax)
                  ? TabScreenStyle.selectedbox : TabScreenStyle.box
                  , {width:'22%'}
                ]}
                onPress={()=>{
                   // 선택한 버튼을 눌렀을 때 공통
                   setSelectedButtonNum(selectedButtonNum+1);
               
                  if ( index === 0 ) {
                    if (!allSelectHouseHolds) {
                      setSelectedMin(1);
                      setSelectedMax(8);
                      setHouseHoldsHigh('1')
                      setHouseHoldsLow('1')
                      setAllSelectHouseHolds(true);
                      changeTabNames(item, item, index);
                      props.handleHouseHoldsFilterAll();
                    } else {
                      setSelectedMin(0);
                      setSelectedMax(0);
                      setHouseHoldsHigh('')
                      setHouseHoldsLow('')
                      setSelectedButtonNum(0);
                      setAllSelectHouseHolds(false);
                      tabNamesReset(props, 2, '세대수')
                    }
                  } else {
                    if (selectedButtonNum > 0) {
                      
                      if (index+1 === selectedMin && index+1 === selectedMax) {
                        // 이미 선택한 범위를 다시 눌렀을 경우, 초기화
                        setSelectedMin(0);
                        setSelectedMax(0);
                        setHouseHoldsLow('');
                        setHouseHoldsHigh('');
                        setSelectedButtonNum(0);
                        props.setHouseHoldsReset('reset');
                        props.handleHouseHoldsFilterAll();
                        const tabNames = [...props.isTabNames];
                        tabNames[2] = false;
                        props.setIsTabNames(tabNames);
                        const copy = [...props.tabNames]
                        copy[2] = '세대수'
                        props.setTabNames(copy);
                      } 
                      if (selectedMin === 2 && selectedMax === 2 && index+1 !== 2) {
                        props.setHouseHoldsReset(item);
                        setHouseHoldsLow(item);
                        setSelectedMin(index+1);
                        setSelectedMax(8);
                        setHouseHoldsFirstButton(item)
                        props.handleHouseHoldsFilterSingle(item)
                        changeTabNames(item, item, index);
                      }
                      if (selectedMin > 2 && selectedMax === 8) {
                        if (index === 1) {
                          props.setHouseHoldsReset(item);
                          setHouseHoldsLow(item);
                          setSelectedMin(index+1);
                          setHouseHoldsFirstButton(item)
                          setHouseHoldsLow(' '); 
                          setHouseHoldsHigh('100'); 
                          setSelectedMax(index+1);
                          setSelectedButtonNum(1);
                          props.handleHouseHoldsFilterLower(item);
                          changeTabNames(item, item, index);
                        } else {
                          props.setHouseHoldsReset(item);
                          setHouseHoldsLow(item);
                          setSelectedMin(index+1);
                          setSelectedMax(8);
                          setHouseHoldsFirstButton(item)
                          props.handleHouseHoldsFilterSingle(item)
                          changeTabNames(item, item, index);
                        }
                      }
                    } else {
                      props.setHouseHoldsReset(item);
                      setHouseHoldsLow(item);
                      setSelectedMin(index+1);
                      setHouseHoldsFirstButton(item)
                      if (index === 1) { 
                        setHouseHoldsLow(' '); 
                        setHouseHoldsHigh('100'); 
                        setSelectedMax(index+1);
                        props.handleHouseHoldsFilterLower(item);
                      } else {
                        setSelectedMax(8);
                        props.handleHouseHoldsFilterSingle(item)
                      }
                      changeTabNames(item, item, index);
                    }
                  }
                }}
              >
                <Typography fontSize={13} color={index+1 >= selectedMin && index+1 <= selectedMax ?  '#E8726E' : '#1B1B1B'}>
                  {index === 0 || index === 1 ? <>{index === 0 ? item : `~${item}세대`}</> : `${item}세대~`}
                </Typography>
              </TouchableOpacity>
            )
          })
        }
      </View>

    </View>
  );
}



const styles = StyleSheet.create({ 
  container: {
    position:'absolute',
    bottom: 0,
    width:'100%',
    alignItems:'center',
  },
  section : {
    padding:20,
  },
  tabBar: {
    paddingHorizontal:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    width:70,
    padding: 10,
    alignItems:'center'
  },
  bottomButtonBox : {
    padding: 20,
    width: '100%', 
    backgroundColor: '#fff', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
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
