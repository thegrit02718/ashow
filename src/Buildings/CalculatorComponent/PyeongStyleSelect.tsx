import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import FormatNumber from '../../Components/FormatNumber';
import SelectDropdown from 'react-native-select-dropdown'
import Entypo from 'react-native-vector-icons/Entypo';

export default function PyeongStyleSelect (props : any) {

  const [pyeongStyleSelect, setPyeongStyleSelect] = useState(0)
 
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={{ flex:1 }} onPress={()=>{setPyeongStyleSelect(0)}}>
          <View style={[styles.pyeongStyleSelectBox, { 
                        borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                        borderWidth: pyeongStyleSelect === 0 ? 2 : undefined,
                        borderColor: pyeongStyleSelect === 0 ? '#E8726E' : undefined,
                        }]}>
            <Typography fontSize={14} color='#8B8B8B'>29평</Typography> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=>{setPyeongStyleSelect(1)}}>
          <View style={[styles.pyeongStyleSelectBox, {
                        borderWidth: pyeongStyleSelect === 1 ? 2 : undefined,
                        borderColor: pyeongStyleSelect === 1 ? '#E8726E' : undefined,
                        }]}>
            <Typography fontSize={14} color='#8B8B8B'>32평A</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1}} onPress={()=>{setPyeongStyleSelect(2)}}>
          <View style={[styles.pyeongStyleSelectBox, { 
                        borderTopRightRadius: 10, borderBottomRightRadius: 10,
                        borderWidth: pyeongStyleSelect === 2 ? 2 : undefined,
                        borderColor: pyeongStyleSelect === 2 ? '#E8726E' : undefined,
                        }]}>
            <Typography fontSize={14} color='#8B8B8B'>32평B</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
    
};


const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  pyeongStyleSelectBox : {
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  },

})