import React from 'react';
import { View} from 'react-native';
import { Typography } from '../../Components/Typography';
import { ScrollView } from 'react-native-gesture-handler';


export default function PyengColorBox(props: any) {

  const pyengInfo = props.pyengInfo;

  return (
    <View style={{flexDirection: 'row', alignItems:'center', padding: 5, marginVertical: 10,
                    backgroundColor: '#FBFBFB', borderRadius: 5, borderWidth: 1, borderColor: '#EFEFEF',
                    justifyContent:'space-between', flexWrap:'wrap'
                  }}>
        {
          pyengInfo.map((item:any, index:any)=>{
            return (
              <View style={{flexDirection:'row', width:'32%', marginVertical:5}} key={index}>
                <View style={{width: 16, height: 16, backgroundColor: item.keyColor, borderRadius: 5, marginHorizontal: 5}}></View>
                <Typography fontSize={11} fontWeightIdx={1}>{item.personalArea}㎡/{item.houseHold}세대</Typography>
              </View>
            )
          })
        }
    </View>
  );
}

