import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import MainImageURL from '../../../MainImageURL';
import { WebView } from 'react-native-webview';

export default function GalleryDetail (props : any) {
  const route : any = useRoute();
  
  const noticeToggleModal = () => {
    setNoticeModalVisible(!isNoticeModalVisible);
  };
  const [isNoticeModalVisible, setNoticeModalVisible] = useState(false);

  return (
    <View style={styles.container}>
       {/* 상단 박스 섹션 */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'center', marginVertical: 10, alignItems: 'center' }}>
          <Typography fontSize={16} color='#6F6F6F'>{route.params.image.name_ko}</Typography>
          <TouchableOpacity
            style={{position:'absolute', right: 0}}
            onPress={noticeToggleModal}
          >
            <View style={{padding:10}}>
              <AntDesign name="questioncircleo" size={14} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{position:'absolute', left: 0}}
            onPress={()=>{props.navigation.goBack();}}
          >
            <View style={{padding:10}}>
              <AntDesign name="left" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{backgroundColor:'#F5F4F3', padding:10}}>
          <Typography fontSize={12} color='#555' fontWeightIdx={2}>・ 이미지를 손가락으로 확대하거나, 스와이프하여 확인해보세요! </Typography>
        </View>

      </View>

      <View style={{flex:1, height:500}}>
        <WebView 
          style={{flex:1, alignItems:'center', justifyContent:'center'}}
          source={{ uri: `${MainImageURL}/appimages/buildings/${route.params.aptKey}/default/detail/${route.params.image.name}` }}
        />
      </View>     

      <Modal
        animationType="slide"
        transparent={true}
        visible={isNoticeModalVisible}
        onRequestClose={noticeToggleModal}
      >
        <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', 
                      padding: 20}}>
          <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 20, alignItems: 'center' }}>
            <Typography fontSize={16}>유의사항</Typography>
            <TouchableOpacity 
               style={{position:'absolute', right: 0}}
              onPress={noticeToggleModal}
            >
              <View style={{padding:10}}>
                <AntDesign name="close" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>                 
          <Typography fontSize={12} marginBottom={10}>・ 본 이미지는 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있으며, 건축물의 외관 및  색채계획, 조정 식재 및 시설물 등의 기타 시설은 추후 변경될 수 있습니다. </Typography>
          <Typography fontSize={12} marginBottom={10}>・ 단지를 제외한 기타 사항(개발계획, 주변 건물 현황, 조명, 외부 식재 등)은 소비자의 이해를 돕기 위한 것으로 실제와 차이가 있을 수 있으니, 견본주택 및 현장을 직접 방문하여 확인하시기 바랍니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 아파트 저층부는 석재, 페인트 등 기타 자재로 마감되고, 주동 형태 및 디자인에 따라 석재 및 기타 자재의 적용 비율은 각 동별로 상이할 수 있으며, 인·허가 및 현장 여건에 의해 조정될 수 있습니다.</Typography>
        </View>
      </Modal>

      <View style={ isNoticeModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section : {
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8
  },
});
