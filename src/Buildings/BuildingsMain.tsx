import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import FormatNumber from '../Components/FormatNumber';
import BuildinsListFilterModal from './BuildinsListFilterModal';
import axios from 'axios';
import MainURL from "../../MainURL";
import MainImageURL from '../../MainImageURL';

function BuildingsMain (props : any) {

  // 게시판 글 가져오기
  const [aptlist, setAptlist] = useState<any>([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/buildings/buildings`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setAptlist(copy);
    });
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const [selectTab, setSelectTab] = useState(1);
  const [isBuildingListFilterModalVisible, setBuildingListFilterModalVisible] = useState(false);
  const buildingListFilterToggleModal = () => {
    setBuildingListFilterModalVisible(!isBuildingListFilterModalVisible);
  }; 

  interface SelectMenu {
    title: string;
    select: number;
  }
  
  const SelectMenu: React.FC<SelectMenu> = ({ title, select }) => (
    <TouchableOpacity
      onPress={()=>{
        setSelectTab(select);
        buildingListFilterToggleModal();
      }}
    >
     <View style={styles.topSelectMenu}>
         <Typography fontSize={14}>{title}</Typography>
         <AntDesign name="down" size={14} color="black" style={{marginLeft:5}}/>
     </View>
   </TouchableOpacity>
  );  

  return (
    <View style={styles.container}>
      {/* 상단 타이틀 */}
      <View style={styles.section}>
        <View style={{width:'100%', alignItems:'center'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Typography fontSize={20}>대구 수성구</Typography>
            <AntDesign name="down" size={14} color="black" style={{marginLeft:10}}/>
          </View>
          <Entypo name="magnifying-glass" size={20} color="black" style={{position:'absolute', right:0}}/>
        </View>
      </View>
      <Divider/>
      
      <View style={styles.section}>
        {/* selectMenu */}
        <View style={{flexDirection:'row'}}>
          <SelectMenu title='금액대' select={1}/>
          <SelectMenu title='평형' select={2}/>
          <SelectMenu title='세대수' select={3}/>
          <SelectMenu title='혜택' select={4}/>
        </View>
        
        {/* 매물수 & 정렬버튼 */}
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, paddingHorizontal: 5}}>
          <Typography fontSize={14}>총 {aptlist.length}개의 매물</Typography>
          <TouchableOpacity 
            onPress={()=>{

            }}
          >
            <View style={{flexDirection:'row'}}>
              <Typography fontSize={14}>기본순</Typography>
              <AntDesign name="caretdown" size={14} color="black" style={{marginLeft:5}}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Divider height={8} />
      
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        {
          aptlist.map((item:any, index:any)=>{
            return (
              <TouchableOpacity
                key={index}
                style={{paddingHorizontal: 20, paddingVertical:10}}
                onPress={()=>{
                    props.navigation.navigate('Detail', {data : item})
                }}
              >
                {
                  item.isAshowShopping === 'true' &&
                  <View style={{width:'100%', alignItems:'flex-start'}}>
                    <View style={{width:120, height:30}}>
                      <Image source={require('../images/buildings/ashowShopping.png')} style={styles.image}/>  
                    </View>
                  </View>
                }
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View>
                    <Typography marginBottom={10}>{item.name}</Typography>
                    <Typography marginBottom={10} fontSize={15}>{FormatNumber(item.priceLow)} ~ {FormatNumber(item.priceHigh)}</Typography>
                    <Typography marginBottom={3} fontSize={14} color='#8B8B8B'>{item.addressCity}{item.addressCounty}</Typography>
                    <Typography fontSize={14} color='#8B8B8B'>{item.houseHoldSum} 세대 ・ {item.inDate} 입주</Typography>
                  </View>
                  <View style={styles.imgbox}>
                    <Image source={{uri: `${MainImageURL}/app/images/buildings/apt${item.aptKey}/mainimage.png`}} style={styles.image}/>  
                  </View>
                </View> 
                <View style={{marginBottom:10, flexDirection:'row'}}>
                  {
                    item.discountPer !== 0 &&
                    <View style={{padding:5, backgroundColor:'#FAE0D4', borderRadius:5, marginRight:5 }}>
                      <Typography color='#E0413B' fontSize={12}>{item.discountPer}%할인</Typography>
                    </View>
                  }
                  {
                    item.presentPer !== 0 &&
                    <View style={{padding:5, backgroundColor:'#EAEAEA', borderRadius:5, marginRight:5, flexDirection:'row', alignItems:'center' }}>
                      <View style={{width:10, height:10}}>
                        <Image source={require('../images/buildings/ashowPresentIcon.png')} style={styles.image}/>  
                      </View>
                      <Typography color='#1E3C69' fontSize={12}>분양혜택 총{item.presentPer}개</Typography>
                    </View>
                  }

                </View>
                <Divider height={2}/>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBuildingListFilterModalVisible}
        onRequestClose={buildingListFilterToggleModal}
      >
        <BuildinsListFilterModal 
          buildingListFilterToggleModal={buildingListFilterToggleModal}
          selectTab={selectTab}
        />
      </Modal>

      {/* 모달 백화면 커버창 */}
      <View style={isBuildingListFilterModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

    </View> 
   );
}
export default BuildingsMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
  },
  section: {
    padding:20
  },
  topSelectMenu : {
    height:32, 
    paddingHorizontal:10, 
    flexDirection:'row', 
    borderRadius:20, 
    borderWidth:1, 
    borderColor: '#DFDFDF', 
    alignItems:'center', 
    justifyContent:'center',
    marginHorizontal:3
  },
  imgbox: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  }
  
});

