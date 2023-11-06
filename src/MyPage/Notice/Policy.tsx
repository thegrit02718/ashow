import React from 'react';
import {View, Text, Button} from 'react-native';
import { WebView } from 'react-native-webview';

function Policy (props : any) {

  const Url = `https://www.ashow.co.kr/termsinfo.html`;

  return (
    <View style={{ flex: 1 }}>
      <WebView 
        style={{flex:1, alignItems:'center', justifyContent:'center'}}
        source={{ uri: Url }}
      />
    </View>
  );
}

export default Policy ;
