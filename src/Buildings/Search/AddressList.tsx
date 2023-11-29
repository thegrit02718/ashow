import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../Components/Typography';
import {styles} from './SearchForm'
import { Divider } from '../../Components/Divider';

interface AddresstListProps {
    address: string;
    value: string;
    isLastIndex? : boolean;
}

export default function AddressList({ address, value, isLastIndex}: AddresstListProps) {
    if (value.length === 0 || value.length < 1) return null;
  console.log('last?',isLastIndex)
    if(address.includes(value) || value.includes(address)){
      const regex = new RegExp(`(${value.trim()})`, 'gi');
      const result = address.split(regex);
      
      return (
        <View>
          <View style={[styles.flexBox,{ marginVertical: 6, }]}>
            {result.map((part:string, idx:number) => {
              
              if (value.includes(part)) {
              
                return (
               
                  <View key={idx} style={{flexDirection:'row'}}>
                    <Typography fontSize={16} color='#E5625D' fontWeightIdx={1}>{part}</Typography> 
                  </View>
                );
              } else if(part.includes(value)){
                return(
                  <View key={idx} style={{flexDirection:'row'}}>
                    <Typography fontSize={16} color='#E5625D' fontWeightIdx={1}>{value}</Typography>
                    <Typography fontSize={16} color='#333' fontWeightIdx={1}>{part.split(value,2)[1]}</Typography>
                  </View>
                )
              } 
              else {
                return (
                  <View key={idx}>
                     <Typography fontSize={16} color='#333' fontWeightIdx={1}>{part}</Typography>
                  </View>
                );
              }
            })
            }
          
          </View>
          {isLastIndex ? <Divider height={0} marginVertical={8}/> : <Divider height={1} marginVertical={8}/>}
        
        </View>
       )
    }
 
   
     
  }
  