import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';

function Page2(props : any) {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <TouchableOpacity 
          onPress={() => {
            props.navigation.navigate("Main");
          }}
          style={styles.imgbox}>
          <Image source={require('./images/guide3.png')} style={styles.image}/>      
        </TouchableOpacity>
      </ScrollView>
    </View> 
   );
}
export default Page2;

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
    height: 1300,
    resizeMode: 'contain'
  }
});

