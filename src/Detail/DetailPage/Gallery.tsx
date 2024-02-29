import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SubTitle } from '../../Components/SubTitle';
import MainImageURL from "../../../MainURL";
import { useRoute } from '@react-navigation/native';
import { Typography } from '../../Components/Typography';


export default function Gallery(props: any) {

  const route : any = useRoute();
  const aptKey = route.params.aptKey;
  const images = route.params.images ? JSON.parse(route.params.images) : null;

  return (
    <View style={styles.container}>
      <SubTitle title='단지 갤러리' navigation={props.navigation}/>
      <ScrollView style={{flex:1}}>
      <View style={{width:'100%', flexDirection:'row', padding:15,
                    flexWrap:'wrap', justifyContent:'space-between'}}>

        {
          images.map((item:any, index:any)=>{
            return(
              <TouchableOpacity 
                style={styles.imageBox} key={index}
                onPress={()=>{
                  props.navigation.navigate('GalleryDetail', {image : item, aptKey : aptKey})
                }}
              >
                <Image source={{uri: `${MainImageURL}/appimages/buildings/${aptKey}/default/${item.name}`}} 
                      style={styles.image}/>
                <View style={{position:'absolute', width:'100%', height:'100%', backgroundColor:'#333', opacity:0.5, borderRadius:5}}>
                </View>
                <View style={{position:'absolute', bottom:10, right:10}}>
                  <Typography color='#fff'>{item.name_ko}</Typography>
                </View>
              </TouchableOpacity>
            )
          }) 
        }
      </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryImage : {
    width: '48%',
    height: '100%'
  },
  imageBox:{
    width:'48%', 
    height:240, 
    marginVertical:5,
    borderRadius:5
  },
  image :{
    width:'100%', 
    height:'100%', 
    resizeMode:'cover',
    borderRadius:5
  }
})