import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet } from 'react-native';

const NoticeDetail = ( props : any) => {
    const {postId} = props.route.params;
    const Url = `https://www.ashow.co.kr/notice${postId}.html`;
    
    return (
       <View style={{ flex: 1 , backgroundColor:"#fff"}}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => props.navigation.navigate('공지사항')}
        >
             <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
         <WebView 
           style={{flex:1, alignItems:'center', justifyContent:'center'}}
           source={{ uri: Url }}
         />
       </View>
     );
  };

export default NoticeDetail

const styles = StyleSheet.create({
    backButton: {
        marginTop:16,
        marginLeft:15,
    }
})