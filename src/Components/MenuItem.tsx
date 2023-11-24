import React from "react"
import { View, Image } from "react-native"
import { Typography } from "./Typography"
import { StyleSheet } from "react-native"

interface ItemProps{
    name: string;
    source:any;
}
const MenuItem:React.FC<ItemProps> = ({name,source}) =>{
    return (
    <View style={styles.container}>
        <View style={{width:30, height:30, marginRight:18}}>
            <Image style={styles.image} source={source} />
        </View>
        <Typography fontSize={16} fontWeightIdx={2} color="#555">{name}</Typography>
    </View>)
}
export default MenuItem

const styles = StyleSheet.create({
    container:{
      flexDirection:"row",
      width:"48%",
      marginVertical:15,
    },
    image:{
        width:'100%',
        height:'100%', 
        resizeMode: 'contain', 
     
    }
})