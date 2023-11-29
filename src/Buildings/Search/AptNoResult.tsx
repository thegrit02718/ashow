import React from 'react'
import { View,Image, TouchableOpacity } from 'react-native'
import { Typography } from '../../Components/Typography'
import { StyleSheet } from 'react-native'
import { Alert } from 'react-native'
 
function AptNoresult( ) {
    return (
        <View style={{ flex:1, justifyContent:'center',alignItems:'center', marginTop:"30%"}}>
          <Image style={styles.image} source={require('../../images/search/searchApt.png')} resizeMode='contain'/> 
          <View style={{alignItems:"center"}}>
            <Typography fontWeightIdx={1} fontSize={16} color='#6F6F6F' marginBottom={2}>검색결과가 없어요.</Typography>
            <Typography fontWeightIdx={2} fontSize={12} color='#8B8B8B'>다른 키워드로 검색해보세요.</Typography>  
          </View>
          <TouchableOpacity style={styles.button} onPress={()=> Alert.alert('click')}>
            <Typography fontSize={12} color='#E5625D' fontWeightIdx={2}>매물 등록 요청</Typography>
          </TouchableOpacity>
        </View>
    )
}

export default AptNoresult

const styles = StyleSheet.create({
    button:{
        borderWidth:1,
        borderColor: "#E5625D",
        paddingVertical:6,
        paddingHorizontal:14,
        borderRadius: 8,
        marginTop: 10,
    },
    image:{
        width:88,
        height:76,
        marginBottom: 12,
    },
})