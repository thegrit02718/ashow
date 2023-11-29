import React from 'react'
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface ListProps{
    children: React.ReactNode;
} 

function List({children}:ListProps) {
    

    return (
        <View >
            <View style={[styles.flexBox,styles.pad_24_0]}>
                {children}
            </View>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    pad_24_0:{
        paddingHorizontal:24,
      
     
    },
    flexBox:{
        width:"100%",
        flexDirection:"row",justifyContent:'flex-start', 
       
    },
  
})
