import {useState, useEffect} from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Typography} from '../Components/Typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import MainURL from '../../MainURL';


export default function EditNicknameModal(props: any) {

  const [userNickName, setUserNickName] = useState(props.userNickName);
  const [isUserNickName, setIsUserNickName] = useState<boolean>(false);
  const [errorMessageNickName, setErrorMessageNickName] = useState<string>('');
  const [countText, setCountText] = useState<number>(0);
  
  const onChange = (text: string) => {
    setUserNickName(text);
    const copy = text.length;
    setCountText(copy);
    if (text.length >= 2 && text.length <= 10 && text !== '') {
      setIsUserNickName(true)
      setErrorMessageNickName('올바른 형식의 닉네임입니다');
    } else {
      setIsUserNickName(false)
      setErrorMessageNickName('닉네임은 최소 2자 이상 10자 이하로 사용 가능합니다');
    }
  };

  const nickNameTextCancel = () => {
    setUserNickName('');
    setIsUserNickName(false);
    setErrorMessageNickName('');
    setCountText(0);
  };

  const isValidUserName = async ()=>{
    try{
      if (userNickName !== '' && userNickName.length >= 2 && userNickName.length <= 10 ) {
        const res = await axios.post(`${MainURL}/login/nicknamecheck`, {
          userNickName : userNickName
        });
        if (res.data) {
          setErrorMessageNickName('이미 사용 중입니다. 다른 닉네임을 시도해 주세요.');
          setIsUserNickName(false);
        } else {
          setErrorMessageNickName('사용 가능한 닉네임입니다.');
          setIsUserNickName(true);
          const copy = {...props.userData}
          copy.userNickName = userNickName;
          props.setUserData(copy);
        }
      } else if (userNickName === '') {
        setErrorMessageNickName('빈칸을 입력해주세요');
        setIsUserNickName(false);
      } else if (userNickName.length < 2 || userNickName.length > 10) {
        setErrorMessageNickName('글자수가 최소 2자 이상 10자 이하여야 합니다');
        setIsUserNickName(false);
      }
    } catch (error){
        console.log(error);
    }
  }

  return (
    <View style={{position: 'relative', justifyContent: 'center', flex: 1}}>
      
      <TouchableOpacity
        onPress={props.editNickNameToggleModal}
        activeOpacity={1}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: 24,
        }}>
        <View />
      </TouchableOpacity>

      <View style={{width:'100%', position:'absolute', top:20, flexDirection:'row', justifyContent:'space-between', padding:20}}>
        <TouchableOpacity
          onPress={props.editNickNameToggleModal}
        >
          <AntDesign name="close" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{props.setIsChanged(true); props.editNickNameToggleModal();}}
        >
          <Typography fontSize={18} color={isUserNickName ? '#fff' : '#6F6F6F'}>완료</Typography>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: '50%',
          paddingHorizontal: 24,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <View>
          <Typography fontSize={18} color="#fff" marginBottom={12}>
            닉네임 변경
          </Typography>
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginBottom: 8,
            }}>
            <View
              style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                value={userNickName}
                onChangeText={onChange}
                onEndEditing={isValidUserName}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: '#fff',
                }}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {!isUserNickName && userNickName.length > 0 && (
                  <Ionicons name="alert-circle" size={19} color="#EB683F" style={{marginRight: 10}}
                  />
                )}
                {isUserNickName && userNickName.length > 0 && (
                  <AntDesign name="check" size={16} color="#43BA40" style={{marginRight: 10}} />
                )}
                <TouchableOpacity onPress={nickNameTextCancel}>
                  <AntDesign name="closecircle" size={16} color="#8B8B8B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {isUserNickName && userNickName.length > 0 ? (
              <Typography fontSize={12} color="#43BA40">
                올바른 형식의 이름입니다.
              </Typography>
            ) : (
              <Typography fontSize={12} color="#E94A4A">
                {errorMessageNickName}
              </Typography>
            )}
            <Typography fontSize={12} color="#fff">
              {userNickName.length} / 10
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmButton: {
    
  },
});