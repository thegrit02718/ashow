import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Image } from 'react-native';
import { Typography } from '../../Components/Typography';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '../../Components/Divider';

LocaleConfig.locales['fr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일 '],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘"
};
LocaleConfig.defaultLocale = 'fr';

const currentDate = new Date;
const year = currentDate.getFullYear(); 
const monthcopy = currentDate.getMonth() + 1; 
const month = monthcopy < 10 ? `0${monthcopy}` : `${monthcopy}`
const day = currentDate.getDate();
const formattedDate = `${year}-${month}-${day}`;


export default function CalendarBox (props: any) {

  const [contractDay, setContractDay] = useState(formattedDate)
  const [moveinDay, setMoveinDay] = useState(formattedDate)
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);

  const calendarToggleModal = () => {
    setCalendarModalVisible(!isCalendarModalVisible);
  };

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.calendarBox}>
          <TouchableOpacity
            onPress={()=>{
              calendarToggleModal();
          }}>
          <View style={styles.calendar}>
            <MaterialCommunityIcons name="calendar-search" size={20} color="gray" style={{marginRight: 10}}/>
            <View style={styles.calendarText}>
              <Typography fontSize={12} marginBottom={3}>계약일</Typography>
              {
                contractDay === formattedDate 
                ? <Typography fontSize={14} color='#8B8B8B'>선택하세요</Typography>
                : <Typography fontSize={14} color='#333'>{contractDay}</Typography>
              }
            </View>
          </View>
          </TouchableOpacity>
          
        </View>

        <View style={styles.calendarBox}>
            <TouchableOpacity
            onPress={()=>{
              calendarToggleModal();
          }}>
          <View style={styles.calendar}>
            <MaterialCommunityIcons name="calendar-search" size={20} color="gray" style={{marginRight: 10}}/>
            <View style={styles.calendarText}>
              <Typography fontSize={12} marginBottom={3}>희망입주일</Typography>
            {
              moveinDay === formattedDate 
              ? <Typography fontSize={14} color='#8B8B8B'>선택하세요</Typography>
              : <Typography fontSize={14} color='#333'>{moveinDay}</Typography>
            }
            </View>
          </View>
          </TouchableOpacity>
          
        </View>
      </View>
      
      <Modal
        animationType="none"
        transparent={true}
        visible={isCalendarModalVisible}
        onRequestClose={calendarToggleModal}
      >
        <CalendarSelect
          calendarToggleModal={calendarToggleModal}
          contractDay={contractDay}
          setContractDay={setContractDay} 
          moveinDay={moveinDay}
          setMoveinDay={setMoveinDay}
        />
      </Modal>

    </View>
    
  )
}



function CalendarSelect (props: any) {

  const [selected, setSelected] = useState('');
  const [checkNum, setCheckNum] =useState(0)

  return (
    <View style={{flex:1, alignItems: 'center', justifyContent:'center', backgroundColor: 'white'}}>
      
      <View style={{width:'100%', marginLeft: 10, flexDirection:'row', justifyContent:'space-between'}}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={()=>{
            props.calendarToggleModal();
          }}
          >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={{alignSelf:'center', justifyContent:'center', marginRight:20}}>
        { 
          checkNum === 0 ? <Typography color='#E5625D'>희망 계약일을 선택하세요</Typography>
           : <Typography color='#E5625D'>희망 입주일을 선택하세요</Typography>
        }
        </View>
      </View>
      <View style={{width: '100%', height: 320, backgroundColor: '#fff', alignItems: 'center', borderRadius: 15}}>
        <Calendar
          style={{
            width: 350,
            height: 350,
          }}
          current={formattedDate}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#1B1B1B', // 요일 줄 색상
            selectedDayBackgroundColor: '#E8726E', // 선택 날짜 배경 색상
            selectedDayTextColor: '#fff', // 선택 날짜 텍스트 색상
            todayTextColor: 'red', // 오늘 날짜 색상
            dayTextColor: 'black', // 나머지 날짜 색상
            textDisabledColor: 'gray' // 지난달 날짜 색상
          }}
          onDayPress={(day: any) => {
            setSelected(day.dateString);
            if (checkNum === 0) {
              props.setContractDay(day.dateString);
              setCheckNum(1);
            } else if (checkNum === 1) {
              props.setMoveinDay(day.dateString);
              setCheckNum(2);
            }
          }}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true},
          }}
        />
      </View>
      
      <Divider height={3}/>

      <View style={{padding:20, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems:'flex-start'}}>
            <Typography marginBottom={5}>계약일</Typography>
            {
              checkNum === 0 ? <Typography color='#E5625D'>희망 계약일</Typography> : <Typography>{props.contractDay}</Typography>
            }
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Typography marginBottom={5}>입주일</Typography>
            {
              checkNum === 2 ? <Typography>{props.moveinDay}</Typography> : <Typography color='#E5625D'>희망 입주일</Typography>
            }
          </View>
      </View>
      <View style={{padding:20, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity 
          onPress={()=>{
            setCheckNum(0);
            props.setContractDay(formattedDate);
            props.setMoveinDay(formattedDate);
          }}
        >
          <View style={[styles.bottomButton, {width:74, marginRight: 15, backgroundColor:'#EFEFEF'}]}>
            <Typography fontSize={16} color='#8B8B8B'>초기화</Typography>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            props.calendarToggleModal();
          }}
        >
          { checkNum === 2 
            ?
            <View style={[styles.bottomButton, {backgroundColor: '#E8726E'}]}>
              <Typography fontSize={16} color='#FFF'>설정완료</Typography>
            </View>
            :
            <View style={[styles.bottomButton, {backgroundColor: '#DFDFDF'}]}>
              <Typography fontSize={16} color='#FFF'>설정완료</Typography>
            </View>
          }
          
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  calendarBox : {
    width: '47%',
    height : 60,
    justifyContent: 'center',
  },
  calendar: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E3514C',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  calendarText : {
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  bottomButton : {
    width: 250,
    borderRadius: 10,
    height: 50,
    padding: 10, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  backButton: {
    width: 50,
    height: 50,
    marginTop: 14,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
