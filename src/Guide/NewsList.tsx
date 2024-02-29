import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Button } from 'react-native';
import { SubTitle } from '../Components/SubTitle';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import { useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown'
import {format, addMonths} from 'date-fns';
import {ko} from 'date-fns/locale';

interface NewListProps {
  title: string;
  date: string;
  media: string;
  image: string;
}

const NewList: React.FC<NewListProps> = ({ title, date, media, image }) => (
  <View style={styles.newsList}>
    <View style={styles.newsTextBox}>
      <Typography marginBottom={5}>{title}</Typography>
      <Typography fontSize={12} color={'#8C8C8C'}>{date} | {media}</Typography>
    </View>
    <View style={styles.newsImageBox}>
      <Image style={styles.newsImage} source={{uri: image}}/>
    </View>
  </View>
);

export default function NewsList (props : any) {
  
  const route : any = useRoute();
  const routeData = route.params.data;
  const [newsContents, setNewsContents] = useState(route.params.data);

  // 무한 스크롤로 데이터 더 보기 기능
  const [postListNum, setPostListNum] = useState<number>(7);
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setPostListNum(postListNum + 7);
    }
  };

  // date-fns
  const getDateRange = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 12; i++) {
      const date = addMonths(today, -i);
      const formattedDate = format(date, `yy년 MM월`, { locale: ko });
      dates.push(formattedDate);
    }
    return dates;
  };
  const dateOptions = getDateRange();

  const handleDateChange = (selectedDate : any) => {
    console.log(selectedDate);
    const copy = routeData.filter((e:any)=> e.month === selectedDate);
    setNewsContents(copy);
  };
  
  return (
    <View style={styles.container}>

      <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
        <TouchableOpacity
          style={{padding:5}}
          onPress={()=>{
            props.navigation.goBack()
          }}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{borderWidth:1, borderRadius:5, borderColor:'#DFDFDF', padding:5, flexDirection:'row', alignItems:'center'}}>
          <Feather size={16} name='calendar' color='#ED9390'/>
          <SelectDropdown
            data={dateOptions}
            onSelect={(selectedItem, index) => {
              handleDateChange(selectedItem);
            }}
            defaultButtonText={dateOptions[0]}
            buttonStyle={{width:90, height:30, backgroundColor:'#fff'}}
            buttonTextStyle={{fontSize:12, fontWeight:'bold'}}
            dropdownStyle={{width:100, borderRadius:10}}
            rowStyle={{ width:100}}
            rowTextStyle={{fontSize:12, fontWeight:'bold'}}
          />
        </View>
      </View>

      <Divider height={2} />
      
      <View style={styles.section}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {newsContents.slice(0,4).map((item:any, index:any) => (
            <View key={index}>
              <TouchableOpacity
                  onPress={()=>{
                    props.navigation.navigate('NewsDetail', {data : item})
                  }}
              >
                  <NewList
                  title={item.title}
                  date={item.date}
                  media={item.media}
                  image={item.image}
                  />
              </TouchableOpacity>
              <Divider height={2}/>
            </View>
        ))}
        <View style={{height:150, backgroundColor:'#EAEAEA', alignItems:'center', justifyContent:'center'}}>
          <Typography>AD | 광고영역</Typography>
        </View>
        {newsContents.slice(4,postListNum).map((item:any, index:any) => (
            <View key={index}>
              <TouchableOpacity
                  onPress={()=>{
                    props.navigation.navigate('NewsDetail', {data : item})
                  }}
              >
                  <NewList
                  title={item.title}
                  date={item.date}
                  media={item.media}
                  image={item.image}
                  />
              </TouchableOpacity>
              <Divider height={2}/>
            </View>
        ))}
        <View style={{marginBottom:50}}></View>
        </ScrollView>
      </View>
      
    </View> 
   );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  section: {
    padding :20
  },
  newsList:{
    flexDirection: 'row',
    padding: 10,
  },
  newsTextBox: {
    flex: 1,
    marginRight: 10
  },
  newsImageBox: {
    width: 80,
    height: 70,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode:'contain'
  },
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});