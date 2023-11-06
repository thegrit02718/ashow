import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage 데이터 불러오기

const AsyncGetItem = async () => {
  try {
    const refreshToken : string | null = await AsyncStorage.getItem('token');
    const userAccount : string | null = await AsyncStorage.getItem('account');
    const userName : string | null = await AsyncStorage.getItem('name');
    const userNickName : string | null = await AsyncStorage.getItem('nickname');
    const userURL : string | null = await AsyncStorage.getItem('URL');
    return {
      refreshToken, userAccount, userName, userNickName, userURL
    }
    
  } catch (error) {
    console.log(error);
  }
};

export default AsyncGetItem;