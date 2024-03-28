import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import {launchImageLibrary, ImageLibraryOptions, Asset} from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import MainURL from "../../MainURL";
import AsyncGetItem from '../AsyncGetItem'
import Entypo from 'react-native-vector-icons/Entypo';
import { Typography } from '../Components/Typography';
import { SubTitle } from '../Components/SubTitle';
import { Divider } from '../Components/Divider';

function Post(props: any) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageNames, setImageNames] = useState<string[]>([]);

  // 수정기능
  const route : any = useRoute();
  const { post, editMode } = route.params;

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
   
  useEffect(() => {
    asyncFetchData();
    if (post !== null && editMode !== null) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      return
    }
  }, [editMode, post]);

  
  const createPost = async () => {
    

    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 19);

    if (post !== null && editMode !== null) {
      // 기존 글 수정 처리
      axios
        .post(`${MainURL}/board/posts/${post.id}/edit`, {
          title: title, content: content
        })
        .then((res) => {
          if (res.data === true) {
            Alert.alert('수정되었습니다.');
            props.navigation.replace('Main');
          } else {
            Alert.alert(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(`${MainURL}/board/posts`, {
          title: title, content: content, date: currentDate,
          userAccount : asyncGetData.userAccount, userNickName: asyncGetData.userNickName
        })
        .then((res) => {
          if (res.data === true) {
            Alert.alert('입력되었습니다.');
            props.navigation.replace('Main');
          } else {
            Alert.alert(res.data)
          }
        })
        .catch(() => {
          console.log('실패함')
        })
    }    
  };

  const closeDetail = () => {
    props.navigation.goBack();
  };

  // 사진 첨부 함수 -----------------------------------------------------------------
  const [images, setImages] = useState<Asset[]>([]);
  const showPhoto = async ()=> {
    const option: ImageLibraryOptions = {
        mediaType : "photo",
        selectionLimit : 3,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: Platform.OS === 'android'
    }
    await launchImageLibrary(option, async(res) => {
      if(res.didCancel) Alert.alert('취소')
      else if(res.errorMessage) Alert.alert('Error : '+ res.errorMessage)
      else {
        const uris: Asset[] = res.assets || [];
        setImages(uris);
      }
    }) 
  }

  const alertPushPhoto = () => {
    if (imageNames.length > 0) {
      Alert.alert(
        '기존의 사진은 모두 지워지며, 다시 새로 업로드해야 합니다.',
        '업로드 하시겠습니까?',
        [
          { text: '취소', onPress: () => {} },
          { text: '업로드', onPress: () => {
            setImageNames([]);
            deleteImage();
            showPhoto();
          }},
        ]
      );
    } else {
      Alert.alert(
        '사진은 최대 3장까지만 업로드 할 수 있습니다.',
        '업로드 하시겠습니까?',
        [
          { text: '취소', onPress: () => {} },
          { text: '업로드', onPress: showPhoto },
        ]
      );
    }
  };

   // 이미지 삭제
   const deleteImage = async () => {
    if (imageNames.length > 0) {
      try {
        await axios.post(`${MainURL}/mypage/deleteimage`, {
          imageNames : imageNames
        });
        Alert.alert('기존의 사진이 모두 삭제되었습니다.');
      } catch (error) {
        console.error('실패함', error);
        Alert.alert('다시 시도해 주세요.');
      }
    } else {
      return
    }
  };

  const alertDeletePhoto = () => {
    Alert.alert(
      '기존의 사진은 모두 지워지며, 다시 새로 업로드해야 합니다.',
      '정말 모두 삭제 하시겠습니까?',
      [
        { text: '취소', onPress: () => { return } },
        { text: '삭제하기', onPress: deleteImage},
      ]
    );
  };


  return (
    <ScrollView style={styles.container}>
      <SubTitle title='글쓰기' navigation={props.navigation}/>
      <Divider height={2} />
      <View style={styles.section}>
      <View style={styles.userBox}>
        <Typography><Entypo name="pencil" size={20} color="black"/> </Typography>
        <Typography>{asyncGetData.userNickName} </Typography>
      </View>

      {
          images?.length > 0 || imageNames?.length > 0 
          ?
          <TouchableOpacity
            onPress={()=>{
              setImageNames([""]);
              setImages([]);
              alertDeletePhoto();
            }}
          >
            <View style={{width:100, height:30, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                          alignItems:'center', justifyContent:'center'}}>
              <Typography color='#8C8C8C' fontSize={12}>사진모두삭제</Typography>
            </View>
          </TouchableOpacity>
          : 
          <View></View>
        }
      
      <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:"center"}}>
      
        {
          imageNames?.length > 0
          &&
          <View style={{height:100, flexDirection:'row', justifyContent:'space-between', alignItems:"center"}}>
            {
              imageNames?.map((item:any, index:any)=>{
                return (
                  <View 
                    key={index}
                    style={{width:100, height:100, margin:5}}
                  >
                      <Image style={{width:'100%', height:'100%', resizeMode:'cover'}} 
                        source={{ uri: `${MainURL}/images/upload_profile/${item}`}}/>
                  </View>
                )
              })
            }
          </View>
        }
        {images?.map((image, index) => (
          <View key={index} style={{ width: 100, height: 100, margin: 5  }}>
            <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', borderRadius:10 }} />
          </View>
        ))}
        <TouchableOpacity
          onPress={alertPushPhoto}
        >
          <View style={{width:100, height:100, borderWidth:1, borderColor:'#8C8C8C', borderRadius:5,
                        alignItems:'center', justifyContent:'center', marginHorizontal:5, marginVertical:10}}>
            <Entypo name="plus" size={20} color="#8C8C8C"/>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.addPostBox}>
        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
          multiline
        />
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="내용"
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>

      <View style={{flexDirection:'row', justifyContent:'center', marginTop: props.marginTop ?? null, marginBottom: props.marginBottom ?? null}}>
          
      <View style={styles.ButtonBox}>
        <TouchableOpacity 
          style={styles.Button} 
          onPress={closeDetail}>
          <Typography>취소</Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.ButtonBox}>
        <TouchableOpacity 
          style={styles.Button} 
          onPress={createPost}>
          <Typography>작성</Typography>
        </TouchableOpacity>
      </View>

    </View>
      
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  section : {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  addPostBox: {
    marginBottom: 8,
    padding:10
  },
  addTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userBox: {
    padding:15,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    height: 'auto',
    color: '#333'
  },
  titleInput: {
    minHeight: 40,
  },
  contentInput: {
    minHeight: 200,
    textAlignVertical: 'top',
  },
  ButtonBox: {
    width: '48%',
    alignItems:'center',
    marginBottom:20,
  },
  Button: {
    width: '90%',
    borderWidth:1, 
    borderColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
});

export default Post;
