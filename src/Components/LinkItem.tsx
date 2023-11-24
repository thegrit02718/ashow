import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Typography } from "./Typography";

interface LinkeItemProps{
    text:string;
    onPress: () => void;
    accent?: boolean;
}

const LinkItem:React.FC<LinkeItemProps> = ({text, onPress, accent}) =>{
return (
    <TouchableOpacity style={[styles.bottomButton,{marginBottom:24}]} onPress={onPress}>
      <Typography fontSize={16} fontWeight={accent ? "bold" : "normal"}  color= {accent ? "#CC5A57" : undefined}>{text}</Typography>
    </TouchableOpacity>
)
}

const styles = StyleSheet.create({
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomButtonText: {
        flex: 1,
        fontSize: 16,
        color: '#555',
    },
})
export default LinkItem