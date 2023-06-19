/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { BgImage } from '../../component/ImageContainer';
import {
  View, Text, StyleSheet, Alert, TouchableOpacity, Button,
} from 'react-native';
import { ListItem, Avatar, Badge } from 'react-native-elements';
import CustomHeader from '../../component/CustomHeader';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import CONSTANT from '../../constants';
import { getChatApi, getImamChatApi, imamListApi, userListApi } from '../../services/chatApi';
import { useAuth } from '../../hook/useAuth';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';


const UserListScreen = ({ navigation }) => {

  const [chatlist, setChatlist] = useState([]);
  const [userlist, setUserlist] = useState();
  const [request, setRequest] = useState(0);
  const { auth, state } = useAuth();
  const [isCheck, setIscheck] = useState('');
  const isFocused = useIsFocused();
  // const userRole=state.user.user_role
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    //  Alert.alert('Message handled in the background!', JSON.stringify(remoteMessage));
    getImamList();
    UserListScreen();
    });

    return unsubscribe;
  }, []);
  const getImamList = async () => {
    const data = {
      reciever_id: state.user.id,
    };
    const result = await imamListApi(data);
    if (request > 0){
      setRequest(0);
      let totalMessage = 0;
      result?.data?.map((i,index)=>{
      totalMessage = i?.unread_count + totalMessage;
    });
    setRequest(totalMessage);
    } else {
      let totalMessage = 0;
      result?.data?.map((i,index)=>{
      totalMessage = i?.unread_count + totalMessage;
    });
    setRequest(totalMessage);
    }

    setChatlist(result.data);
  };
  // useEffect(async()=>{
  //   if(isFocused){
  //    await getUserList()
  //    await userListApi()
  //   }
  // },[state.user])
  useEffect(async() => {

    if (isFocused){
     await getUserList();
     await getImamList();
    }
  if (state.user !== undefined) {
      setIscheck(state.user.user_role);
    }
  }, [state.user,isFocused,getUserList]);

  const getUserList = async () => {
    const data = {
      reciever_id: state.user.id,
    };

    const result = await userListApi(data);
    if (request > 0){
      setRequest(0);
      let totalMessage = 0;
      result?.data?.map((i,index)=>{
      totalMessage = i?.unread_count + totalMessage;
    });
    setRequest(totalMessage);
    } else {
      let totalMessage = 0;
      result?.data?.map((i,index)=>{
      totalMessage = i?.unread_count + totalMessage;
    });
    setRequest(totalMessage);
    }

    setUserlist(result.data);
  };

  // useEffect(async()=>{
  //   await userChatHandler();
  //  },[]);

  //  const userChatHandler = async () => {

  //    const data = {
  //      senderId: imamId,
  //      recieverId:state.user.id,
  //    };
  //    const result = await getChatApi(data);
  //  };

  return (

    <BgImage>
      <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-chevron-back" color={'#FFFFFF'} size={25} />
        </TouchableOpacity>
        <Text style={{ color: '#FFFFFF', fontSize: 22, marginLeft: 20 }}>Ask Imam - request {`(${request})`}</Text>
      </View>
      <ScrollView>
        {isCheck === 'user' ?
            <View >
              <Text>Today</Text>
              <View >
                {chatlist?.map(item => {
                    return (
                      <>
                          <ListItem key={item.id} containerStyle={{ backgroundColor: 'transparent' }}
                          onPress={() => navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: item.id, imamName:item.first_name, role:item.user_role })}

                        >
                          {/* <Avatar source={item.profileimg} /> */}
                          <ListItem.Content>
                            <View style={{display:'flex', flexDirection:'row'}}>
                            {
                        item.unread_count > 0 ?
                        <Badge status="success" value={item.unread_count}
                        badgeStyle={{backgroundColor:'#A7c829',width:25,height:25,borderRadius:150}}
                        containerStyle={{position:'relative', bottom:10}}
                        />
                        : null
                }
                            <ListItem.Title style={{ color: '#FFFFFF' }}>{item.first_name} {item.last_name}  </ListItem.Title>

                </View>
                            <ListItem.Subtitle style={{ color: '#D3D3D3', fontSize: 10,marginLeft:15 }}>{item.last_name} <Text style={{ marginLeft: 30 }}>23h</Text></ListItem.Subtitle>
                          </ListItem.Content>
                        </ListItem>
                      </>
                    );
                  })
                }
              </View>
            </View>

            :
            <View >

              <Text>Today</Text>
              <View >
                {

                  userlist !== undefined && userlist.map(item => {
                    // console.log("acctepItem", item)
                    return (
                      <>

                        <ListItem key={item.id} containerStyle={{ backgroundColor: 'transparent' }}
                          onPress={() => navigation.navigate(CONSTANT.App.screenNames.Chat, { imamId: item.id, imamName:item.first_name, role:item.user_role })}

                        >
                          {/* <Avatar source={item.profileimg} /> */}
                          <ListItem.Content>
                            <View style={{display:'flex', flexDirection:'row'}}>
                            {
                        item.unread_count > 0 ?
                        <Badge status="success" value={item.unread_count}
                        badgeStyle={{backgroundColor:'#A7c829',width:25,height:25,borderRadius:150}}
                        containerStyle={{position:'relative', bottom:10}}
                        />
                        : null
                }
                            <ListItem.Title style={{ color: '#FFFFFF' }}>{item.first_name} {item.last_name}  </ListItem.Title>

                </View>
                            <ListItem.Subtitle style={{ color: '#D3D3D3', fontSize: 10,marginLeft:15 }}>{item.last_name} <Text style={{ marginLeft: 30 }}>23h</Text></ListItem.Subtitle>
                          </ListItem.Content>
                        </ListItem>
                      </>
                    );
                  })
                }
              </View>
            </View>

        }
      </ScrollView>
    </BgImage>
  );
};

const styles = StyleSheet.create({
  todayStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  imgStyle: {
    width: 50,
    height: 50,
    // backgroundColor:'green'
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },


});
export default UserListScreen;
