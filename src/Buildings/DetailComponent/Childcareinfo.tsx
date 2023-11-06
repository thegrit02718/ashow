import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../Components/Typography';

interface SchListContentProps {
  name: string;
  number: string;
  sort: any;
  distance: any;
}

const SchListContent: React.FC<SchListContentProps> = ({ name, number, sort, distance }) => (
  <View style={styles.textBox}>
    <View>
      <Typography fontSize={16} marginBottom={5}>{name}</Typography>
      <View style={{flexDirection: 'row'}}>
        <Typography fontSize={14} color='#595959'>{sort} </Typography>
        <Typography fontSize={14} color='#8C8C8C'>{distance}m</Typography>
      </View>
    </View>
    <Typography fontSize={18}>{number}</Typography>
  </View>
);

function Tab1() {

  const nursery = [
    { name : '국공립만촌자이르네어린이집', sort: '국공립', distance: '29' },
    { name : '국공립만촌삼정에듀파크어린이집', sort: '국공립', distance: '154' },
    { name : '뉴대구어린이집', sort: '사회복지', distance: '234' },
  ]

  return (
    <View style={styles.container}>
      {
        nursery.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              number={''}
              sort={item.sort}
              distance={item.distance}
            />
          )
        })
      }
    </View>
  );
}

function Tab2() {

  const kindergarten = [
    { name : '동신유치원', number:'6만원', sort: '사립', distance: '660' },
    { name : '만촌아이숲유치원', number:'12만원', sort: '사립', distance: '727' },
  ]

  return (
    <View style={styles.container}>
      {
        kindergarten.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              number={item.number}
              sort={item.sort}
              distance={item.distance}
            />
          )
        })
      }
    </View>
  );
}

export default function Childcareinfo () {
  const [activeTab, setActiveTab] = useState('Tab1');

  const renderTabContent = () => {
    if (activeTab === 'Tab1') {
      return <Tab1 />;
    } else if (activeTab === 'Tab2') {
      return <Tab2 />;
    } 
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab('Tab1')}>
          <Text style={[styles.tabItem, activeTab === 'Tab1' && styles.activeTab]}>어린이집</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Tab2')}>
          <Text style={[styles.tabItem, activeTab === 'Tab2' && styles.activeTab]}>유치원</Text>
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
