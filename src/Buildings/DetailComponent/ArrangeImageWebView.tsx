import WebView from 'react-native-webview';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';

export default function ArrangeImageWebView (props : any) {
  return (
    <View style={{flex:1, backgroundColor: 'white'}}>
      <View style={{height: 70, justifyContent: 'center', alignItems:'center'}}>
        <Typography fontSize={18}>단지 배치도</Typography>
        <TouchableOpacity 
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{position: 'absolute', right: 20}}>
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '90%', flexDirection: 'row', height: 50, alignItems:'center', padding: 12, marginVertical: 10,
                      backgroundColor: '#FBFBFB', borderRadius: 5, borderWidth: 1, borderColor: '#EFEFEF'}}>
          <View style={{width: 16, height: 16, backgroundColor: '#85BAD9', borderRadius: 5, marginHorizontal: 5}}></View>
          <Typography >77㎡/124세대</Typography>
          <View style={{width: 16, height: 16, backgroundColor: '#EBD086', borderRadius: 5, marginHorizontal: 5}}></View>
          <Typography >84㎡A/272세대</Typography>
          <View style={{width: 16, height: 16, backgroundColor: '#D5A2C1', borderRadius: 5, marginHorizontal: 5}}></View>
          <Typography >84㎡B/211세대</Typography>
        </View>
      </View>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Typography fontWeightIdx={2}>이미지를 확대 및 축소하여 <Text style={{fontWeight: 'bold'}}>단지별 평면도</Text>와 <Text style={{fontWeight: 'bold'}}>향</Text>을 자세히 확인해보세요.</Typography>
      </View>
      <View style={{flex:1}}>
        <WebView
            style={{}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: `${props.route.params.uri}` }}
        />
        <View style={{alignItems:'center', position:'absolute', top:10, width: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>북</Typography>
          </View>
        </View>
        <View style={{justifyContent:'center', position:'absolute', left:10, height: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>서</Typography>
          </View>
        </View>
        <View style={{justifyContent:'center', position:'absolute', right:10, height: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>동</Typography>
          </View>
        </View>
        <View style={{alignItems:'center', position:'absolute', bottom:10, width: '100%'}}>
          <View style={styles.directButton}>
            <Typography color='white'>남</Typography>
          </View>
        </View>
      </View>
    </View>
  )
    
};


const styles = StyleSheet.create({
  directButton : {
    width: 46, 
    height: 40, 
    backgroundColor: 'black', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 10
  },
})