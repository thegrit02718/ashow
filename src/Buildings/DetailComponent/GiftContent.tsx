import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Modal  } from 'react-native';
import { Typography } from '../../Components/Typography';

export default function GiftContent(props: any) {
    return (
        <View>
            <View style={styles.sectionTitle}>
              <Image source={require('../../images/buildings/titleImage3.png')} style={styles.sectionTitleImage}/>
            <Typography fontSize={20}>혜택 모아보기</Typography>  
          </View>
          <View style={styles.giftContentBox}>
            <View style={styles.giftContentImage}>
              <Image source={require('../../images/buildings/giftImage1.png')} style={{width: '100%', height: '100%'}} />
              <View style={styles.giftContentText}><Typography >1</Typography></View>
            </View>
            <View>
              <Typography >분양가 할인 17~25%</Typography>
              <Typography fontSize={12}>최저 1,234만원에서 최대 4,321만원 할인 기회!</Typography>
            </View>
          </View>
          <View style={styles.giftContentBox}>
            <View style={styles.giftContentImage}>
              <Image source={require('../../images/buildings/giftImage2.png')} style={{width: '100%', height: '100%'}} />
              <View style={styles.giftContentText}><Typography >2</Typography></View>
            </View>
            <View>
              <Typography >계약금 1,000만원</Typography>
              <Typography fontSize={12}>계약금 1,000만원으로 부담없이 빠른 진행!</Typography>
            </View>
          </View>
          <View style={styles.giftContentBox}>
            <View style={styles.giftContentImage}>
              <Image source={require('../../images/buildings/giftImage3.png')} style={{width: '100%', height: '100%'}} />
              <View style={styles.giftContentText}><Typography >3</Typography></View>
            </View>
            <View>
              <Typography >즉시 입주 가능</Typography>
              <Typography fontSize={12}>내가 살집 직접 보고 즉시 입주 가능한 아파트</Typography>
            </View>
          </View>
          <View style={styles.giftContentBox2}>
            <View>
              <Typography color='#E5625D' marginBottom={8}>아쇼특별혜택</Typography>
              <Typography marginBottom={4}>백화점 상품권 100만원 증정</Typography>
              <Typography fontSize={12}>같은 아파트를 사더라도 더 현명하게 구입하자!</Typography>
            </View>
            <View style={{width: 60, height: 50}}>
              <Image source={require('../../images/buildings/giftImage4.png')} style={{width: '100%', height: '100%'}} />
            </View>
          </View>
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginVertical: 10
  },
  sectionTitleImage : {
    width: 24, 
    height: 16,
    marginRight: 10
  },
  textBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  giftContentBox: {
    height: 90,
    padding: 18,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#DFDFDF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  giftContentImage : {
    marginRight: 18,
    width: 45,
    height: 30
  },
  giftContentText : {
    width: 18, 
    height: 20, 
    position: 'absolute', 
    top: -10, 
    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  giftContentBox2: {
    padding: 18,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ED9390',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
});
