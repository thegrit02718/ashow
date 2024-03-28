import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';

export default function PublicTransit(props: any) {

  const aptData = props.aptData;

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Typography >대중교통</Typography>
      </View>
      <Divider height={2} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={12} color='#8B8B8B'>지하철</Typography>
      </View>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{aptData.pubTransSubway}</Typography>
        <Typography fontSize={14}>{aptData.pubTransSubwayDistance}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={12} color='#8B8B8B'>고속철도</Typography>
      </View>
      <View style={styles.textBox}>
        <Typography fontSize={14}>{aptData.pubTransTrain}</Typography>
        <Typography fontSize={14}>{aptData.pubTransTrainDistance}</Typography>
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
