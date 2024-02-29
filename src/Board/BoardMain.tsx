import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import MainURL from "../../MainURL";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncGetItem from '../AsyncGetItem';
import { Typography } from '../Components/Typography';
import DateFormmating from '../Components/DateFormmating';
import { Divider } from '../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface PostsProps {
  id: string;
  sort: string;
  title: string;
  content :string;
  views: string;
  isLiked: string;
  commentCount : string;
}

export default function BoardMain (props: any) {

  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [postsViewList, setPostsViewList] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  
  useEffect(() => {
    asyncFetchData();
    fetchPosts();
  }, [refresh]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/board/posts/get`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPosts(copy);
      setPostsViewList(copy);
    });
  };

  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openPostDetails = async (post: any) => {
    // 조회수 증가시킨 후에, 디테일 페이지로 넘어가기
    axios.post(`${MainURL}/board/posts/${post.id}/views`).then(()=>{
        setRefresh(!refresh);
        props.navigation.navigate('Detail', { data: post, user: asyncGetData });
      }).catch((error)=>{
        console.error(error);
      })
    props.navigation.navigate('Detail', { data: post, user: asyncGetData });
  };

  const renderPreview = (content : string) => {
    if (content?.length > 20) {
      return content.substring(0, 20) + '...';
    }
    return content;
  };

  const goToPostScreen = () => {
    props.navigation.navigate('Post', { post: null, editMode: null})
  };


  const handlePostListFilter = (sortText : string) => {
    const copy = posts.filter((e:any)=> e.sort === sortText);
    setPostsViewList(copy);
  }

  return (
    <View style={{flex:1}}>
      <ScrollView  style={styles.container}>

        {/* title */}
        <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
          <Typography fontSize={18}>커뮤니티</Typography>
          <View style={{flexDirection:'row', width:60, justifyContent:'space-between'}}>
            <TouchableOpacity 
              onPress={()=>{
                
              }}>
              <Feather name="search" size={22} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{
                
              }}>
              <Feather name="bell" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingHorizontal:20, paddingBottom:15,flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity 
            style={{alignItems:'center', marginRight:10}}
            onPress={()=>{
              setPostsViewList(posts);
            }}>
            <Image source={require('../images/board/sort.png')} style={{width:25, height:25, marginBottom:5}}/>
            <Typography fontSize={14} color='#8B8B8B'>전체</Typography>
          </TouchableOpacity>
          <View style={{width:2, height:30, backgroundColor:'#F5F4F3'}}></View>
          <TouchableOpacity 
            style={{alignItems:'center', marginHorizontal:10}}
            onPress={()=>{
              handlePostListFilter('분양정보');
            }}>
            <Image source={require('../images/board/icon1.png')} style={{width:25, height:25, marginBottom:5}}/>
            <Typography fontSize={14} color='#8B8B8B'>분양정보</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{alignItems:'center', marginHorizontal:10}}
            onPress={()=>{
              handlePostListFilter('급매정보');
            }}>
            <Image source={require('../images/board/icon2.png')} style={{width:25, height:25, marginBottom:5}}/>
            <Typography fontSize={14} color='#8B8B8B'>급매정보</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{alignItems:'center', marginHorizontal:10}}
            onPress={()=>{
              handlePostListFilter('경매공매');
            }}>
            <Image source={require('../images/board/icon3.png')} style={{width:25, height:25, marginBottom:5}}/>
            <Typography fontSize={14} color='#8B8B8B'>경매・공매</Typography>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{alignItems:'center', marginHorizontal:10}}
            onPress={()=>{
              handlePostListFilter('부동산정책');
            }}>
            <Image source={require('../images/board/icon4.png')} style={{width:25, height:25, marginBottom:5}}/>
            <Typography fontSize={14} color='#8B8B8B'>부동산정책</Typography>
          </TouchableOpacity>
        </View>

                
        <Divider height={5} />

        <View style={styles.section}>
          <View style={styles.postBox}>
            {postsViewList.length > 0
             ? (
              postsViewList.map((post: any, index:any) => {
                return (
                  <TouchableOpacity
                    style={styles.postContainer}
                    key={index}
                    onPress={() => openPostDetails(post)}
                  >
                    <View style={styles.postAuthor}>
                      <View style={{flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'#F5F4F3', borderRadius:5, padding:3 }}>
                        {post.sort === '분양정보' && <Image source={require('../images/board/icon1.png')} style={{width:15, height:15, marginRight:5}}/>}
                        {post.sort === '급매정보' && <Image source={require('../images/board/icon2.png')} style={{width:20, height:20, marginRight:5}}/>}
                        {post.sort === '경매공매' && <Image source={require('../images/board/icon3.png')} style={{width:15, height:15, marginRight:5}}/>}
                        {post.sort === '부동산정책' && <Image source={require('../images/board/icon4.png')} style={{width:15, height:15, marginRight:5}}/>}
                        <Typography color='#6F6F6F' fontSize={12} fontWeightIdx={2}>{post.sort}</Typography>
                      </View>
                      <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={2}>{DateFormmating(post.date)}</Typography>
                    </View>
                    <View style={{marginBottom:10}}>
                      <Typography marginBottom={8}>{renderPreview(post.title.trim())}</Typography>
                      <Typography fontSize={14} marginBottom={5} fontWeightIdx={2}>{renderPreview(post.content.trim())}</Typography>
                    </View>
                    <View style={styles.postFooter}>
                      <View style={{flexDirection:'row', marginRight:20}}>
                        <Image source={require('../images/board/namecircle.png')} style={{width:20, height:20, marginRight:3}}/>
                        <Typography fontSize={14} color='#000' fontWeightIdx={1}>{post.userNickName}</Typography>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Typography fontSize={12} color='#C1C1C1' fontWeightIdx={1}>조회 {post.views}  </Typography>
                        <Typography fontSize={12} color='#C1C1C1' fontWeightIdx={1}>공감 {post.isLiked}  </Typography>
                        <Typography fontSize={12} color='#C1C1C1' fontWeightIdx={1}>댓글 {post.commentCount}</Typography>
                      </View>
                    </View>
                    <Divider height={2}/>
                  </TouchableOpacity>
                )
              })
            ) : ( 
              <View style={{alignItems:'center'}}>
                <Typography>게시물이 없습니다.</Typography> 
              </View>
            )}
          </View>

          
          {/* <TouchableOpacity
            style={styles.button} 
            onPress={()=>{
              
            }}
          >
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Typography color='#8C8C8C'  fontSize={14}>더보기 </Typography>
              <AntDesign name="down" size={16} color="#8C8C8C"/>
            </View>
          </TouchableOpacity> */}
          
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.newPostButton} onPress={goToPostScreen}>
        <Entypo name="plus" size={25} color="#fff"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section : {
    padding:20
  },
  postBox :{
    flex: 1
  },
  postContainer: {
    padding: 16,
    justifyContent: 'center',
  },
  postAuthor: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555555',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20
  },
  newPostButton: {
    width:50,
    height:50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {
    borderBottomWidth:1,
    borderColor: '#EAEAEA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  }
});


