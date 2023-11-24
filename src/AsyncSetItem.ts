import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage 데이터 저장하기
const AsyncSetItem = async (Token : string, Account: string, NickName : string, URL : string, City : string, County : string) => {
    try {
      await AsyncStorage.setItem('token', Token);
      await AsyncStorage.setItem('account', Account);
      await AsyncStorage.setItem('nickname', NickName);
      await AsyncStorage.setItem('URL', URL);
      await AsyncStorage.setItem('city', City);
      await AsyncStorage.setItem('county', County);
    } catch (error) {
      console.log('AsycSet_err', error);
    }
  };

  export default AsyncSetItem;