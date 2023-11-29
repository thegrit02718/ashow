import { useContext } from 'react';
import { Typography } from '../Typography';
import { TabsContext } from './Tabs';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

interface TriggerProps {
    value: number;
    text:string;
    disabled?: boolean;
}

export default function Trigger ({ value, text, disabled = false }:TriggerProps){
    const context = useContext(TabsContext);
    const isActive = context?.selectedIndex === value;
    const handlePress = () => {
      if (context) {
        context.setSelectedIndex(value);
      }
    };

    return (
      <TouchableOpacity style={[styles.Trigger, isActive ? styles.active : {} ]}disabled={disabled} onPress={handlePress}>
        {text && <Typography fontSize={16} color={isActive ? "#E8726E" : "#C1C1C1"} fontWeightIdx={0}>{text}</Typography>}
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  Trigger:{
    marginRight:16,
    paddingBottom: 7,
    borderBottomWidth:2,
    borderColor:"transparent",
   
  },
  active:{
    borderColor: "#E8726E"
  }
})