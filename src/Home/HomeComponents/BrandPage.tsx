import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Image, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Typography } from '../../Components/Typography';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Divider } from '../../Components/Divider';
import MainImageURL from '../../../MainImageURL';
import FormatNumber from '../../Components/FormatNumber';


export default function BrandPage(props:any) {
  
  const [selectedBrand, setSelectedBrand] = useState(1);
  const [selectedBrandText, setSelectedBrandText] = useState('힐스테이트');
  const aptlist = props.aptlist; 
  const aptViewlist = aptlist.filter((e:any) => e.aptName.includes(selectedBrandText));

  interface BrandBoxProps {
    source:ImageSourcePropType;
    value: number;
    text: string;
  }

  const BrandBox = ({source, value, text}: BrandBoxProps) => {

    const handlePress = (text : string) => {
      setSelectedBrand(value);
      setSelectedBrandText(text);
    };

    return (
      <TouchableOpacity
        style={[styles.Trigger]}
        onPress={()=>{handlePress(text)}}>
          <View style={[styles.imageBox, selectedBrand === value ? styles.active : styles.inactive]}>
              <Image style={styles.image} source={source} alt={text} resizeMode='contain'/>
          </View>
        {text && (
          <Typography
            fontSize={14}
            color={selectedBrand === value ? '#1B1B1B' : '#C1C1C1'}
            fontWeightIdx={1}>
            {text}
          </Typography>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={styles.p_horizon_24}>
        <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>브랜드관</Typography>
      </View>
      
        <ScrollView horizontal>
          <View style={[styles.tab]}>
            <BrandBox value={1} text="힐스테이트"  source={require('../../images/home/brand_logo_1.png')}/>
            <BrandBox value={2} text="푸르지오" source={require('../../images/home/brand_logo_2.png')}/>
            <BrandBox value={3} text="극동스타클래스" source={require('../../images/home/brand_logo_3.png')}/>
            <BrandBox value={4} text="서한이다음" source={require('../../images/home/brand_logo_4.png')}/>
            <BrandBox value={5} text="빌리브" source={require('../../images/home/brand_logo_5.png')}/>
            <BrandBox value={6} text="엘크루" source={require('../../images/home/brand_logo_6.png')}/>
            <BrandBox value={7} text="스위첸" source={require('../../images/home/brand_logo_7.png')}/>
          </View>
        </ScrollView>
        <View style={{padding:20}}>
        { aptViewlist.length > 0
          ?
          aptViewlist?.map((item:any ,idx:any) => {
            return (
              <TouchableOpacity key={idx}
                activeOpacity={0.9}
                onPress={()=>{
                  props.navigation.navigate('Navi_Detail', {
                    screen: 'DetailMain',
                    params: {
                      aptKey : item.aptKey,
                      pyengKey : item.pyengKey,
                      userAccount : props.asyncGetData.userAccount,
                      userNickName : props.asyncGetData.userNickName
                    }
                  })
                }}
              >
                <View style={styles.card}>
                  <Image style={styles.brandImage} source={{uri: `${MainImageURL}/appimages/buildings/${item.aptKey}/default/mainimage.png`}} resizeMode='cover'/>
                  <View style={styles.textArea}>
                    <Typography fontSize={12} fontWeightIdx={2} color='#8B8B8B' marginBottom={1}>{item.addressCity} {item.addressCounty}</Typography>
                    <Typography fontSize={14} fontWeightIdx={1} color='#555' marginBottom={5}>{item.aptName}</Typography>
                    <View style={styles.brandPrice}>
                      <Typography fontSize={14} fontWeightIdx={0} color='#E8726E'>{FormatNumber(item.priceDefaultLow)} ~ {FormatNumber(item.priceDefaultHigh)}</Typography>
                    </View>
                  </View>
                  <SimpleLineIcons name="arrow-right" size={16} color="#BBB" />  
                </View>
                {aptlist?.length !== idx+1 && <Divider height={2} marginVertical={16}/>}
              </TouchableOpacity>)
            }
          )
          :
          <View style={{alignItems:'center'}}>
            <Typography fontWeightIdx={2}>현재 {selectedBrandText} 매물은 없습니다.</Typography>
          </View>
        }
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

  p_horizon_24:{
    paddingHorizontal: 24,
  },

  tab:{
    width:"100%",
    paddingVertical:10,
    borderBottomWidth:2,
    borderColor:'#FCF8F8',
    flexDirection:'row',
    gap: 10,
    paddingHorizontal:24,
    marginBottom:20
  },
  card:{
    flexDirection:'row',
    justifyContent :'space-between',
    alignItems:'center',
  },
  brandImage:{
    height:95,
    width:95,
    resizeMode:'cover',
    borderRadius:10,
    marginRight:10
  },
  textArea:{
    flex:1
  },
  brandPrice:{
    flexDirection:'row',
    alignItems:'center',
    gap: 4, 
  },
  Trigger: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    gap: 5,
  },
 
  active: {
    borderColor: '#f3959f',
  },
  inactive:{
    borderColor:"#FCF8F8",
  },
  image:{
    width: "100%", height:"100%"  },
  imageBox:{
    width:90,
    height:90,
    padding:10,
    borderRadius:50,
    borderWidth: 2,
    borderColor: "transparent"
  }
 
});

