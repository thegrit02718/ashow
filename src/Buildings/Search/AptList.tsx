import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../Components/Typography';
import {styles} from './SearchForm'
import { AptItemType } from './SearchForm';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Divider } from '../../Components/Divider';

interface AptListProps {
    data: AptItemType;
    value: string;
}
 
export default function AptList({data, value}:AptListProps){
    const {houseHoldSum, inDate, name, address} = data;
     
  
     const regex = new RegExp(`(${value.trim()})`, 'gi');
     const result = name.split(regex);
   
          if(name.match(new RegExp(value,'gi')) || address.match(new RegExp(value,'gi'))){
            return (
              <View >
                <View style={{flex:1, flexDirection:'row', alignItems:"center", justifyContent:'space-between', marginTop: 12}}> 
                  <View >
                    <Typography fontSize={12} fontWeightIdx={1} color='#8B8B8B' marginBottom={2}>{address}</Typography>
                
                    <View style={[styles.flexBox,{ alignItems:"center", marginBottom: 6,} ]}>
                      {result.map((item:string,idx:number)=>{
                        return (
                          <View key={idx}>
                          {item == value ? <Typography fontSize={16} color='#E5625D' fontWeightIdx={1}>{item}</Typography> : <Typography fontSize={16} fontWeightIdx={1} color='#333'>{item}</Typography> }
                          </View>)
                      })}
                    </View>
                  </View>
                  <SimpleLineIcons name="arrow-right" size={12} color="#8B8B8B" /> 
                  
                </View>
                <Divider height={1} marginVertical={4}/>        
              </View>
            );
          }
       
    }
   
    
  