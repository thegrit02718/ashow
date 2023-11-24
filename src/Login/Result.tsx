import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Agree (props : any) {
  
  const moveHome = () => {
    props.navigation.replace('Navi_Main');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <View style={styles.centerContent}>
            <Image
            source={require('../images/login/result.png')}
            style={styles.image}
            />
            <View style={styles.bottomTextBox}>
              <Text style={styles.topText}>{props.route.params.nickName}님, 반가워요!</Text>
              <Text style={styles.bottomText}>
                회원가입이 모두 완료되었어요.{"\n"}
                <Text style={styles.boldText}>다양한 혜택</Text>과{" "}
                <Text style={styles.boldText}>부동산 정보</Text>를 확인하고
                {"\n"}아파트를 쇼핑해 보세요!
              </Text>
            </View>
        </View>
      </View>
      <TouchableOpacity 
          onPress={moveHome} 
          style={styles.nextBtnBox}>
          <Text style={styles.nextBtnText}>아쇼 시작하기</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    marginTop: getStatusBarHeight(),
    backgroundColor:'#fff'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  centerContent: {
    alignItems: 'center',
    top: '20%',
  },
  image: {
    width: 236,
    height: 236,
  },
  bottomTextBox: {
    marginTop: 20,
    alignItems: 'center'
  },
  bottomText: {
    marginTop: 20,
    lineHeight: 25,
    textAlign: 'center'
  },
  topText: {
    fontSize: 24,
    fontWeight: '600',
  },
  boldText: {
    fontWeight: '600',
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },  
  nextBtnBox: {
    backgroundColor: '#E8726E',
    borderRadius: 16,
    width: '100%',
    marginBottom: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

