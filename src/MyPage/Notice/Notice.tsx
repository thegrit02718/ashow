import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import MainURL from "../../../MainURL";
import dayjs from 'dayjs';
import { Typography } from '../../Components/Typography';
import Feather from 'react-native-vector-icons/Feather';
import { instance } from '../../api/baseApi';
import Layout from '../../Components/Layout';


interface NoticeProps{
  date: string;
  title: string;
  postId: number;
}

interface ItemProps{
  date: string;
  title: string;
  onPress: () => void;
  isLastItem: boolean;
}

const Stack = createNativeStackNavigator();

const Item = ({ title, date, onPress, isLastItem }:ItemProps) => {
  const currentDate = new Date();
  const uploadDate = new Date(date);
  const timeDifference = currentDate.getTime() - uploadDate.getTime();
  //업로드 날짜와 현재 날짜를 빼서 차이나는 시간을 구함(새로 업로드 된 글인가를 구분하기 위함)
  const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  // 시간으로 치환 
  const formattedDate = dayjs(date).format('YYYY.MM.DD');
  // 전달받은 Date속성을 xxxx.xx.xx로 변환
 
  return (
  <TouchableOpacity
    style={[styles.item,!isLastItem ? {borderBottomWidth:1} : {}]}
    onPress={onPress}
  >
    <View>
      <View style={{flexDirection:"row",alignItems:"center"}}>
        {dayDifference < 5 && <Image style={styles.badge} source={require('../../images/mypage/new_badge.png')} />} 
        <Text style={styles.noticeTitle}ellipsizeMode='tail'>{title}</Text>
      </View> 
      <View style={styles.dateContainer}>
        <Typography fontSize={12} color='#8C8C8C' fontWeight='normal'>{formattedDate}</Typography>
      </View>
    </View>
  </TouchableOpacity> 
  )
};


 
const Notice = (props: any) => {
  const dummyData = [
    {
      date: "2023-11-16T00:40:18.579Z",
      title: "아쇼 신규 업데이트 안내",
      postId: 1,
    },
    {
      date: "2023-11-15T00:40:18.579Z",
      title: "위치기반서비스 이용약관 개정 안내",
      postId: 2,
    },
    {
      date:"2023-11-15T00:40:18.579Z",
      title: "개인정보처리방침 개정 안내",
      postId: 3,
    },
    {
      date:"2023-11-15T00:40:18.579Z",
      title: "개인정보처리방침 개정 안내",
      postId: 3,
    },
    {
      date:"2023-11-14T00:40:18.579Z",
      title: "신규 서비스 오픈 안내",
      postId: 3,
    },
    {
      date:"2023-11-12T00:40:18.579Z",
      title: "[긴급공지] 카카오 로그인 방식 장애 안내",
      postId: 3,
    },
    {
      date:"2023-11-11T00:40:18.579Z",
      title: "서비스 이용 약관 개정 안내",
      postId: 3,
    },
    {
      date:"2023-11-10T00:40:18.579Z",
      title: "시스템 점검 안내",
      postId: 3,
    },
    {
      date:"2023-11-10T00:40:18.579Z",
      title: "12서비스 이용 약관 개정 안내",
      postId: 3,
    },
    {
      date:"2023-11-09T00:40:18.579Z",
      title: "11서비스 이용 약관 개정 안내",
      postId: 3,
    },

  ]
  const [noticeList, setNoticeList] = useState<NoticeProps[]>([]);

  useEffect(() => {
    setNoticeList(dummyData)
  },[])

  const handleItemPress = (postId: number) => {
    console.log('click')
    props.navigation.navigate('NoticeDetail',{postId});

  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <Typography fontSize={28} color='#1B1B1B' marginBottom={24}>공지사항</Typography>
        <FlatList
          data={noticeList}
          renderItem={({ item,index }) => (
            <Item
              title={item.title}
              date={item.date}
              isLastItem={noticeList.length==index+1}
              onPress={() => handleItemPress(item.postId)}
            />
          )}
          keyExtractor={(item,index) => index.toString()}
        />
      </Layout>
    </SafeAreaView>
  );
};

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    paddingBottom:60,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#8C8C8C',
    padding: 16,
    marginVertical: 1,
    borderRadius: 8,
  },
  itemIconContainer: {
    marginRight: 16,
    flexDirection:'row',
    alignItems:"center",
  },
  dateContainer: {
    marginTop:8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  noticeTitle:{
    fontSize: 16,
    color:"#000",
    fontWeight:"500"
  },
  noticeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  badge:{
    width:16,
    height:16,
    marginTop:3,
    marginRight:8,
  }
  
});

export default Notice;
