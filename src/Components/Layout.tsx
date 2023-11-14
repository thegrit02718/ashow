import React,{ReactNode} from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const Layout:React.FC<{children:ReactNode}> = ({children}) =>{
    return (
        <View style={styles.container} >
            {children}
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({
    container : {
     backgroundColor: '#fff',
     paddingHorizontal: 24,

    },
   
   });