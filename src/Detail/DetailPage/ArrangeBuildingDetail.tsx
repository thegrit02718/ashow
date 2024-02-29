import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import WebView from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Typography } from '../../Components/Typography';
import { useRoute } from '@react-navigation/native';
import MainImageURL from '../../../MainImageURL';
import { SubTitle } from '../../Components/SubTitle';
import PyengColorBox from '../DetailComponent/PyengColorBox';
import Loading from '../../Loading';


export default function ArrangeBuildingDetail (props : any) {

  const [loading, setLoading] = useState<boolean>(true);

  const route : any = useRoute();

  // 평형 선택 모달
  const [arrangeHouseModalVisible, setArrangeHouseModalVisible] = useState(false);
  const arrangeHouseToggleModal = () => {
    setArrangeHouseModalVisible(!arrangeHouseModalVisible);
  };

  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    }, 500);  
  }, []);
  

  return (
    loading 
    ? 
    <Loading />
    :
    <View style={styles.container}>

      <View style={styles.section}>
        <SubTitle title='단지배치도' navigation={props.navigation}/>
      </View>
      <View style={styles.section}>
        <PyengColorBox pyengInfo={route.params.pyengInfo}/>
        <Typography fontWeightIdx={2} fontSize={12}>이미지를 확대 및 축소하여 <Text style={{fontWeight: 'bold'}}>단지별 평면도</Text>와 <Text style={{fontWeight: 'bold'}}>향</Text>을 자세히 확인해보세요.</Typography>
      </View>

      <View style={{flex:1}}>
        <WebView 
          style={{flex:1, alignItems:'center', justifyContent:'center'}}
          source={{ uri: `${MainImageURL}/appimages/buildings/${route.params.aptKey}/default/detail/arrangebuildings.png`}}
        />

        <View style={{alignItems:'center', position:'absolute', top:10, width: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>북</Typography>
          </View>
        </View>
        <View style={{justifyContent:'center', position:'absolute', left:10, height: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>서</Typography>
          </View>
        </View>
        <View style={{justifyContent:'center', position:'absolute', right:10, height: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>동</Typography>
          </View>
        </View>
        <View style={{alignItems:'center', position:'absolute', bottom:10, width: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>남</Typography>
          </View>
        </View>
        <TouchableOpacity 
          onPress={arrangeHouseToggleModal}
          style={{position:'absolute', right:10, top:10}}
        >
          <View style={{padding:10, backgroundColor:'#fff', borderRadius:10, flexDirection:'row'}}>
            <EvilIcons name='image' size={20} style={{marginRight:5}}/>
            <Typography fontSize={14} fontWeightIdx={2}>동호수 배치도</Typography>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={arrangeHouseModalVisible}
        onRequestClose={arrangeHouseToggleModal}
      >
       <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{width:'90%', height:450, backgroundColor:'#fff', borderRadius:10, paddingVertical:20}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
              <Typography fontSize={20}>동호수 배치도</Typography>
              <TouchableOpacity 
                onPress={arrangeHouseToggleModal}
              >
                <AntDesign name='close' size={30} />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:20, marginBottom:20}}>
              <Typography fontSize={12} fontWeightIdx={2}>이미지를 확대 및 축소하여 동호수 배치를 확인해보세요.</Typography>
            </View>

            <WebView 
              style={{flex:1, alignItems:'center', justifyContent:'center'}}
              source={{ uri: `${MainImageURL}/appimages/buildings/${route.params.aptKey}/detail/arrangehouse.png` }}
            />
          </View>
       </View>
      </Modal>

      <View style={arrangeHouseModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    </View>
  )
    
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section : {
    
    
  },
  directButton : {
    width: 46, 
    height: 40, 
    backgroundColor: '#1B1B1B', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 10
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8,
    zIndex: 1
  },
})