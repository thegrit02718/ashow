import React, {useRef} from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Typography } from '../Components/Typography';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper'


interface GuideProps {
  number: string;
  title: string;
  imageURL: any;
  notice: string
}

const GuideBox: React.FC<GuideProps> = ({ number, title, imageURL, notice }) => (
  <View style={[styles.section, {marginVertical:15}]}>
    <View style={styles.noticeBox}>
        <View style={styles.number}>
          <Typography fontSize={14} color='#fff'>{number}</Typography>
        </View>
        <Typography fontSize={20} marginBottom={5}>{title}</Typography>
        <View style={styles.imageBox}>
          <Image source={imageURL} style={styles.image}/>  
        </View>
        <View style={styles.notice}>
          <Typography color='#3D3D3D' fontSize={14}>{notice}</Typography>
        </View>
    </View>
  </View>
);


const imageData = [
  {image: require('../images/guide/notice1.png')},
  {image: require('../images/guide/notice2.png')},
  {image: require('../images/guide/notice3.png')},
  {image: require('../images/guide/notice4.png')},
]

function renderItem({item}: any) {
   
  return (
    <View style={styles.imageBox}>
      <Image source={item.image} style={styles.image}/>  
    </View>
    );
}

export default function GuideDetail(props:any) {

  const carouselRef = useRef(null);
  const horizontalMargin = 30;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth - horizontalMargin / 2;

  return (
    <View style={styles.container}>

      <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
        <TouchableOpacity
          style={{padding:5}}
          onPress={()=>{
            props.navigation.goBack()
          }}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Divider height={2} />
      
      <ScrollView style={{flex:1}}>
        <View style={[styles.section, {alignItems:'center', justifyContent:'center'}]}>
          <Typography fontSize={24} marginBottom={10}>아쇼로 쉽고, 편하게</Typography>
          <Typography fontSize={24}>좋은 아파트 고르는 방법</Typography>
        </View>    
        
        <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between'}]}>
          <View style={{width:'48%', padding:10, borderWidth:1, borderColor:'#DFDFDF', alignItems:'center'}}>
            <Typography color='#8B8B8B'>아파트 찾기</Typography>
          </View>
          <View style={{width:'48%', padding:10, borderWidth:1, borderColor:'#DFDFDF', alignItems:'center'}}>
            <Typography color='#8B8B8B'>좋은 호실 고르기</Typography>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.noticeBox}>
              <View style={styles.number}>
                <Typography fontSize={14} color='#fff'>1</Typography>
              </View>
              <Typography fontSize={20} marginBottom={5}>맞춤필터로</Typography>
              <Typography fontSize={20}>내가 살고 싶은 아파트 찾기</Typography>
              <View style={{height:800, flexDirection:"row", justifyContent:'center'}}>
                <View style={{ flex:1}}>
                  <Swiper 
                    showsButtons={true}
                    showsPagination={true}
                    buttonWrapperStyle={{display:'none'}}
                    activeDot={
                      <View
                        style={{
                          backgroundColor: '#8B8B8B',
                          width: 10,
                          height: 10,
                          borderRadius:5,
                          marginHorizontal:3,
                          marginTop: 3,
                          marginBottom: 3
                        }}
                      />
                    }
                    dot={
                      <View
                        style={{
                          backgroundColor: '#BDBDBD',
                          width: 10,
                          height: 10,
                          borderRadius:5,
                          marginHorizontal:3,
                          marginTop: 3,
                          marginBottom: 3
                        }}
                      />
                    }
                  > 
                    {
                      imageData.map((item:any, index:any)=>{
                        return (
                          <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}} key={index}>
                            <View style={styles.imageBox}>
                              <Image source={item.image} style={styles.image}/>  
                            </View>
                          </View>
                        )
                      }) 
                    }
                  </Swiper>
                </View>
              </View>
              <View style={styles.notice}>
                <Typography color='#3D3D3D' fontSize={14}>보유 자금 및 대출을 고려하여 금액 범위를 정하고, 거주 인원 및 라이프 스타일을 고려하여 평형을 정해보세요</Typography>
              </View>
          </View>
        </View>

        <GuideBox number='2' title='아파트 구매 혜택 비교하기' imageURL={require(`../images/guide/notice5.png`)}
          notice='무상 옵션은 어떠한 것들이 있는지, 계약시 받을 수 있는 사은품 또는 할인 혜택이 있는지 등 아쇼에서는 아파트 구매 혜택을 한눈에 확인할 수 있어요!'
        />
        <GuideBox number='3' title='아파트 주변 인프라 확인하기' imageURL={require(`../images/guide/notice6.png`)}
          notice='아파트 주변에 다양한 생활 인프라가 몰려있으면 생활 여건이 편리해 실거주는 물론 집값 상승에도 큰 역할을 해요! 
          교통 시설, 편의 및 복지시설, 학군 정보와 아파트 내 커뮤니티 시설 등 다양한 정보를 확인해 보세요'
        />
        <GuideBox number='4' title='필요한 자본금 체크하기' imageURL={require(`../images/guide/notice7.png`)}
          notice='분양가, 옵션, 세금 그리고 대출금을 확인하고 계약, 중도금, 잔금, 입주일 등  시기별 필요 자금 등 아파트 분양시 실질적으로 필요한 자본금을 체크하세요!'
        />

      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  section: {
    padding :20
  },
  noticeBox: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  number: {
    width: 27, 
    height: 25,
    borderRadius: 13,
    backgroundColor:'#333',
    justifyContent:'center', 
    alignItems:'center',
    marginBottom:10
  },
  imageBox: {
    width: 325,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:15,
    borderWidth:10,
    borderColor:'#EAEAEA',
    borderRadius: 30,
  },
  image: {
    width: 300,
    height: 700,
    borderRadius: 25,
    resizeMode:'cover',
  },
  notice: {
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor: '#DFDFDF',
    padding:18,
    borderRadius:10
  }
 
});



