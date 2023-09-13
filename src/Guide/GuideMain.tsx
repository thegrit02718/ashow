import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';

function GuideMain (props : any) {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <TouchableOpacity 
          onPress={() => {
            props.navigation.navigate('Page1');
          }}
          style={styles.imgbox}>
          <Image source={require('./images/guide1.png')} style={styles.image}/>      
        </TouchableOpacity>
      </ScrollView>
    </View> 
   );
}
export default GuideMain;

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
    height: 1500,
    resizeMode: 'contain'
  }
});

