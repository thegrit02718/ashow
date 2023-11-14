import React from "react";
import { View,ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({
  size = 80,
  color = "#E8726E",
}: LoadingSpinnerProps) {
  return <View style={styles.wrapper}>
    <ActivityIndicator size={size} color={color}/>
  </View>;
}
 
const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})   