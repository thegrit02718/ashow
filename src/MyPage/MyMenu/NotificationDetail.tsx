import React, { useState,useEffect } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Image, ScrollView} from "react-native";
import { Typography } from "../../Components/Typography";
import Layout from "../../Components/Layout";
import { Alert } from "react-native";
import { Divider } from "../../Components/Divider";
import ToggleButton from "../../Components/ToggleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationDetail(){
    const [toggleBtn, setToggleBtn] = useState({
        pushNoti:false,
        receiveInfo: false,
        appPush: false
    })
    const toggleBtnHandler = (target: "pushNoti" | "receiveInfo" | "appPush") => {
        console.log(target,'target');
        setToggleBtn((prev) => ({
            ...prev,
            [target] : !prev[target],
        }))
    }
    console.log(toggleBtn,'togglebtn');
    const readAsyncStorage = async () => {
        try {
            const storedValue1 = await AsyncStorage.getItem("pushNoti");
            const storedValue2 = await AsyncStorage.getItem("receiveInfo");
            const storedValue3 = await AsyncStorage.getItem("appPush");
            console.log('storedValue1',storedValue1)
            // 해당하는 키에 대해 값을 가져와서 toggleButton을 업데이트
            setToggleBtn((prev) => ({
                ...prev,
                pushNoti: storedValue1 == 'true' ? true  : false,
                receiveInfo: storedValue2 == 'true' ?  true  : false,
                appPush: storedValue3 == 'true' ? true : false,
            }));
        } catch (error) {
            console.error("Error reading AsyncStorage:", error);
        }
    };
    useEffect(() => {
        // AsyncStorage에서 상태를 읽어와서 설정
        
        readAsyncStorage();

      }, []);

    return(
        <ScrollView style={styles.wrapper}>
            <View style={{paddingBottom:"20%"}}>
                <Layout>
                    <ToggleButton event={() => toggleBtnHandler('pushNoti') } storageKey="pushNoti" toggled={toggleBtn.pushNoti}>
                       <Typography fontSize={16}>푸시 알림 받기</Typography>
                    </ToggleButton>
                </Layout>
                <Divider height={8} marginVertical={16} />
                <Layout>
                    <Typography fontSize={20} marginBottom={32}>알림 세부 설정</Typography>
                    <ToggleButton event={() => toggleBtnHandler('appPush') } storageKey="appPush" toggled={toggleBtn.appPush}>
                      <Typography fontSize={16}>인기아파트, 마케팅, 혜택 정보 수신</Typography>
                    </ToggleButton>
                    
                    <Typography fontSize={12} color="#8C8C8C">아쇼의 다양한 혜택과 분양 소식을 알려드릴게요.</Typography>    
                    <View style={styles.alarmContentBox}>
                        <View style={styles.flexBox}>
                            <Image style={styles.alarmImage} source={require('../../images/mypage/alertdefault.png')}/> 
                            <Typography fontSize={12} color="#B33936">앱 푸시 알림</Typography>
                        </View>
                        <View style={{marginTop:13, alignItems:"flex-end"}}>
                            <View style={styles.alarmMessageBox}>
                                <Typography fontSize={12} color="#595959">현재 황금동에서 가장 인기있는 아파트는 어디일까요? 바로 알아보세요!</Typography>
                            </View>
                            <View style={[styles.alarmMessageBox, {marginTop:10}]}>
                                <Typography fontSize={12} color="#595959">황금동에 새로운 혜택 분양이 등록되었습니다. 지금 확인하고 할인된 분양을 받아보세요! </Typography>
                            </View>
                        </View>
                    </View>
                </Layout>    
                <Divider marginVertical={16}/>
                <Layout>
                    <ToggleButton event={() => toggleBtnHandler('receiveInfo') } storageKey="receiveInfo" toggled={toggleBtn.receiveInfo}>
                        <Typography fontSize={16}>부동산가이드 최신 업데이트 수신</Typography>
                    </ToggleButton>
                    <Typography fontSize={12} color="#8C8C8C">부동산 핫이슈와 유용한 정보 등의 업데이트를 알려드릴게요.</Typography>    
                    <View style={styles.alarmContentBox}>
                        <View style={styles.flexBox}>
                            <Image style={styles.alarmImage} source={require('../../images/mypage/alertdefault.png')}/> 
                            <Typography fontSize={12} color="#B33936">부동산 가이드</Typography>
                        </View>
                        <View style={{marginTop:13, alignItems:"flex-end"}}>
                            <View style={styles.alarmMessageBox}>
                                <Typography fontSize={12} color="#595959">부동산 이슈가 업데이트 되었어요!{'\n'}최신 이슈를 확인하고 관련 기사를 통해 다양한 정보를 확인해보세요!</Typography>
                            </View>
                            <View style={[styles.alarmMessageBox, {marginTop:10}]}>
                                <Typography fontSize={12} color="#595959">집 마련을 위한 대출 정보가 업데이트 되었어요. 더욱 똑똑하게 아파트를 구매하기 위한 준비를 시작해보세요!</Typography>
                            </View>
                        </View>
                    </View>
                </Layout>   
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:"#fff",
        flex:1,
      
    },
    toggleButtonBox:{
        width: 50,
        height:28,
        borderRadius:18,
        backgroundColor:"#DFDFDF",
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