import {useContext} from 'react';
import {Typography} from '../Typography';
import {TabsContext} from './Tabs';
import {TouchableOpacity} from 'react-native';
import {StyleSheet,View,Image,ImageSourcePropType} from 'react-native';

interface TriggerProps {
  source:ImageSourcePropType;
  value: number;
  text: string;
  disabled?: boolean;
}

export default function ImageTrigger({source, value, text, disabled = false}: TriggerProps) {
  const context = useContext(TabsContext);
  const isActive = context?.selectedIndex === value;
  const handlePress = () => {
    if (context) {
      context.setSelectedIndex(value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.Trigger]}
      disabled={disabled}
      onPress={handlePress}>
        <View style={[styles.imageBox, isActive ? styles.active : styles.inactive]}>
            <Image style={styles.image} source={source} alt={text} resizeMode='contain'/>
        </View>
      {text && (
        <Typography
          fontSize={14}
          color={isActive ? '#1B1B1B' : '#C1C1C1'}
          fontWeightIdx={1}>
          {text}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Trigger: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    gap: 5,
  },
 
  active: {
    borderColor: '#f3959f',
  },
  inactive:{
    borderColor:"#FCF8F8",
  },
  image:{
    width: "100%", height:"100%"  },
  imageBox:{
    width:90,
    height:90,
    padding:10,
    borderRadius:50,
    borderWidth: 2,
    borderColor: "transparent"
  }
});
