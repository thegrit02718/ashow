import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
import MainURL from '../../MainURL';
import AsyncGetItem from '../AsyncGetItem'
 
function DeleteAccount (props: any) {

  const [check, setCheck] = useState<boolean>(false);

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    asyncFetchData();
  }, [])

  const handelCheck = () => {
    setCheck(!check);
  };

  const handelAction = () => {
    Alert.alert('정말 탈퇴 하시겠습니까?', '탈퇴 시 유의사항을 충분히 확인하시기 바랍니다.', [
      { text: '취소', onPress: () => props.navigation.pop() },
      { text: '탈퇴', onPress: () => deleteAccount() }
    ]);
  };

  const deleteAccount = async () => {
    axios
      .post(`${MainURL}/login/deleteaccount`, {
        userAccount: asyncGetData.userAccount, userNickName: asyncGetData.userNickName
      })
      .then((res) => {
        if (res.data === true) {
          Alert.alert('탈퇴 되었습니다.');
          handleLogout();
          props.navigation.replace("Navi_Login");
        } else {
          Alert.alert('다시 시도해주세요.');
          props.navigation.replace("Navi_Login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('school');
    AsyncStorage.removeItem('schNum');
    AsyncStorage.removeItem('part');
    AsyncStorage.removeItem('URL');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>탈퇴시 모든 정보가 사라지며, 복구할 수 없습니다.</Text>  
      </View> 

      <View style={styles.noticeContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="warning" size={20} color="red" />
          <Text style={styles.noticeTitle}> 유의 사항 안내</Text>
        </View>
        
        <View style={styles.noticeBox}>
          <View style={styles.noticeTextBox}>
            <Text style={styles.noticeText}>1. 회원 탈퇴 시, 즉시 탈퇴 처리되며, 서비스 이용이 불가합니다. </Text>
            <Text style={styles.noticeText}>2. 기존에 작성한 게시물 및 댓글은 자동으로 삭제되지 않습니다. 
              또한 탈퇴 이후에는 작성자 본인을 확인할 수 없으므로, 삭제 처리도 불가합니다.</Text>
              <Text style={styles.noticeText}>3. 회원 정보는 탈퇴 즉시 삭제되지만, 부정 이용 거래 방지 및 전자상거래법 등
              관련 법령에 따라, 보관이 필요할 경우 해당 기간 동안 회원 정보가 보관 될 수 있습니다.</Text>
          </View>

          <View style={styles.checkButtonBox}>
            <TouchableOpacity
              hitSlop={{ top: 15, bottom: 15 }}
              style={styles.checkButton}
              onPress={handelCheck}
            >
              {
                check ? <AntDesign name="checkcircle" size={20} color="red" />
               : <AntDesign name="checkcircleo" size={20} color="black" />
              }
            </TouchableOpacity> 
            <Text style={styles.checkButtonText}> 위 유의사항을 확인하였습니다.</Text>
          </View>

          <View style={styles.actionButtonBox}>
              <TouchableOpacity 
              style={[styles.actionButton, check ? { backgroundColor : 'red' } : { backgroundColor : 'gray' }]} 
              onPress={handelAction}
              >
              <Text style={styles.actionButtonText}>회원 탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  noticeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noticeBox: {
    alignItems: 'center',
    marginTop: 10,
  },
  noticeTextBox: {
    marginVertical: 15
  },
  noticeText: {
    fontSize: 16,
    marginTop: 10,
  },
  checkButtonBox: {
    height: 100,
    alignItems: 'center',
    flexDirection: 'row'
  },
  checkButton: {

  },
  checkButtonText: {
    fontSize: 20
  },
  handleButtonBox : {

  },
  actionButtonBox: {
    width: 300,
    justifyContent: 'center',
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
})  