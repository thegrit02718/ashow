import React from "react";
import { View ,Text} from "react-native";
import { StyleSheet } from "react-native";
import { Typography } from "./Typography";

interface TitleProps{
    children: React.ReactNode;
    title?:string;
}

const TitleContainer:React.FC<TitleProps> = ({children,title}) =>{
    return (
        <View style={styles.container}>
            <Typography fontSize={18}>{title}</Typography>
            {children}
        </View>
    )
}

export default TitleContainer

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:16,
        alignItems:"center",
        position:'relative',
        backgroundColor: "#fff",
      
    },
})

