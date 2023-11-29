import React from 'react'
import { useContext } from 'react';
import { TabsContext } from './Tabs';
import { StyleSheet,ScrollView } from 'react-native';
import { View } from 'react-native';

interface PanelProps{
  value: number;
  children: React.ReactNode
}

export default function Panel ({ value, children }  : PanelProps){
    const context = useContext(TabsContext);
  
    if(context === null) return <></>
  
    return (
      <View style={[context.selectedIndex  === value ? styles.visible : styles.hidden, styles.border]}>
        {children}
      </View>
     )
}  

  const styles = StyleSheet.create({
    hidden: {
      display: 'none',
    },
    visible: {
      flex:1,
     
    
    },
    border:{
      borderTopWidth:2, borderTopColor:"#EFEFEF",
  }
  });