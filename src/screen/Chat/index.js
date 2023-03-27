/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from "react";
import { BgImage } from "../../component/ImageContainer";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import { TextInput } from "react-native-gesture-handler";
import messaging from "@react-native-firebase/messaging";
import {
  getChatApi,
  getImamChatApi,
  postChatApi,
} from "../../services/chatApi";
import { useAuth } from "../../hook/useAuth";
import { timeago } from "../../util/commen";
import _sortBy from "lodash";

const ChatScreen = ({ navigation, route }) => {
  const { imamId, imamName, role } = route.params;
  const [text, setText] = useState("");
  const [dataChat, setDataChat] = React.useState([]);
  const [imamChat, setImamChat] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [isCheck, setIscheck] = useState("");

  const { auth, state } = useAuth();
  let listView;
  const fetchUserData = async () => {
    const result = await AsyncStorage.getItem("user");
  };

  const datClone = JSON.parse(JSON.stringify(dataChat));
  const sortedActivities = datClone.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const userChatHandler = async () => {
    const data = {
      senderId: imamId,
      recieverId: state.user.id,
    };
    const result = await getChatApi(data);

    if (result) {
      const sortedActivities = result.chat.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setDataChat(sortedActivities);
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('Message handled in the background!',JSON.stringify(remoteMessage),);
      apisHandlers();
      userChatHandler();
      setRefreshing(!refreshing);
    });

    return unsubscribe;
  }, []);

  const imamChatHandler = async () => {
    const data = {
      senderId: 1,
      recieverId: 26,
    };
    const result = await getImamChatApi(data);

    if (result) {
      setImamChat(result.chat);
    }
  };
  const apisHandlers = async () => {
    await userChatHandler();
    await imamChatHandler();
  };

  useEffect(async () => {
    await userChatHandler();
    await imamChatHandler();
  }, [imamId, state.user, refreshing]);

  useEffect(() => {
    if (role === "imam") {
      setIscheck(imamName);
    }
  }, []);

  const onSendMessage = async () => {
    var d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const timeForm = h + ":" + m;
    var data = {
      sender_id: state.user.id,
      reciever_id: imamId,
      text: text,
      time: timeForm,
    };
    const result = await postChatApi(data);
    if (result) {
      setDataChat([...dataChat, data]);
      const againHitApi = await userChatHandler();
      setRefreshing(!refreshing);
      // await imamChatHandler()
    }
    setText("");
  };

  const flatList = React.useRef(null);

  return (
    <BgImage>
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-chevron-back" color={"#FFFFFF"} size={25} />
        </TouchableOpacity>
        <Text style={{ color: "#FFFFFF", fontSize: 18, marginLeft: 15 }}>
          {isCheck === imamName
            ? `Chat With Imam ${imamName}`
            : `Chat With ${imamName}`}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "rgba(0, 6, 16, 1)",
          height: 100,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <TextInput
          onChangeText={(value) => setText(value)}
          value={text}
          multiline={true}
          placeholder="Message...."
          placeholderTextColor={"#FFFFFF"}
          style={{
            width: "80%",
            backgroundColor: "rgba(157, 157, 157, 0.2)",
            borderRadius: 15,
            color: "#FFFFFF",
          }}
        />
        <TouchableOpacity onPress={() => onSendMessage()}>
          <Ionicons name="send" color={"#FFFFFF"} size={30} />
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ref={flatList}
        onContentSizeChange={() => {
            flatList.current.scrollToEnd();
        }}
      > */}
      <View style={{ marginBottom: 160 }}>
        <FlatList
          data={dataChat}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const d = new Date(item.created_at);
            const h = d.getHours();
            const m = d.getMinutes();
            let agotime = timeago(d);
            const timeForm = h + ":" + m;
            return (
              <View>
                <View
                  style={{
                    marginVertical: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {state.user.id != item.sender_id ? (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "flex-start",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor:
                            state.user.id == item.sender_id
                              ? "#00BF9D"
                              : "#A758EB",
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 10,
                          padding: 8,
                        }}
                      >
                        {text !== null && (
                          <Text style={{ color: "#FFFFFF", fontSize: 18 }}>
                            {item.text}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          position: "absolute",
                          left: 0,
                          marginTop: -20,
                        }}
                      >
                        <Text style={{ color: "grey" }}>{agotime}</Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          right: 0,
                          marginTop: -20,
                        }}
                      >
                        <Text style={{ color: "grey" }}>{agotime}</Text>
                      </View>

                      <View
                        style={{
                          backgroundColor:
                            state.user.id == item.sender_id
                              ? "#00BF9D"
                              : "#A758EB",
                          borderTopStartRadius: 14,
                          borderBottomLeftRadius: 14,
                          borderBottomEndRadius: 14,
                          padding: 10,
                        }}
                      >
                        {text !== null && (
                          <Text style={{ color: "#FFFFFF", fontSize: 17 }}>
                            {item.text}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
          inverted
        />
      </View>

      {/* <FlatList
          data={imamChat}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#A758EB', margin: 10, flexDirection: 'row', alignSelf: 'flex-start', borderTopStartRadius: 50, borderBottomLeftRadius: 50, borderBottomEndRadius: 30, padding: 10 }}>
                  {
                    imamChat && (
                      <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.text}</Text>

                    )
                  }
                </View>
              </View>
            )
          }}
        /> */}

      {/* </ScrollView> */}
    </BgImage>
  );
};

export default ChatScreen;
