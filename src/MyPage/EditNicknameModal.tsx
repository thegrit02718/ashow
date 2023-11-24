import {
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    KeyboardAvoidingView,
  } from 'react-native';
  import {useState, useEffect} from 'react';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Input from '../Components/Input';
  import {Typography} from '../Components/Typography';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import axios from 'axios';
  import {UserProfileProps} from './EditProfile';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  interface NicknameFormValues {
    visible: boolean;
    nickname: string;
    setUserData: React.Dispatch<React.SetStateAction<UserProfileProps>>;
    toggle: () => void;
  } 
  
  export default function EditNicknameModal({
    visible,
    toggle,
    setUserData,
    nickname,
  }: NicknameFormValues) {
    const [isChange, setIsChange] = useState(false); //
    const [userName, setUserName] = useState(nickname); // 유저 네임 활용
    const [isValid, setIsValid] = useState(false); // 유효성검사 여부
    const [errorMessage, setErrorMessage] = useState<boolean | string>(' ');
    
    useEffect(() => {
      setUserName(nickname);
      setIsChange(false);
      setErrorMessage('');
      setIsValid(false);
    }, [visible]);
  
    const onChange = (text: string) => {
      if (text.length > 0) {
        setIsChange(true);
        setUserName(text);
      } else {
        setIsChange(false);
        setUserName(text);
      }
    };
  
    const clearInput = () => {
      setUserName('');
      setIsChange(false); // 입력 텍스트가 없음을 나타내도록 업데이트
      setErrorMessage(false);
      setIsValid(false);
    };
    const isValidUserName = async () => {
      try {
        // api적용해야 함
        setUserData(prev => ({
          ...prev,
          userNickName: userName,
        }));
  
        /*
              const res = await axios.post('user/api/', {
                  userNickName : nickname
              });
  
  
              if (res.data) {
                 setIsValid(true);
                 setUserData((prev) => ({
                  ...prev,
                  userNickName: userName,
                }));
              } else {
                  setErrorMessage('이미 사용 중인 닉네임입니다. 다른 닉네임을 시도해 주세요.');
  
              } */
      } catch (error) {
        console.log(error);
      }
    };
    const validateNickname = () => {
      console.log('ddd');
      const regex = /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/i;
  
      if (userName.length < 2) {
        setErrorMessage('닉네임은 최소 2자 이상부터 사용 가능합니다.');
        return;
      } else if (userName.length > 6) {
        setErrorMessage('닉네임은 최대 6자까지 작성하실 수 있습니다.');
        return;
      } else if (regex.test(userName)) {
        setErrorMessage('닉네임에 특수기호 혹은 잘못된 닉네임이 존재합니다.');
        return;
      }
      isValidUserName();
      setUserData(prev => ({
        ...prev,
        isChange: true,
      }));
      toggle();
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={toggle}>
        <View style={{position: 'relative', justifyContent: 'center', flex: 1}}>
          <TouchableOpacity
            onPress={toggle}
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
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={validateNickname}
            disabled={isChange ? false : true}>
            <View>
              <Typography fontSize={18} color={isChange ? '#fff' : '#6F6F6F'}>
                완료
              </Typography>
            </View>
          </TouchableOpacity>
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
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginBottom: 8,
                }}>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Input
                    value={userName}
                    onChange={onChange}
                    cursor="white"
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: 'whited',
                      fontFamily: 'Pretendard-Mediumddd',
                    }}
                    endEditing={validateNickname}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {errorMessage && !isValid && (
                      <Ionicons
                        name="alert-circle"
                        size={19}
                        color="#EB683F"
                        style={{marginRight: 10}}
                      />
                    )}
                    {errorMessage && isValid && (
                      <AntDesign
                        name="check"
                        size={16}
                        color="#43BA40"
                        style={{marginRight: 10}}
                      />
                    )}
                    <TouchableWithoutFeedback onPress={clearInput}>
                      <AntDesign name="closecircle" size={16} color="#8B8B8B" />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {isValid ? (
                  <Typography fontSize={12} color="#43BA40">
                    올바른 형식의 이름입니다.
                  </Typography>
                ) : (
                  <Typography fontSize={12} color="#E94A4A">
                    {errorMessage}
                  </Typography>
                )}
                <Typography fontSize={12} color="#fff">
                  {userName.length} / 6
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    confirmButton: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 5,
      position: 'absolute',
      right: 20,
      top: 20,
    },
  });