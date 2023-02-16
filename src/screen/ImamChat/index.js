import React, { useEffect, useState } from 'react'

import { BgImage } from '../../component/ImageContainer'
import {
  View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, TextComponent
} from 'react-native'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import CustomInput from '../../component/InputFileds';
import { getChatApi, messgageSendByImam, getImamChatApi } from '../../services/chatApi';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


const ImamChatScreen = () => {
  const [data, setData] = React.useState();
  const [text, setText] = useState('')
  const [imamChat, setImamChat] = useState()


  useEffect(() => {
    onRecievedMessage()
    imamChatHandler()
  }, [])
  const imamChatHandler = async () => {
    console.log("imamChatHandler")
    const data = {
      senderId: 1,
      recieverId: 26
    }
    const result = await getImamChatApi(data)
    console.log("resulaaaaaaaaaaat", result.chat)

    if (result) {
      setImamChat(result.chat)
    }




  }

  const onRecievedMessage = async () => {
    const data = {
      senderId: 26,
      recieverId: 1
    }
    const result = await getChatApi(data)
    // console.log("result", result)

    if (result) {
      setData(result.chat)
    }


  }

  const selectData=useSelector(state=>state)
  console.log(selectData)
  const onSendMessage = async () => {
    // console.log(text)
    // let formData = new FormData();    //formdata object
    // formData.append('text', 'text'); 
    // formData.append("id")  //append the values with key, value pair;
    var data = {
      sender_id: 1,
      reciever_id: 26,
      text: text,
      time: new Date().getTime()
    }
    const result = await messgageSendByImam(data)
    // console.log("ffffff",result)
    if (result.status === 200) {
      onRecievedMessage()
    }
    setText('')

  }


  return (
    <BgImage>
      <View style={{
        backgroundColor: 'rgba(0, 6, 16, 1)', width: '100%',
        height: 100, position: 'absolute',
        bottom: 0, left: 20,
        flexDirection: 'row', justifyContent: 'space-around',
        alignItems: 'center', overflow: 'hidden', zIndex: 1
      }}>
        <TextInput
          onChangeText={value => setText(value)}
          value={text}
          multiline={true}
          placeholder="Message"
          placeholderTextColor={'#FFFFFF'}
          style={{ width: '80%', backgroundColor: 'rgba(157, 157, 157, 0.2)', borderRadius: 15, color: '#FFFFFF' }}


        />
        <TouchableOpacity onPress={() => onSendMessage()}>
          <Ionicons name="send" color={'#FFFFFF'} size={30} />

        </TouchableOpacity>

      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <FlatList
          data={data}
          renderItem={({ item }) => {
            console.log("item", item)

            if (item.useId === userid) {
              return (
                <View style={{}}>
                  <View style={{ backgroundColor: '#A758EB', margin: 10, flexDirection: 'row', alignSelf: 'flex-start', borderBottomLeftRadius: 20, borderTopRightRadius: 50, borderBottomEndRadius: 50, padding: 10 }}>
                    {
                      data && (
                        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.text}</Text>

                      )
                    }
                  </View>
                </View>
              )
            } else {
              return (
                <View style={{}}>
                  <View style={{ backgroundColor: '#A758EB', margin: 10, flexDirection: 'row', alignSelf: 'flex-start', borderBottomLeftRadius: 20, borderTopRightRadius: 50, borderBottomEndRadius: 50, padding: 10 }}>
                    {
                      data && (
                        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.text}</Text>

                      )
                    }
                  </View>
                </View>
              )
            }


          }}
          inverted={-1}
        />

        <FlatList
          data={imamChat}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#00BF9D', marginVertical: 10, flexDirection: 'row', alignSelf: 'flex-end', borderTopStartRadius: 50, borderBottomLeftRadius: 50, borderBottomEndRadius: 30, padding: 10 }}>
                  {
                    imamChat && (
                      <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.text}</Text>

                    )
                  }
                </View>
              </View>
            )
          }}
          inverted={-1}
        />

      </ScrollView>
    </BgImage>
  )
}

export default ImamChatScreen