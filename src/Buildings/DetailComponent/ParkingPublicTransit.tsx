import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';

export default function ParkingPublicTransit(props: any) {

  const aptData = props.aptData;

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitle}>
          <Image source={require('../../images/buildings/titleImage7.png')} style={styles.sectionTitleImage}/>
          <Typography fontSize={20}>주차 및 교통정보 시설</Typography>  
        </View>
        <View style={styles.textBox}>
          <Typography >주차</Typography>
        </View>
        <Divider height={2} marginVertical={5}/>
        <View style={styles.textBox}>
          <Typography fontSize={14} color='#8B8B8B'>세대수</Typography>
          <Typography fontSize={14}>{aptData.household}세대</Typography>
        </View>
        <Divider height={1} marginVertical={5}/>
        <View style={styles.textBox}>
          <Typography fontSize={14} color='#8B8B8B'>총 주차대수</Typography>
          <Typography fontSize={14}>{aptData.parking_all}대</Typography>
        </View>
        <Divider height={1} marginVertical={5}/>
        <View style={styles.textBox}>
          <Typography fontSize={14} color='#8B8B8B'>세대당 주차대수</Typography>
          <Typography fontSize={14}><Text style={{color: '#E3514C'}}>{aptData.parking_inHouseHold}</Text>대</Typography>
        </View>
        <Divider height={1} marginVertical={5}/>
        <View style={styles.textBox}>
          <Typography fontSize={14} color='#8B8B8B'>주차장 형태</Typography>
          <Typography fontSize={14}>{aptData.parking_form}주차장</Typography>
        </View>

        <View style={{marginVertical: 20}}></View>

        <View style={styles.textBox}>
          <Typography >대중교통</Typography>
        </View>
        <Divider height={2} marginVertical={5}/>
        <View style={styles.textBox}>
          <Typography fontSize={12} color='#8B8B8B'>지하철</Typography>
        </View>
        <View style={styles.textBox}>
          <Typography fontSize={14}>{aptData.pubTrans_subway}</Typography>
          <Typography fontSize={14}>{aptData.pubTrans_subway_distance}</Typography>
        </View>
        <Divider height={1} marginVertical={5}/>
        <View style={styles.textBox}>
          <Typography fontSize={12} color='#8B8B8B'>고속철도</Typography>
        </View>
        <View style={styles.textBox}>
          <Typography fontSize={14}>{aptData.pubTrans_train}</Typography>
          <Typography fontSize={14}>{aptData.pubTrans_train_distance}</Typography>
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
});
