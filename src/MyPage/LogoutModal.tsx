import React from "react";
import { View,TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { Typography } from "../Components/Typography";
import { Alert } from "react-native";

interface LogoutModalProps{
    visible:boolean;
    toggle: () => void;
    logout: () => void;
}

export default function LogoutModal({visible,toggle,logout}:LogoutModalProps){
    return (
     
        <Modal   
     
        transparent={true}
        visible={visible}
        onRequestClose={toggle}>
            <TouchableWithoutFeedback onPress={toggle} >
                <View style={styles.background} />
            </TouchableWithoutFeedback>
            <View style={styles.wrapper}>
                <View style={styles.content}>
                    <View style={styles.contentInner}>
                        <Typography fontSize={16} color="#000" marginBottom={8}>로그아웃</Typography>
                        <Typography fontSize={14} color="#555">로그아웃 하시겠습니까?</Typography>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggle} >
                            <Typography fontSize={14} color="#999">취소</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {borderLeftColor:"#999999",borderLeftWidth:1}]} onPress={logout} >
                            <Typography fontSize={14} color="#E94A4A">확인</Typography>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
            
        </Modal>
    )
}
const styles = StyleSheet.create({
    background:{
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.6)",
       
    },
    wrapper:{
        
        width:"100%",
        height:"100%",
        paddingHorizontal:59,
        justifyContent:"center",
        alignItems:"center",
        position:'absolute',
        top:0,
      
    },
    content :{
        width:"100%",
        backgroundColor:"#fff",
        borderRadius: 8,
    },
    contentInner:{
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:24,
    },
    buttonContainer:{
        borderTopWidth:1,
        borderTopColor:"#C1C1C1",
        flexDirection:'row'
    },
    button:{
        width:"49%",
        alignItems:"center",
        padding:10,
    }
})