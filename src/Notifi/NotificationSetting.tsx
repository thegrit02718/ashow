import React, { useState,useEffect } from "react";
import { StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, View, Image, ScrollView, Alert} from "react-native";
import { Typography } from "../Components/Typography";
import { Divider } from "../Components/Divider";
import { SubTitle } from "../Components/SubTitle";
import axios from 'axios'
import MainURL from "../../MainURL";
import AsyncGetItem from "../AsyncGetItem";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  
  interface CustomSwitchProps {
    title: string;
    value: boolean | null;
    setValue: (value: boolean) => void;
    toggleFuncfion: () => void;
  }
  
  const CustomSwitch: React.FC<CustomSwitchProps> = ({ title, value, setValue, toggleFuncfion }) => {
    LayoutAnimation.easeInEaseOut();
    return (
      <TouchableOpacity 
        onPress={()=>{
          setValue(!value);
          toggleFuncfion();
        }} 
        activeOpacity={0.8} 
       style={styles.switchContainer}
      >
        <Typography>{title}</Typography>
        <View style={[styles.switch, {alignItems: value === true ? 'flex-end' : 'flex-start', backgroundColor: value === true ? '#E8726E' : '#BDBDBD'}]}>
          <View style={styles.switchButton} />
        </View>
      </TouchableOpacity>
    );
  };

export default function NotificationSetting(props: any){

  const [refresh, setRefresh] = useState<boolean>(false);

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      await new Promise((resolve : any) => {
        setAsyncGetData(data);
        resolve();
      });
      if (data?.userAccount) {
        fetchPosts(data?.userAccount);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchPosts = (userAccount : string) => {
    axios.get(`${MainURL}/notification/usernotifiinfo/${userAccount}`).then((res) => {
      let copy: any = res.data[0];
      setIsNotifiAll(JSON.parse(copy.notifiNotice));
      setIsNotifiNotice(JSON.parse(copy.notifiNotice));
      setIsNotifiBoard(JSON.parse(copy.notifiBoard));
    });
  };

  useEffect(() => {
    asyncFetchData();
  }, []);

  const [isNotifiAll, setIsNotifiAll] = useState<boolean | null>(null);
  const [isNotifiNotice, setIsNotifiNotice] = useState<boolean | null>(null);
  const [isNotifiBoard, setIsNotifiBoard] = useState<boolean | null>(null);

  const handleToggleNotifiAll = async () => {
    if (isNotifiAll === true) {
      setIsNotifiAll(false)
      setIsNotifiNotice(false);
      setIsNotifiBoard(false);
    } else {
      setIsNotifiAll(true);
      setIsNotifiNotice(true);
      setIsNotifiBoard(true);
    }
  };
  
  const handleToggleNotifiNotice = () => {
    setIsNotifiNotice(!isNotifiNotice);
  };
  
  const handleToggleNotifiBoard = () => {
    setIsNotifiBoard(!isNotifiBoard);
  };

  const handleSaveSettings = async () => {
    try {
      const res = await axios.post(`${MainURL}/notification/setting`, {
        userAccount: asyncGetData.userAccount,
        notifiAll: isNotifiAll,
        notifiBoard: isNotifiBoard,
        notifiNotice: isNotifiNotice,
      });
      if (res.data === true) {
        setRefresh(!refresh);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error('실패함', error);
    }
  };

  useEffect(() => {
    handleSaveSettings();
  }, [isNotifiNotice, isNotifiAll, isNotifiBoard]);

  return(
    <ScrollView style={styles.wrapper}>
      <SubTitle title='알림설정' navigation={props.navigation}/>
      <View style={{paddingBottom:"20%"}}>
        <View style={styles.section}>
          <CustomSwitch title='전체 푸시 알림' value={isNotifiAll} setValue={setIsNotifiAll} toggleFuncfion={handleToggleNotifiAll} />
        </View>
        <Divider height={8}/>
        <View style={styles.section}>
          <Typography fontSize={20} marginBottom={32}>알림 세부 설정</Typography>
          <CustomSwitch title='공지사항 알림' value={isNotifiNotice} setValue={setIsNotifiNotice} toggleFuncfion={handleToggleNotifiNotice} />
          <Typography fontSize={12} color="#8C8C8C">아쇼의 다양한 혜택과 분양 소식을 알려드릴게요.</Typography>    
          <View style={styles.alarmContentBox}>
              <View style={styles.flexBox}>
                  <Image style={styles.alarmImage} source={require('../images/mypage/alertdefault.png')}/> 
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
        </View>
        <Divider marginVertical={16}/>
        <View style={styles.section}>
        <CustomSwitch title='게시판 새글 알림' value={isNotifiBoard} setValue={setIsNotifiBoard} toggleFuncfion={handleToggleNotifiBoard} />
          <Typography fontSize={12} color="#8C8C8C">부동산 핫이슈와 유용한 정보 등의 업데이트를 알려드릴게요.</Typography>    
          <View style={styles.alarmContentBox}>
              <View style={styles.flexBox}>
                  <Image style={styles.alarmImage} source={require('../images/mypage/alertdefault.png')}/> 
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
        </View>  
        {/* <View style={styles.section}>
          <TouchableOpacity 
            onPress={handleSaveSettings}
          >
            <View style={styles.saveButton}>
                <Typography fontSize={14} color="#fff" marginBottom={2}>설정완료</Typography>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
      
  )
}

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor:"#fff",
    flex:1,
  },
  section:{
    padding:20
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
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:20
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding:2
  },
  switchButton : {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor:'#fff',
  },
  saveButton:{
    width:"100%",
    paddingVertical: 15,
    borderRadius:6,
    alignItems:"center",
    backgroundColor:'#E8726E'
},
})