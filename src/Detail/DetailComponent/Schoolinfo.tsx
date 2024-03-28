import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../../Components/Typography';

interface SchListContentProps {
  name: string;
  number: string;
  sort: any;
  distance: any;
  navigation : any;
}

const SchListContent: React.FC<SchListContentProps> = ({ name, number, sort, distance, navigation }) => (
  <View style={styles.textBox}>
    <View>
      <TouchableOpacity
        onPress={()=>{
          navigation.navigate('SchoolDetailWebView');
        }}
      >
        <Typography fontSize={16} marginBottom={5}><Text style={{textDecorationLine:'underline', textDecorationColor:'#8C8C8C'}}>{name}</Text></Typography>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Typography fontSize={14} color='#595959'>{sort} </Typography>
        <Typography fontSize={14} color='#8C8C8C'>{distance}m</Typography>
      </View>
    </View>
    <Typography fontSize={18}>{number}</Typography>
  </View>
);

function Tab1(props:any) {

  const elementrySch = [
    { name : '대구 대청초등학교', number: '23.8명', sort: '공립', distance: '269' }
  ]

  return (
    <View style={styles.container}>
      {
        elementrySch.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              number={item.number}
              sort={item.sort}
              distance={item.distance}
              navigation={props.navigation}
            />
          )
        })
      }
    </View>
  );
}

function Tab2(props:any) {

  const middleSch = [
    { name : '소선여자중학교', number: '30.8명', sort: '사립', distance: '269' },
    { name : '대륜중학교', number: '31.3명', sort: '사립', distance: '548' },
    { name : '오성중학교', number: '29.9명', sort: '사립', distance: '868' }
  ]

  return (
    <View style={styles.container}>
      {
        middleSch.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              number={item.number}
              sort={item.sort}
              distance={item.distance}
              navigation={props.navigation}
            />
          )
        })
      }
    </View>
  );
}

function Tab3(props:any) {

  const highSch = [
    { name : '대구혜화여자고등학교', number: '20.8명', sort: '사립', distance: '359' },
    { name : '대륜고등학교', number: '24.6명', sort: '사립', distance: '569' },
    { name : '오성고등학교', number: '19.6명', sort: '사립', distance: '856' }
  ]

  return (
    <View style={styles.container}>
      {
        highSch.map((item, index)=>{
          return (
            <SchListContent 
              key={index}
              name={item.name}
              number={item.number}
              sort={item.sort}
              distance={item.distance}
              navigation={props.navigation}
            />
          )
        })
      }
    </View>
  );
}

export default function Schoolinfo (props:any) {
  const [activeTab, setActiveTab] = useState('Tab1');

  const renderTabContent = () => {
    if (activeTab === 'Tab1') {
      return <Tab1 navigation={props.navigation}/>;
    } else if (activeTab === 'Tab2') {
      return <Tab2 navigation={props.navigation}/>;
    } else if (activeTab === 'Tab3') {
      return <Tab3 navigation={props.navigation}/>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => setActiveTab('Tab1')}>
          <Text style={[styles.tabItem, activeTab === 'Tab1' && styles.activeTab]}>초등학교</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Tab2')}>
          <Text style={[styles.tabItem, activeTab === 'Tab2' && styles.activeTab]}>중학교</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Tab3')}>
          <Text style={[styles.tabItem, activeTab === 'Tab3' && styles.activeTab]}>고등학교</Text>
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
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginBottom: 15
  },
  tabItem: {
    flex: 1,
    padding: 15,
    fontWeight: 'bold',
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
