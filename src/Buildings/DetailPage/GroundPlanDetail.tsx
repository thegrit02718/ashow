import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import MainImageURL from '../../../MainImageURL';
import { WebView } from 'react-native-webview';

export default function GroundPlanDetail (props : any) {
  const route : any = useRoute();


  console.log(route.params.data);

  const noticeToggleModal = () => {
    setNoticeModalVisible(!isNoticeModalVisible);
  };
  const [isNoticeModalVisible, setNoticeModalVisible] = useState(false);

  return (
    <View style={styles.container}>
       {/* 상단 박스 섹션 */}
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'center', marginVertical: 10, alignItems: 'center' }}>
          <Typography fontSize={16} color='#6F6F6F'>평면도</Typography>
          <TouchableOpacity
            style={{position:'absolute', left: 0}}
            onPress={noticeToggleModal}
          >
            <View style={{padding:10}}>
              <AntDesign name="questioncircleo" size={14} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{position:'absolute', right: 0}}
            onPress={()=>{props.navigation.goBack();}}
          >
            <View style={{padding:10}}>
              <AntDesign name="close" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:1, height:500}}>
        <WebView 
          style={{flex:1, alignItems:'center', justifyContent:'center'}}
          source={{ uri: `${MainImageURL}/app/images/buildings/apt${route.params.data.aptKey}/groundplandetail77.png` }}
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
          <Typography fontSize={12} marginBottom={10}>・ 평면도는 소비자의 이해를 돕기 위한 것으로 세부계획(가구 및 각종 내부 마감재의 색상, 패턴 등)은 실제와 다를 수 있습니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 명기된 면적의 소수점 이하 숫자는 실제 시공 시 일부 변경될 수 있으며, 견본주택과 달리 평면이 좌우 대칭이 될 수 있습니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 미 건립된 세대에 대한 조명기구 사양, 수량, 용량, 위치는 단위세대 평형, 타입, 아트월 위치 등에 따라 변경됩니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 탈출형 피난 시설은 짝수 층 홀수 층에 따라 위치가 교차되어 시공됩니다.(필로티 상부 세대는 완강기가 추가 설치 됩니다 - 일부세대)</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 세대 내 비내력 벽체는 본 시공 시 현장 여건에 따라 조적 / 골조 / 경량벽 등으로 시공될 수 있습니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 세대 간벽에 공사용 출입구가 설치될 수 있습니다.</Typography>
          <Typography fontSize={12} marginBottom={10}>・ 주방 우물천장은 간접조명과 함께 제공됩니다.</Typography>
        </View>
      </Modal>

      <View style={ isNoticeModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
