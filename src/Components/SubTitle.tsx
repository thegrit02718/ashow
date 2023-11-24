import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from './Typography';

export const SubTitle :React.FC<{
    navigation:any,
    title: string,
}> = (props)=>{
    
  return (
    <View style={styles.contentTitleBox}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={()=>{
          props.navigation.goBack()
        }}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Typography fontSize={20}>{props.title}</Typography>
    </View>
  )
}


const styles = StyleSheet.create({
  contentTitleBox : {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  backButton: {
    position:'absolute',
    left:5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent:'center',
  },
})