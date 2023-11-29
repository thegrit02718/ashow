import React from 'react'
import { View,Image } from 'react-native'
import { Typography } from '../../Components/Typography'
import { StyleSheet } from 'react-native'

 
function AddressNoResult( ) {
    return (
        <View style={{ flex:1, justifyContent:'center',alignItems:'center', marginTop:"30%"}}>
          <Image style={styles.image} source={require('../../images/search/searchAddress.png')} resizeMode='contain'/> 
          <View style={{alignItems:"center"}}>
            <Typography fontWeightIdx={1} fontSize={16} color='#6F6F6F' marginBottom={2}>검색결과가 없어요.</Typography>
            <Typography fontWeightIdx={2} fontSize={12} color='#8B8B8B'>다른 키워드로 검색해보세요.</Typography>  
          </View>
        </View>
    )
}

export default AddressNoResult

const styles = StyleSheet.create({
    image:{
        width:88,
        height:76,
        marginBottom: 12,
    },
})