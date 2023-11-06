import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Typography } from '../../Components/Typography';

interface SchListContentProps {
  name: string;
  distance: any;
}

const SchListContent: React.FC<SchListContentProps> = ({ name, distance }) => (
  <View style={styles.textBox}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={require('../../images/buildings/neighborhood1.png')} style={{marginRight: 10}}/>
      <Typography fontSize={16} marginBottom={5}>{name}</Typography>
    </View>
    <Typography fontSize={16} color='#B33936'>{distance}m</Typography>
  </View>
);

function Tab1() {

  const mart = [
    { name : '대백마트 만촌점', distance: '260' },
    { name : '홈마트 만촌점', distance: '668' },
    { name : '행복드림마트', distance: '826' },
  ]

  return (
    <View style={styles.container}>
      {
        mart.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              distance={item.distance}
            />
          )
        })
      }
    </View>
  );
}

function Tab2() {

  const cultureCenter = [
    { name : '선스포츠', distance: '60' },
    { name : '유성스포츠', distance: '768' },
  ]

  return (
    <View style={styles.container}>
      {
        cultureCenter.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              distance={item.distance}
            />
          )
        })
      }
    </View>
  );
}

function Tab3() {

  const hospital = [
    { name : '드림병원', distance: '153' },
    { name : '한마음병원', distance: '567' },
    { name : '더원이비인후과', distance: '1,175' },
  ]

  return (
    <View style={styles.container}>
      {
        hospital.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              distance={item.distance}
            />
          )
        })
      }
    </View>
  );
}

function Tab4() {

  const publicCenter = [
    { name : '만촌동사무소', distance: '246' },
    { name : '수성구청', distance: '987' },
  ]

  return (
    <View style={styles.container}>
      {
        publicCenter.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              distance={item.distance}
            />
          )
        })
      }
    </View>
  );
}

export default function Neighborhood () {
  const [activeTab, setActiveTab] = useState('Tab1');

  const renderTabContent = () => {
    if (activeTab === 'Tab1') {
      return <Tab1 />;
    } else if (activeTab === 'Tab2') {
      return <Tab2 />;
    } else if (activeTab === 'Tab3') {
      return <Tab3 />;
    } else if (activeTab === 'Tab4') {
      return <Tab4 />;
    } 
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab('Tab1')}>
          <Text style={[styles.tabItem, activeTab === 'Tab1' && styles.activeTab]}>대형마트</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Tab2')}>
          <Text style={[styles.tabItem, activeTab === 'Tab2' && styles.activeTab]}>문화시설</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Tab3')}>
          <Text style={[styles.tabItem, activeTab === 'Tab3' && styles.activeTab]}>병원</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Tab4')}>
          <Text style={[styles.tabItem, activeTab === 'Tab4' && styles.activeTab]}>공공기관</Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginBottom: 15
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    fontWeight: 'bold'
  },
  activeTab: {
    color: '#CC5A57'
  },
  textBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
});
