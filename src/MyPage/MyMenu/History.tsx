import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography } from '../../Components/Typography';
import Layout from '../../Components/Layout';
import { TouchableWithoutFeedback } from 'react-native';
import { Divider } from '../../Components/Divider';
import AsyncGetItem from '../../AsyncGetItem';
import axios from 'axios';

export default function History (props : any) {
  const [isClicked,setIsClicked] = useState({
    buildings:true,
    posts: false,
  });

  const toggleButton = (target: 'buildings' | 'posts') => {
    setIsClicked(()=>({
      buildings: target === 'buildings' ? true : false,
      posts: target === 'posts' ? true : false,
    }))
  }
 
  
  return (
    <View style={styles.container}>
    
      <Layout>
        <View style={styles.title}>
          <TouchableOpacity style={[styles.tabButton, isClicked.buildings ? { borderBottomColor: "#E8726E"} : {borderBottomColor: "#8C8C8C", }]} onPress={()=> toggleButton('buildings')}  >
            <Text style={[styles.titleText, isClicked.buildings ? { color:"#E8726E" } : {color: "#8C8C8C"}]}>최근 본 단지</Text >
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, isClicked.posts ? { borderBottomColor: "#E8726E"} : {borderBottomColor: "#8C8C8C", }]} onPress={()=> toggleButton('posts')}>
            <Text style={[styles.titleText, isClicked.posts ? { color:"#E8726E" } : {color: "#8C8C8C"}]}>최근 본 게시물</Text>
            </TouchableOpacity>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <TouchableWithoutFeedback onPress={() => Alert.alert('click')}>
            <Text style={styles.clearAllButton}>전체삭제</Text>
          </TouchableWithoutFeedback>
        </View>
      </Layout>
      <View style={{flex:1}}>
        <ScrollView>
          {/* 최근 본 단지 클릭 했을 떄 */}
          {isClicked.buildings && 
          <View>
            <Layout>
              <Typography fontSize={18} color='#CC5A57' marginBottom={18}>2023.07.10</Typography>
              {/* */}
              <View>
                <View style={[styles.flexBox,{ position:"relative"}]}>
                    <Image style={{width:41,height:55}} source={require('../../images/mypage/historybuildings.png')}/> 
                    <View style={styles.contentInfo}>
                      <Typography fontSize={10} color='#E8726E'>할인 분양 • 즉시입주</Typography>
                      <Typography fontSize={18} marginBottom={2}>만촌 자이르네</Typography>
                      <Typography fontSize={12} color='#878787'>수성구 만촌동 • 607세대</Typography>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('x클릭')} style={{position:"absolute",right:0,top:0,}}>
                      <Ionicons  name="close-outline" size={24} color="#000" /> 
                    </TouchableOpacity>
                </View>
              </View>
              {/* 컴포넌트 한 단위 */}

              <Divider marginVertical={16}/>

              <View>
                <View style={[styles.flexBox,{ position:"relative"}]}>
                    <Image style={{width:41,height:55}} source={require('../../images/mypage/historybuildings.png')}/> 
                    <View style={styles.contentInfo}>
                      <Typography fontSize={10} color='#E8726E'>할인 분양 • 즉시입주</Typography>
                      <Typography fontSize={18} marginBottom={2}>수성 자이르네</Typography>
                      <Typography fontSize={12} color='#878787'>수성구 만촌동 • 219세대</Typography>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('x클릭')} style={{position:"absolute",right:0,top:0,}}>
                      <Ionicons  name="close-outline" size={24} color="#000" /> 
                    </TouchableOpacity>
                </View>
              </View>
            </Layout>

            <Divider marginVertical={18} height={6}/>

            <Layout>
              <Typography fontSize={18} color='#CC5A57' marginBottom={16}>2023.06.10</Typography>
              <View>
                <View style={[styles.flexBox,{ position:"relative"}]}>
                    <Image style={{width:41,height:55}} source={require('../../images/mypage/historybuildings.png')}/> 
                    <View style={styles.contentInfo}>
                      <Typography fontSize={10} color='#E8726E'>할인 분양 • 즉시입주</Typography>
                      <Typography fontSize={18} marginBottom={2}>만촌 자이르네</Typography>
                      <Typography fontSize={12} color='#878787'>수성구 만촌동 • 607세대</Typography>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('x클릭')} style={{position:"absolute",right:0,top:0,}}>
                      <Ionicons  name="close-outline" size={24} color="#000" /> 
                    </TouchableOpacity>
                </View>
              </View>
              <Divider marginVertical={16}/>
              <View>
                <View style={[styles.flexBox,{ position:"relative"}]}>
                    <Image style={{width:41,height:55}} source={require('../../images/mypage/historybuildings.png')}/> 
                    <View style={styles.contentInfo}>
                      <Typography fontSize={10} color='#E8726E'>할인 분양 • 즉시입주</Typography>
                      <Typography fontSize={18} marginBottom={2}>수성 자이르네</Typography>
                      <Typography fontSize={12} color='#878787'>수성구 만촌동 • 219세대</Typography>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('x클릭')} style={{position:"absolute",right:0,top:0,}}>
                      <Ionicons  name="close-outline" size={24} color="#000" /> 
                    </TouchableOpacity>
                </View>
              </View>
            </Layout>
          </View>}

          {/* 최근 본 게시물 클릭했을때   */}
          {isClicked.posts && 
            <Layout>
              <Typography fontSize={18} color='#CC5A57' marginBottom={16}>2023.07.10</Typography>
              <View>
                <View style={[styles.flexBox,{ position:"relative"}]}>
                    <Image style={{width:41,height:55}} source={require('../../images/mypage/posts.png')}/> 
                    <View style={styles.contentInfo}>
                      <Typography fontSize={10} color='#E8726E'>부동산 이슈 Top 5</Typography>
                      <Typography fontSize={18}>전세사기 이슈</Typography>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('x클릭')} style={{position:"absolute",right:0,top:0,}}>
                      <Ionicons  name="close-outline" size={24} color="#000" /> 
                    </TouchableOpacity>
                </View>
              </View>
              <Divider marginVertical={16}/>
              <View>
                <View style={styles.flexBox}>
                    <Image style={{width:41,height:55}} source={require('../../images/mypage/posts.png')}/> 
                    <View style={styles.contentInfo}>
                      <Typography fontSize={10} color='#E8726E'>부동산 이슈 Top 5</Typography>
                      <Typography fontSize={18}>전세사기 이슈</Typography>
                    </View>
                    <TouchableOpacity onPress={() => Alert.alert('x클릭')} style={{position:"absolute",right:0,top:0,}}>
                      <Ionicons  name="close-outline" size={24} color="#000" /> 
                    </TouchableOpacity>
                </View>
              </View>
            </Layout>}
        </ScrollView>
        <TouchableOpacity style={{paddingHorizontal:24}} onPress={() => props.navigation.goBack()}>
          <View style={styles.confirmButton}>
            <Typography fontSize={16} color='#fff'>확인</Typography>
          </View>
        </TouchableOpacity> 
      </View>
    </View>
    
   );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    justifyContent:"space-between"
  },
  flexBox:{
    flexDirection:"row",
    alignItems:"center"
  },
  title:{
    flexDirection:'row',
  },
  titleText:{
    fontSize:16,
    color: '#1B1B1B',
    fontWeight:'bold',
  },
  tabButton:{
    width:"50%",
    borderBottomWidth:2,
    paddingVertical:18,
    alignItems:"center"
  },
 clearAllButton:{
  fontSize:12,
  color:'#595959',
  fontWeight: "500",
  marginTop:12,
  textDecorationLine: "underline"
 },
 contentInfo:{
  marginLeft:18,
 },
 confirmButton:{
    backgroundColor: "#E8726E",
    borderRadius:16,
    paddingVertical:18,
    paddingHorizontal:20,
    marginBottom:20,
    alignItems:"center"
  
 }
});

