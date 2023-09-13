import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const data = {
    
    aptNm : '만촌자이르네',
    indate : '2023.1.입주',

    
    cortarNm : '대구시 수성구 만촌동',
    hscpTypeCd : 'A01',
    rletTpCd : 'APT',
    rletTpNm : '아파트',
    addr : '대구시 수성구 만촌동 1489',
    totDongCnt : '6',
    totalAtclCnt : '79',
    totHsehCnt : '607',
    lat : '35.849042',
    lng : '128.651702',
    mgOfcTelNo : '',
    repMgOfcTelNo : '',
    roadAddr : '교학로19길 19',
    realPriceInfoYn : 'Y',
    zoom : '17',
    showBildLayerYN : '',
    ptpNoForInfo : '1',
    notfSeq : '',
    isFavoriteItem : '',
    isFromNaver : 'N',
    bildNo : '',
    ptpNo : '1',
    order : '',
    articleListYN : '',
    tabCategory : 'buildings',
    loginStatus : 'nologin'
};

const Detail = () => {
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default Detail;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 20,
    }
  });
  