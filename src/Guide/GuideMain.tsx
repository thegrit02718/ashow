import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '../Components/Typography';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Divider } from '../Components/Divider';

function GuideMain (props : any) {
  
  const [propertyNewsContents, setPropertyNewsContents] = useState<any>([]);
  const [financeNewsContents, setFinanceNewsContents] = useState<any>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/guide/getnews`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      const propertyNews = copy.filter((e:any) => e.sort === '부동산');
      const financeNews = copy.filter((e:any) => e.sort === '금융');
      setPropertyNewsContents(propertyNews);
      setFinanceNewsContents (financeNews);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

  function NewsHomeScreen (props: any) {

    return (
      <View style={styles.container}>
        
        <View style={styles.section}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:10, paddingTop:10}}>
            <Typography fontSize={24}>{props.title}</Typography>
            <TouchableOpacity
              onPress={()=>{
                props.navigation.navigate("NewsList", { title: props.title, data: props.newsContents });
              }}
            >
              <AntDesign size={20} name='right'/>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          {props.newsContents.slice(0, 3).map((item:any, index:any) => (
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
        </View>
      </View>
    );
  }
 

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
         
        <View style={styles.section}>
          <Typography fontSize={24}>분양가이드</Typography>
        </View>

        <TouchableOpacity
          onPress={()=>{
            props.navigation.navigate('GuideDetail');
          }}
        >
          <View style={{height:300, backgroundColor:'#EAEAEA'}}>
            <View style={{position:'absolute', bottom:30, left:20}}>
              <Typography fontSize={24}>아쇼로 쉽고, 편하게</Typography>
              <Typography fontSize={24}>좋은 아파트 고르는 방법</Typography>
            </View>
            <View style={{position:'absolute', bottom:32, right:30}}>
              <AntDesign size={20} name='right'/>
            </View>
          </View>
        </TouchableOpacity>

        <NewsHomeScreen newsContents={propertyNewsContents} title='부동산 뉴스' navigation={props.navigation}/>

        <Divider height={5} marginVertical={10}/>

        <NewsHomeScreen newsContents={financeNewsContents} title='금융 뉴스' navigation={props.navigation}/>
        

      </ScrollView>
    </View> 
   );
}
export default GuideMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  section : {
    padding: 20
  },
  imgbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    flex: 1,
    width: '100%',
    height: 1500,
    resizeMode: 'contain'
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
    resizeMode:'cover'
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

