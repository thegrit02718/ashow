import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput  } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';


export default function BuildinsListFilterModal (props : any) {

  const [currentTab, setCurrentTab] = useState(props.selectTab);
 
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={() => setCurrentTab(tabNum)}
    >
      <Typography fontSize={14} color={currentTab === tabNum ? '#E5625D' : '#8B8B8B'}>{title}</Typography>
      {
        currentTab === tabNum
        ? <View style={{width:40, height:2, backgroundColor:'#E5625D', marginTop:10}}></View>
        : <View style={{width:40, height:2, backgroundColor:'#fff', marginTop:10}}></View>
      }
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={{backgroundColor:'#fff', borderRadius:10, height:500}}>
        {/* 상단 박스 섹션 */}
        <View style={styles.section}>
          <View style={{flexDirection:'row', alignItems: 'center' }}>
            <Typography fontSize={16} color='#6F6F6F'>전체 필터</Typography>
            <TouchableOpacity 
              style={{position:'absolute', right: 0}}
              onPress={()=>{props.buildingListFilterToggleModal()}}
            >
              <View style={{paddingHorizontal:10}}>
                <AntDesign name="close" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.tabBar}>
          <SelectMenu tabNum={1} title='금액대'/>
          <SelectMenu tabNum={2} title='평형'/>
          <SelectMenu tabNum={3} title='세대수'/>
          <SelectMenu tabNum={4} title='혜택'/>
        </View>
        <Divider height={2} marginVertical={5}/>

        <View style={{padding:10}}>
          {currentTab === 1 && <TabScreen1 />}
          {currentTab === 2 && <TabScreen2 />}
          {currentTab === 3 && <TabScreen3 />}
          {currentTab === 4 && <TabScreen4 />}
        </View>

        <Divider height={2}/>

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
            onPress={()=>{props.buildingListFilterToggleModal()}}
          >
            <View style={[styles.bottomButton, {width:250}]}>
              <Typography fontSize={16} color='#FFF'>적용하기</Typography>
            </View>
          </TouchableOpacity>
        </View>
      
      </View>
    </View>
  )
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
    position:'absolute',
    bottom:0, 
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

function TabScreen1(props: any) {

  const [costLow, setCostLow] = useState('');
  const [costHigh, setCostHigh] = useState('');
  const [costSum, setCostSum] = useState('');
  const [selectCostSum, setselectCostSum] = useState(0);

  const costs = ["1억 이하", "2억", "3억", "4억", "5억", "10억", "20억", "30억 이상"]

  return (
    
    <View style={{flex:1, padding:10}}>
      <View style={{width:'100%', alignItems:'center', marginBottom: 20}}>
        {
          costLow === '' && costHigh === '' && costSum === ''
          ?
          <Typography fontSize={18} color='#C1C1C1'>금액대</Typography>
          :
          <Typography fontSize={18} color='#1B1B1B'>
            { costSum !== '' ? costSum : `${costLow}만원 ~ ${costHigh}만원`}
          </Typography>
        }
      </View>

      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TextInput
          style={TabScreenStyle.textInput}
          placeholder="최소"
          placeholderTextColor="gray"
          value={costLow}
          onChangeText={setCostLow}
          textAlign='right'
        />
        <Typography color='#1B1B1B'> ~ </Typography>
        <TextInput
          style={TabScreenStyle.textInput}
          placeholder="최대"
          placeholderTextColor="gray"
          value={costHigh}
          onChangeText={setCostHigh}
          textAlign='right'
          onEndEditing={()=>{
            setCostSum('');
            setselectCostSum(0);
          }}
        />
        <Typography color='#1B1B1B'> 원</Typography>
      </View>
      
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          costs.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index} 
                style={
                  index+1 === selectCostSum 
                  ? TabScreenStyle.selectedbox : TabScreenStyle.box
                }
                onPress={()=>{
                  setCostSum(item);
                  setselectCostSum(index+1);
                }}
              >
                <Typography fontSize={14} color={index+1 === selectCostSum ? '#E8726E' : '#1B1B1B'}>{item}</Typography>
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
    width: 147,
    height: 48,
    borderWidth:1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    padding:5
  },
  box : {
    width:'22%', 
    alignItems:'center', 
    paddingHorizontal: 5, 
    paddingVertical:10,
    borderWidth:1, 
    borderColor:'#DFDFDF', 
    borderRadius:5, 
    marginVertical:5
  },
  selectedbox : {
    width:'22%', 
    alignItems:'center', 
    paddingHorizontal: 5, 
    paddingVertical:10,
    borderWidth:1, 
    borderColor:'#E8726E', 
    borderRadius:5, 
    marginVertical:5
  },
})
  
