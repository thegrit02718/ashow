import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import MainURL from '../../../MainURL';
import AsyncGetItem from '../../AsyncGetItem'

function Notification (props : any) {

  const [notifications, setNotifications] = useState<any>([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${MainURL}/notification/notifigetlist`);
      console.log(res.data);
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);


  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = today.getDate();
  const currentDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const todayNotifiCopy = notifications.length > 0 ? notifications.filter((e : any) => e.date === `${currentDate}`) : '';
  const todayNotifi = todayNotifiCopy.length > 0 ? todayNotifiCopy.reverse() : '';
  const lastNotifiCopy = notifications.length > 0 ? notifications.filter((e : any) => e.date !== `${currentDate}`) : '';
  const lastNotifi = lastNotifiCopy.length > 0 ? lastNotifiCopy.reverse() : '';

  return (
    <ScrollView style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20, margin: 15}}>오늘</Text>
      {todayNotifi?.length > 0 ? (
        todayNotifi?.map((item : any, index : any) => (
          <View style={{marginVertical: 15}} key={index}>
            <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
              {
                item.read === true ? <Image source={require('../../images/mypage/alertdefault.png')} style={{marginRight: 10}}/> 
                : <Image source={require('../../images/mypage/alertred.png')} style={{marginRight: 10}}/> 
              }
              <Text style={styles.itemTitle}>{item.notifiTitle}</Text>
            </View>
            
            <View style={item.read === true ? styles.itemTextBoxDefault : styles.itemTextBoxRed }>
              <Text style={item.read === true ? styles.itemTextDefault : styles.itemTextRed}>{item.notifiMessage}</Text>
            </View>
            
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
        ))
      ) : (
        <Text style={{textAlign: 'center', margin: 20}}>오늘의 알림이 없습니다.</Text>
      )}
      <Text style={{fontWeight: 'bold', fontSize: 20, margin: 15}}>지난 알림</Text>
      { lastNotifi?.length > 0 ? (
        lastNotifi.map((item: any, index: any)=>{
          return (
            <View style={{marginVertical: 15}} key={index}>
            <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
              {
                item.read === true ? <Image source={require('../../images/mypage/alertdefault.png')} style={{marginRight: 10}}/> 
                : <Image source={require('../../images/mypage/alertred.png')} style={{marginRight: 10}}/> 
              }
              <Text style={styles.itemTitle}>{item.notifiTitle}</Text>
            </View>
            
            <View style={item.read === true ? styles.itemTextBoxDefault : styles.itemTextBoxRed }>
              <Text style={item.read === true ? styles.itemTextDefault : styles.itemTextRed}>{item.notifiMessage}</Text>
            </View>
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
          )
        })
        ) : (
          <Text style={{textAlign: 'center', margin: 20}}>지난 알림이 없습니다.</Text>
      )}
    </ScrollView> 
   );
}
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B33936'
  },
  itemTextBoxDefault: {
    width: '85%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 30,
  },
  itemTextDefault : {
    lineHeight: 22
  },
  itemTextBoxRed: {
    width: '85%',
    backgroundColor: '#E8726E',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 25,
  },
  itemTextRed : {
    lineHeight: 22,
    color: 'white'
  },
  itemDate: {
    textAlign: 'right',
    fontSize: 14,
    marginRight: 32
  },
});

