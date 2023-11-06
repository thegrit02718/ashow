import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainURL from '../../MainURL';
import PartNews from './PartNews';
import LocalNews from './LocalNews';
import Notice from './Notice';
import AsyncGetItem from '../AsyncGetItem'
import { Typography } from '../Components/Typography';
import CapitalGraph from '../Buildings/CalculatorComponent/CapitalGraph';

function HomeMain(props : any) {

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
    asyncFetchData();
  }, []);

  const images = [
    require('../images/home/sample.png'),
    require('../images/home/sample.png'),
    require('../images/home/sample.png'),
    require('../images/home/sample.png'),
  ];

  const favorList = [
    { id: 1, title: '만촌자이르네', address: '수성구 만촌동', size1: '29', size2: '77' },
    { id: 2, title: '월성자이르네', address: '달서구 월성동', size1: '32', size2: '84' }
  ];

  const newimages = [
    require('../images/home/samplenew.png'),
    require('../images/home/samplenew.png'),
    require('../images/home/samplenew.png'),
    require('../images/home/samplenew.png'),
  ];

  const recommedimages = [
    require('../images/home/recommend1.png'),
    require('../images/home/recommend1.png'),
    require('../images/home/recommend1.png'),
    require('../images/home/recommend1.png'),
  ];

  interface FavorListContentProps {
    title: string;
    address: string;
    size1: any;
    size2: any;
  }

  const FavorListContent: React.FC<FavorListContentProps> = ({ title, address, size1, size2 }) => (
    <View style={styles.favorsListBox}>
      <View style={styles.favorsListContentBox}>
        <Typography fontSize={18}>{title}</Typography>
        <Typography>
          <AntDesign name="star" size={24} color="gold" />
        </Typography>
      </View>
      <View style={styles.favorsListContentBox}>
        <Typography color={'gray'} fontSize={12}>{address}</Typography>
        <Typography color={'gray'} fontSize={12}>{size1}평({size2}㎡)</Typography>
      </View>
      <View style={styles.divider} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        {/* logobox & title */}
        <View style={styles.logobox}>
          
          <Image source={require('../images/home/toplogo.png')} style={styles.toplogo}/>
          {/* <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate("마이페이지", {screen:"알림"});
            }}
            style={styles.topbell}
            >
            <AntDesign name="bells" size={30} color="black" />
          </TouchableOpacity> */}
        </View>
        <View style={styles.titlebox}>
          <Text style={{fontSize:20, marginBottom: 10}}>안녕하세요 <Typography fontSize={20}>{asyncGetData.userNickName}</Typography>님!</Text>
          <Text style={styles.titleTypography}>아쇼로 <Text style={{color: '#CC5A57'}}>아파트</Text>도 {'\n'}손쉽게 쇼핑해보세요!</Text>
        </View>
   
        {/* topLinkButtons */}
        <View style={styles.linkbuttonContainer}>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('매물');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkImageBox}>
              <Image source={require('../images/home/button1.png')} style={styles.linkImage}/>
            </View>
            <Typography>매물</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('Prepare');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkImageBox}>
              <Image source={require('../images/home/button2.png')} style={styles.linkImage}/>
            </View>
            <Typography fontSize={12}>관심단지</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('Prepare');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkImageBox}>
              <Image source={require('../images/home/button3.png')} style={styles.linkImage}/>
            </View>
            <Typography fontSize={12}>아쇼사용법</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('Prepare');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkImageBox}>
              <Image source={require('../images/home/button4.png')} style={styles.linkImage}/>
            </View>
            <Typography fontSize={12}>공지사항</Typography>
          </TouchableOpacity>
        </View>

        {/* topImgSwife */}
        <View style={styles.topImgSwifeBox}>
          <ScrollView 
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
          >
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.scrollImages} />
            ))}
          </ScrollView>
        </View>

        {/* favorsBuilings */}
        <View style={styles.favorsContainer}>
          <View style={styles.favorsTitleBox}>
            <Typography fontSize={20} marginBottom={18}>{asyncGetData.userNickName}님의 관심단지</Typography>
            <TouchableOpacity 
              onPress={() => {
                // props.navigation.navigate('관심단지');
              }}
              >
              <Text style={styles.favorsAllView}>전체보기</Text>
            </TouchableOpacity>
          </View>
          {favorList.map(favor => (
            <FavorListContent
              key={favor.id}
              title={favor.title}
              address={favor.address}
              size1={favor.size1}
              size2={favor.size2}
            />
          ))}
        </View>

        {/* newBuilings */}
        <View style={styles.newbuildingsContainer}>
          <Text style={styles.newbuildingsTitle}>따끈따끈한 <Typography color={'#CC5A57'} fontSize={20}>신규매물</Typography></Text>
          <View style={styles.newbuildingsImgBox}>
            <ScrollView 
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
            >
              {newimages.map((image, index) => (
                <Image key={index} source={image} style={styles.newBuildingsImages} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* part news */}
        <View style={styles.News}>
          <Typography fontSize={20} marginBottom={18}>분야별 뉴스</Typography>   
          <PartNews></PartNews>
          <View style={styles.partNewsAllViewBox}>
            <TouchableOpacity 
                style={styles.partNewsAllView}
                onPress={() => {
                  // props.navigation.navigate('');
                }}
                >
              <Text style={styles.partNewsAllViewTypography}>기사 전체보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Local news */}
        <View style={styles.localNews}>
          <Typography fontSize={20} marginBottom={18}>지역 주요 뉴스</Typography>   
          <LocalNews></LocalNews>
        </View>

        {/* 추천 게시물 */}
        <View style={styles.recommend}>
          <Typography fontSize={20} marginBottom={18}>추천 게시물</Typography>   
          <View style={styles.recommendImgBox}>
            <ScrollView 
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
            >
              {recommedimages.map((image, index) => (
                <Image key={index} source={image} style={styles.recommendImages} />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.notice}>
          <Typography fontSize={20} marginBottom={18}>공지사항</Typography>
          <Notice></Notice>
        </View>

        {/* footer */}
        <View style={{backgroundColor:'#EAEAEA', height:150, width:'100%', padding:20}}>
          <Typography fontSize={10} marginBottom={10} color='#8C8C8C'>(주)더그릿</Typography>
          <Typography fontSize={10} marginBottom={10} color='#8C8C8C'>사업자등록번호 : 146-87-02718</Typography>
          <Typography fontSize={10} marginBottom={10} color='#8C8C8C'>대표 E-Mail : thegrit02718@naver.com</Typography>
          <Typography fontSize={10} marginBottom={10} color='#8C8C8C'>대표 카카오톡 ID : thegrit02718</Typography>
        </View>

      </ScrollView>
    </View> 
   );
}
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logobox: {
    flex: 1,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  },
  toplogo : {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  topbell : {
    width: 30,
    height: 40,
  },
  titlebox: {
    width: '100%',
    height: 100,    
    paddingLeft: 20,
    marginBottom: 20
  },
  titleTypography: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  
  // topButton
  linkbuttonContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  linkbutton: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkImageBox: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#edebeb',
    marginBottom: 8
  },
  linkImage: {
    resizeMode: 'contain',
  },

  // topImgSwife
  topImgSwifeBox: {
    width: '100%',
    height: 230,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  scrollImages: {
    width: 330,
    height: 146,
    borderRadius: 20,
    marginLeft: 24
  },


  // favors
  favorsContainer: {
    paddingHorizontal: 24,
  },
  favorsTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  favorsAllView: {
    textDecorationLine: 'underline',
    color: 'gray'
  },
  favorsListBox: {
    height: 100,
    justifyContent: 'center',
  },
  favorsListContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 5
  },
  
  // newbuildings
  newbuildingsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    height: 242
  },
  newbuildingsTitle: {
    fontSize: 20,
    marginBottom: 20
  },
  newbuildingsImgBox: {

  },
  newBuildingsImages: {
    width: 296,
    height: 136,
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  
  // partNews
  News: {
    paddingHorizontal: 24,
    height: 411,
    marginBottom: 30,
  },
  partNewsAllViewBox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  partNewsAllView: {
    width: 322,
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  partNewsAllViewTypography: {
    fontSize: 14
  },
  localNews: {
    paddingHorizontal: 24,
    height: 280,
    marginBottom: 30,
  },

  // recommend
  recommend: {
    paddingHorizontal: 24,
    height: 162,
    marginBottom: 30
  },
  recommendImgBox: {

  },
  recommendImages: {
    width: 240,
    height: 120,
    marginLeft: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  
  // notice
  notice: {
    paddingHorizontal: 24,
    height: 100,
    marginBottom: 30
  },
});

