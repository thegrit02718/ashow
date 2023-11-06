import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Community (props: any) {

  const community1 = [
    { name : '피트니스 클럽', notice: '활력있는 생활을 위한 다양한 운동기구, 프로그램' },
    { name : '골프연습장', notice: '단지 안에 있는 입주민 전용 실내 골프연습장' },
    { name : 'G.X', notice: '건강과 아름다움을 유지할 수 있는 에어로빅, 요가' },
    { name : '사우나', notice: '입주민들의 힐링과 재충전을 위한 사우나 시설' }
  ]

  const community2 = [
    { name : '작은도서관', notice: '편안한 분위기에서 독서를 할 수 있는 커뮤니티 공간' },
    { name : '독서실', notice: '입주민들이 이용하는 쾌적한 분위기의 단지 내 학습공간' },
    { name : '아너스클럽', notice: '어르신들의 친목과 교류를 위한 편안한 휴식공간' },
    { name : '다목적룸', notice: '입주민들이 이용하는 쾌적한 분위기의 커뮤니티공간' }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitle}>
        <Image source={require('../../images/buildings/titleImage6.png')} style={styles.sectionTitleImage}/>
        <Typography fontSize={20}>커뮤니티 시설</Typography>  
      </View>
      <View style={{height: 300, marginVertical: 15}}>
        <ScrollView 
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
        > 
          <Image source={require('../../images/buildings/communityImage1.jpg')} style={styles.communityImage}/>
          <Image source={require('../../images/buildings/communityImage2.jpg')} style={styles.communityImage}/>
        </ScrollView>
      </View>
      <View style={styles.textBox}>
        <Typography >운동시설</Typography>
        <AntDesign name="up" size={20}/>
      </View>
      <Divider height={2} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community1[0].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community1[0].notice}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community1[1].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community1[1].notice}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community1[2].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community1[2].notice}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community1[3].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community1[3].notice}</Typography>
      </View>

      <View style={{marginVertical: 20}}></View>

      <View style={styles.textBox}>
        <Typography >편의시설</Typography>
        <AntDesign name="up" size={20}/>
      </View>
      <Divider height={2} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community2[0].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community2[0].notice}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community2[1].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community2[1].notice}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community2[2].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community2[2].notice}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{community2[3].name}</Typography>
        <Typography fontSize={12} color='#8B8B8B'>{community2[3].notice}</Typography>
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
  communityImage : {
    width: 500,
    height: '100%'
  },
});
