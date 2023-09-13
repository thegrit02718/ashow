import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage 데이터 저장하기
const AsyncSetItem = async (Token : string, Name : string, NickName : string, URL : string) => {
    try {
      await AsyncStorage.setItem('token', Token);
      await AsyncStorage.setItem('name', Name);
      await AsyncStorage.setItem('nickname', NickName);
      await AsyncStorage.setItem('URL', URL);
    } catch (error) {
      console.log('AsycSet_err', error);
    }
  };

  export default AsyncSetItem;