function TabScreen2() {

  const [pyengLow, setPyengLow] = useState('');
  const [pyengHigh, setPyengHigh] = useState('');
  const [selectPyeng, setSelectPyeng] = useState(0);
  const [allSelectPyeng, setAllSelectPyeng] = useState<boolean>(false);
  const [selectPentHouse, setSelectPentHouse] = useState<boolean>(false);

  const pyengs = ["전체선택", "~20평대", "30평대", "40평대", "50평대", "60평대", "70평 이상", "펜트하우스"]
  
  const allSelectPyengToggle = () => {
    setAllSelectPyeng(!allSelectPyeng);
  }; 

  return (
    <View style={{flex:1, padding:10}}>
      {
        selectPentHouse 
        ?
        <View style={{width:'100%', alignItems:'center'}}>
          <Typography fontSize={18} color='#1B1B1B'>펜트하우스</Typography>
        </View>
        :
        <View style={{width:'100%', alignItems:'center'}}>
          {
            pyengLow === '' && pyengHigh === ''
            ?
            <Typography fontSize={18} color='#C1C1C1'>평형</Typography>
            :
            <Typography fontSize={18} color='#1B1B1B'>{pyengLow} ~ {pyengHigh}</Typography>
          }
        </View>
      } 
      
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          pyengs.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index} 
                style={
                  index + 1 === selectPyeng || allSelectPyeng
                  ? TabScreenStyle.selectedbox
                  : TabScreenStyle.box
                }
                onPress={()=>{
                  if ( index === 0 ) {
                    setSelectPentHouse(false);
                    setPyengLow('');
                    setPyengHigh('');
                    setSelectPyeng(0);
                    allSelectPyengToggle();
                  } else if ( index === 1 ) {
                    setSelectPentHouse(false);
                    setPyengLow('');
                    setPyengHigh('20평');
                    setSelectPyeng(index+1);
                  } else if ( index === 6 ) {
                    setSelectPentHouse(false);
                    setPyengLow('70평');
                    setPyengHigh('');
                    setSelectPyeng(index+1);
                  } else if ( index === 7 ) {
                    setSelectPentHouse(true);
                    setSelectPyeng(index+1);  
                  } else {
                    setSelectPentHouse(false);
                    setPyengLow(`${(index)*10+1}평`);
                    setPyengHigh(`${(index+1)*10}평`);
                    setSelectPyeng(index+1);
                  }
                }}
              >
                <Typography fontSize={14} color={index+1 === selectPyeng ? '#E8726E' : '#1B1B1B'}>{item}</Typography>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  );
}

function TabScreen3() {
  
  const [houseHold, setHouseHold] = useState('');
  const [selectedHouseHold, setSelectedHouseHold] = useState(0);
  const houseHolds = ["100세대 이상", "300세대 이상", "500세대 이상", "700세대 이상", "1,000세대 이상", "2,000세대 이상"]

  return (
    <View style={{flex:1, padding:10}}>
     
      <View style={{width:'100%', alignItems:'center'}}>
        {
          houseHold === ''
          ?
          <Typography fontSize={18} color='#C1C1C1'>세대수</Typography>
          :
          <Typography fontSize={18} color='#1B1B1B'>{houseHold}</Typography>
        }
      </View>
      
      
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          houseHolds.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index} 
                style={
                  index + 1 === selectedHouseHold
                  ? [TabScreenStyle.selectedbox, {width:'30%'}]
                  : [TabScreenStyle.box, {width:'30%'}]
                }
                onPress={()=>{
                  setHouseHold(item);
                  setSelectedHouseHold(index+1);
                }}
              >
                <Typography fontSize={14} color={index+1 === selectedHouseHold ? '#E8726E' : '#1B1B1B'}>{item}</Typography>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  );
}

function TabScreen4() {
  
  const [presents, setPresents] = useState([
    { name : "아쇼 특별혜택", select : false}, 
    { name : "할인 분양", select : false}, 
    { name : "중도금 무이자", select : false}, 
    { name : "즉시 입주", select : false}, 
    { name : "납입금 유예", select : false}, 
    { name : "무상옵션", select : false}
  ]);

  return (
    <View style={{flex:1, padding:10}}>
     
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', flexWrap:'wrap', paddingVertical: 20}}>
        {
          presents.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index} 
                style={
                  item.select
                  ? [TabScreenStyle.selectedbox, {width:'30%'}]
                  : [TabScreenStyle.box, {width:'30%'}]
                }
                onPress={()=>{
                  setPresents((prevPresents) => {
                    const updatedPresents = [...prevPresents];
                    updatedPresents[index].select = !updatedPresents[index].select;
                    return updatedPresents;
                  });
                }}
              >
                <Typography fontSize={14} color={item.select ? '#E8726E' : '#1B1B1B'}>{item.name}</Typography>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View style={{width:'100%', alignItems:'flex-end'}}>
        <Typography fontSize={12} color='#8B8B8B'>* 중복선택이 가능해요.</Typography>
      </View>
    </View>
  );
}

