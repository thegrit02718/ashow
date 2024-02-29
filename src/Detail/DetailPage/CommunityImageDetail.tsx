import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import MainImageURL from '../../../MainImageURL';
import { WebView } from 'react-native-webview';

export default function CommunityImageDetail (props : any) {
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
          <Typography fontSize={16} color='#6F6F6F'>커뮤니티 이미지</Typography>
          <TouchableOpacity
            style={{position:'absolute', left: 0}}
            onPress={noticeToggleModal}
          >
            <View style={{padding:10}}>
              <AntDesign name="questioncircleo" size={14} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{position:'absolute', right: 0}}
            onPress={()=>{props.navigation.goBack();}}
          >
            <View style={{padding:10}}>
              <AntDesign name="close" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:1, height:500}}>
        <WebView 
          style={{flex:1, alignItems:'center', justifyContent:'center'}}
          source={{ uri: `${MainImageURL}/appimages/buildings/${route.params.aptKey}/default/detail/${route.params.imageFiles}` }}
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
          <Typography fontSize={12} marginBottom={10}>・ 이미지는 소비자의 이해를 돕기 위한 것으로 세부계획(가구 및 각종 내부 마감재의 색상, 패턴 등)은 실제와 다를 수 있습니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 명기된 면적의 소수점 이하 숫자는 실제 시공 시 일부 변경될 수 있으며, 견본주택과 달리 평면이 좌우 대칭이 될 수 있습니다.</Typography>
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
