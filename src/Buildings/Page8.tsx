import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';

function Page8(props : any) {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <TouchableOpacity 
          onPress={() => {
            props.navigation.navigate('Page9');
          }}
          style={styles.imgbox}>
          <Image source={require('./images/building9.png')} style={styles.image}/>
        </TouchableOpacity>
      </ScrollView>
    </View> 
   );
}
export default Page8;

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

