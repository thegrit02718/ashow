import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Text } from 'react-native';

function Page1(props : any) {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <TouchableOpacity 
          style={styles.imgbox}>
            <Text>상담내역</Text>
          {/* <Image source={require('./images/Tab1-1.png')}/> */}
        </TouchableOpacity>
      </ScrollView>
    </View> 
   );
}
export default Page1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  imgbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    flex: 1,
    width: '100%',
    height: 900,
    resizeMode: 'contain'
  }
});

