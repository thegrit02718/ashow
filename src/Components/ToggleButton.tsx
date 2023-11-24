import React, { useEffect, useState } from "react";
import { Animated, View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ButtonProps {
  children: React.ReactNode;
  event: () => void;
  storageKey : "pushNoti" | "receiveInfo" | "appPush";
  toggled: boolean; 
}

const ToggleButton = ({ children, event, storageKey, toggled }: ButtonProps) => {
  const [isToggled, setIsToggled] = useState(false);
  const transAnim = useState(new Animated.Value(0))[0];
 

  useEffect(()=>{
  
        const onCheck = async() => {
            try{
                const response = await AsyncStorage.getItem(storageKey)
                console.log(response,'response')
                if(response === 'true'){
                    setIsToggled(true);
                }
            }catch(err){
                console.log(err);
            }
        }
        onCheck();
   
 
  },[])

  useEffect(() => {
    const startPosition = isToggled ? 0 : 22; // 시작 위치
    const endPosition = isToggled ? 22 : 0; // 목표 위치
    const range = endPosition - startPosition;
 
    Animated.timing(transAnim, {
      toValue: startPosition + range ,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
  }, [isToggled]);

  // 버튼을 누를 때 AsyncStorage 업데이트
  const handlePress = (target:any) => {
    console.log(target,'target');
    setIsToggled(!isToggled)
    AsyncStorage.setItem(storageKey, JSON.stringify(!isToggled));
    event(); // 다른 이벤트 처리 로직
  };

  return (
    <View style={[styles.flexBox, styles.flexJustifyBet]}>
      {children}
 
        <TouchableOpacity style={[styles.toggleButtonBox,isToggled ? {backgroundColor: "#E8726E"} :{ backgroundColor: "#DFDFDF"}]}  onPress={()=> handlePress(storageKey)} >
          <Animated.View style={[styles.toggleButton, { transform: [{translateX: transAnim}]}]} />
        </TouchableOpacity>
    </View>
   
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:"#fff",
        flex:1,
      
    },
    toggleButtonBox:{
        width: 50,
        height:28,
        borderRadius:18,
        justifyContent:"center",
        position:'relative',
        marginVertical:8
    },
    toggleButton:{
        width: 22,
        height:22,
        borderRadius:30,
        backgroundColor:"#fff",
        position:'absolute',
        left:3,
    },
    alarmImage:{
        width:19,
        height:22,
        marginRight:4,
    },  
    flexBox:{
        flexDirection:'row',
        alignItems:"center",
    },
    flexJustifyBet:{
        justifyContent:'space-between'
    }, 
    alarmContentBox:{
        marginTop:24,
        width:"100%",
    },
    alarmMessageBox:{
        padding:10,
        backgroundColor:"#F5F5F5",
        borderRadius:8,
        width:"90%",
    }
})