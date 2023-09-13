import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import AppText from '../../AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialTopTabNavigator();

const newsContents = [
  { id: 1, title: `올해 하반기 집값, '더 떨어진다' 45% ... 상승 전망은 31%`, date: '2023.07.10', author: '디지털 타임스',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 2, title: `100채 이상 임대보증 가입 집주인 35명`, date: '2023.07.10', author: '국민일보',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 3, title: `서울아파트 평균 매매가 13억, 지방의 5배 넘어 ...`, date: '2023.07.10', author: '조선 일보',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 4, title: `올해 하반기 집값, '더 떨어진다' 45% ... 상승 전망은 31%`, date: '2023.07.10', author: '디지털 타임스',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 5, title: `100채 이상 임대보증 가입 집주인 35명`, date: '2023.07.10', author: '국민일보',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 6, title: `서울아파트 평균 매매가 13억, 지방의 5배 넘어 ...`, date: '2023.07.10', author: '조선 일보',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 7, title: `100채 이상 임대보증 가입 집주인 35명`, date: '2023.07.10', author: '국민일보',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
  { id: 8, title: `서울아파트 평균 매매가 13억, 지방의 5배 넘어 ...`, date: '2023.07.10', author: '조선 일보',
  image: 'http://www.mdilbo.com/lib/thumb.html?type=file&w=620&src=202303/19/20230319181032889861.jpg' },
];

interface NewListProps {
  title: string;
  date: string;
  author: string;
  image: string;
}

const NewList: React.FC<NewListProps> = ({ title, date, author, image }) => (
  <View style={styles.newsList}>
    <View style={styles.newsTextBox}>
      <AppText style={styles.newsTitle}>{title}</AppText>
      <AppText style={styles.newsInfo}>{date} | {author}</AppText>
    </View>
    <View style={styles.newsImageBox}>
      <Image style={styles.newsImage} source={{uri: image}}/>
    </View>
  </View>
);

const MoreViewButton = (props : any) => (
  <View style={styles.moreViewButtonBox}>
    <TouchableOpacity 
      onPress={() => {
        props.setIsMoreView(true);
      }}
      style={styles.moreViewButton}
      >
      <Text style={styles.moreViewButtonText}>더보기 </Text>
      <AntDesign name="down" size={15} color="black" />
    </TouchableOpacity>
  </View>
);

function TabScreen1() {


  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {newsContents.slice(0, 3).map(news => (
            <NewList
              key={news.id}
              title={news.title}
              date={news.date}
              author={news.author}
              image={news.image}
            />
        ))}
      </ScrollView>
    </View>
  );
}
  
function TabScreen2() {
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {newsContents.slice(0, 3).map(news => (
            <NewList
              key={news.id}
              title={news.title}
              date={news.date}
              author={news.author}
              image={news.image}
            />
        ))}
      </ScrollView>
    </View>
  );
}

function TabScreen3() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {newsContents.slice(0, 3).map(news => (
            <NewList
              key={news.id}
              title={news.title}
              date={news.date}
              author={news.author}
              image={news.image}
            />
        ))}
      </ScrollView>
    </View>
  );
}

function TabScreen4() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {newsContents.slice(0, 3).map(news => (
            <NewList
              key={news.id}
              title={news.title}
              date={news.date}
              author={news.author}
              image={news.image}
            />
        ))}
      </ScrollView>
    </View>
  );
}

function TabScreen5() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {newsContents.slice(0, 3).map(news => (
            <NewList
              key={news.id}
              title={news.title}
              date={news.date}
              author={news.author}
              image={news.image}
            />
        ))}
      </ScrollView>
    </View>
  );
}

  
export default function PartNews () {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, margin: 0 },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIndicatorStyle: { backgroundColor: 'red' },
      }}
    >
        <Tab.Screen name="시장동향" component={TabScreen1} />
        <Tab.Screen name="정책/제도" component={TabScreen2} />
        <Tab.Screen name="개발정보" component={TabScreen3} />
        <Tab.Screen name="분양" component={TabScreen4} />
        <Tab.Screen name="기타" component={TabScreen5} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
},
content: {
  width: 342,
  height: 334,
  borderRadius: 10,
},
newsList:{
  flexDirection: 'row',
  padding: 16
},
newsTextBox: {
  flex: 1,
},
newsTitle: {
  flex: 1,
  paddingRight: 10
},
newsInfo: {
  fontSize: 12,
  color: 'gray'
},
newsImageBox: {
  width: 64,
  height: 64,
  borderRadius: 5
},
newsImage: {
  width: '100%',
  height: '100%',
  borderRadius: 5
},
moreViewButtonBox: {
  justifyContent: 'center',
  alignItems: 'center',
},
moreViewButton: {
  width: 87,
  height: 32,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: 'gray',
  borderRadius: 15
},
moreViewButtonText: {
  fontSize: 12
}

});