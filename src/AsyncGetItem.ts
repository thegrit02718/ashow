import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage 데이터 불러오기

const AsyncGetItem = async () => {
  try {
    const refreshToken : string | null = await AsyncStorage.getItem('token');
    const userAccount : string | null = await AsyncStorage.getItem('account');
    const userNickName : string | null = await AsyncStorage.getItem('nickname');
    const userURL : string | null = await AsyncStorage.getItem('URL');
    const city : string | null = await AsyncStorage.getItem('city');
    const county : string | null = await AsyncStorage.getItem('county');
    return {
      refreshToken, userAccount, userNickName, userURL, city, county
    }
    
  } catch (error) {
    console.log(error);
  }
};

export default AsyncGetItem;