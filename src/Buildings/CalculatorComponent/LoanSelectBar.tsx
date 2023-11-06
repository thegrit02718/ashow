import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image } from 'react-native';
import { Typography } from '../../Components/Typography';
import FormatNumber from '../../Components/FormatNumber';
import Slider from '@react-native-community/slider';
import { Divider } from '../../Components/Divider';

export default function LoanSelectBar (props : any) {

  const [sliderValue, setSliderValue] = useState(0);

  let loanCost = (props.totalCost * parseInt(sliderValue.toFixed(0)) / 100).toFixed(0);
  let capitalCost = (props.totalCost * (100 - parseInt(sliderValue.toFixed(0))) / 100).toFixed(0);
  let monthyCost = (props.totalCost * parseInt(sliderValue.toFixed(0)) / 100 / (120 * props.calcMonth)).toFixed(0);

  const onValueChange = (value : any) => {
    setSliderValue(value);
    props.onSliderValueChange(loanCost, capitalCost, monthyCost);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Typography fontSize={14} color='#8B8B8B' marginBottom={5}>대출금</Typography>
          <Typography fontSize={24} color='#E41E4F'>{sliderValue.toFixed(0)}%</Typography>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Typography fontSize={14} color='#8B8B8B' marginBottom={5}>보유자본금</Typography>
          <Typography fontSize={24} color='#FD825C'>{100 - parseInt(sliderValue.toFixed(0))}%</Typography>
        </View>
      </View>
      <View style={{alignItems: 'center', height:80, justifyContent:'center'}}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          upperLimit={90}
          minimumTrackTintColor="#FF0844"
          maximumTrackTintColor="#FFB199"
          value={sliderValue}
          onValueChange={onValueChange}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
        <Typography fontSize={12}>{FormatNumber(parseInt(loanCost))}</Typography>
        <Typography fontSize={12}>{FormatNumber(parseInt(capitalCost))}</Typography>
      </View>

      <View style={styles.textBox}>
        <Typography fontSize={14} color='#3D3D3D'>총 구매비용</Typography>
        <Typography fontSize={16}>{FormatNumber(props.totalCost)}</Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14} color='#3D3D3D'>대출금</Typography>
        <Typography fontSize={16}>
          {FormatNumber(parseInt(loanCost))}
          <Typography fontSize={16}> (전체의 {sliderValue.toFixed(0)}%)</Typography>
        </Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14} color='#3D3D3D'>자본금</Typography>
        <Typography fontSize={16}>
          {FormatNumber(parseInt(capitalCost))}
          <Typography fontSize={16}> (전체의 {100 - parseInt(sliderValue.toFixed(0))}%)</Typography>
        </Typography>
      </View>
      <Divider height={1} marginVertical={5}/>
      <View style={styles.textBox}>
        <Typography fontSize={14} color='#3D3D3D'>월납입 예상금</Typography>
        <Typography fontSize={16} color='#E8726E'>
          {FormatNumber(parseInt(monthyCost))}
        </Typography>
      </View> 
      
    </View>

  )
    
};

const styles = StyleSheet.create({
  textBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7
  },
  slider: {
    width: '90%',
    height: '100%'
  },
})