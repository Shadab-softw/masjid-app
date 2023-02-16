/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Image } from 'react-native';
import CONSTANT from '../../constants';
import { Icon } from 'react-native-elements';

import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { AntDesigns } from '../../constants/Icons';
import ReadMoreComp from './ReadMore';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';

const newAnnounceData = [
  {
    id: 1,
    title: 'Announcement one',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 2,
    title: 'Announcement two ',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 3,
    title: 'Announcement three ',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 4,
    title: 'Announcement four ',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
];
const featuredAnnounceData = [
  {
    id: 1,
    title: 'Announcement five',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 2,
    title: 'Announcement six ',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 3,
    title: 'Announcement seven',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
  {
    id: 4,
    title: 'Announcement eight ',
    desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
  },
];
const DataList = [
  {
    id: 1,
    image: require('../../assets/images/video.png'),
    title: 'Speech | Ikhlaak E Hasna',
    date: '10 min ago',
    time: '1 hour 23 min',
    action: 'Watch Now',
  },
  {
    id: 2,
    image: require('../../assets/images/naat.png'),
    title: 'Kids naat',
    date: '10 min ago',
    time: '1 hour 23 min',
    action: 'Watch Now',
  },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(98,98,98,.3)',
    marginTop: 28,
    borderRadius: 10,
    paddingBottom: 30,
    paddingTop: 5,
    // height: 145,
    flexDirection: 'row',
  },
  // announceBox: {
  //   height: 125,
  //   borderRadius: 10,
  //   width: 337,
  //   backgroundColor: '#515151',
  //   marginTop: 15,
  //   left: 13,
  //   // position: 'absolute',
  // },
  title: {
    color: '#a7c829',
    fontSize: 18,
    // fontWeight: '600',
    top: 5,
    left: 14,
    right: 279,
  },
  banner: {
    width: '100%',
    height: 310,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#515151',
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
  },
});
export const NewAnnounce = ({ showData, navigation, handleRefresh }) => {
  const [newAnnounce, setNewAnnounce] = useState([]);

  const getNewAnnouncement = async () => {
    try {
      let result = await fetch(CONSTANT.Api.Announcement, {
        method: 'post'
      })
      console.log("resJson", resJson)
      const resJson = await result.json()
      if (resJson) {
        console.log('new', resJson.post);

        setNewAnnounce(resJson.post)
      }
    }
    catch (err) {
      console.log("getAnnouncement", err)
    }
  }
  useEffect(() => {
    getNewAnnouncement()
  }, [])
  const myCustomShare = async () => {
    const shareOption = {
      message:
        'Announcement one Qurbani, udhiyah in Arabic, means sacrifice. Every Eid ul-Adha, Muslims sacrifice a goat, sheep, cow or camel – or pay to have one slaughtered on their behalf. The act honours the Prophet Ibrahim’s willingness to sacrifice his son Ismail in obedience to God. By making qurbani, Muslims demonstrate their obedience to Allah. At least one third of the meat from the animal should go to people who are poor or in vulnerable situations. ',
    };
    try {
      const shareResponse = await Share.open(shareOption);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const removeNewHtml = text => {
    const regex = /(<([^>]+)>)/gi;
    return text?.replace(regex, '');
  };
  return (
    <>
      <FlatList
        style={{ overflow: 'hidden' }}
        data={newAnnounce}
        onRefresh={() => {
          // alert = 'jb';
        }}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        renderItem={({ item }) => {
          console.log('lisst', item)
          return (
            <ScrollView
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={{ overflow: 'hidden' }}>
              <View
                style={styles.container}
              // onPress={() => {
              //   navigation.navigate(CONSTANT.App.screenNames.AnnounceDetail);
              // }}
              >
                <View style={styles.announceBox}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableOpacity
                      style={{ right: 10, top: 7 }}
                      onPress={myCustomShare}>
                      <AntDesigns name="sharealt" size={22} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      top: 15,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        color: '#9D9D9D',
                        left: 18,
                        bottom: 5,
                      }}>
                      <AntDesign
                        name="clockcircleo"
                        style={{
                          color: '#9d9d9d',
                          fontSize: 12,
                          lineHeight: 14.5,
                          // fontWeight: '500',
                        }}
                      />
                      <Text
                        style={{
                          color: '#9d9d9d',
                          fontSize: 12,
                          lineHeight: 14.5,
                          // fontWeight: '500',
                          left: 10,
                        }}>
                        3 hour ago
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <ReadMoreComp text={removeNewHtml(item.description)} />
                  </View>
                </View>
              </View>
            </ScrollView>
          );
        }}
        keyExtractor={(item, index) => item.key}
      />
    </>
  );
};
export const FeaturedAnnounce = ({ showData, navigation, handleRefresh }) => {
  const [featAnnounce, setFeatNewAnnounce] = useState([]);

  const getAnnouncement = async () => {
    try {
      let result = await fetch(CONSTANT.Api.Announcement, {
        method: 'post'
      })
      console.log("resJson", resJson)
      const resJson = await result.json()
      if (resJson) {
        console.log('new', resJson.post);

        setFeatNewAnnounce(resJson.post)
      }
    }
    catch (err) {
      console.log("getAnnouncement", err)
    }
  }
  useEffect(() => {
    getAnnouncement()
  }, [])
  const myCustomShare = async () => {
    const shareOption = {
      message:
        'Announcement one Qurbani, udhiyah in Arabic, means sacrifice. Every Eid ul-Adha, Muslims sacrifice a goat, sheep, cow or camel – or pay to have one slaughtered on their behalf. The act honours the Prophet Ibrahim’s willingness to sacrifice his son Ismail in obedience to God. By making qurbani, Muslims demonstrate their obedience to Allah. At least one third of the meat from the animal should go to people who are poor or in vulnerable situations. ',
    };
    try {
      const shareResponse = await Share.open(shareOption);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const removeHtml = text => {
    const regex = /(<([^>]+)>)/gi;
    return text?.replace(regex, '');
  };
  return (
    <>
      <FlatList
        style={{ overflow: 'hidden' }}
        data={featAnnounce}
        onRefresh={() => {
          alert('he');
        }}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        renderItem={({ item }) => {
          return (
            <ScrollView
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={{ overflow: 'hidden' }}>
              <View
                style={styles.container}
              // onPress={() => {
              //   navigation.navigate(CONSTANT.App.screenNames.AnnounceDetail);
              // }}
              >
                <View style={styles.announceBox}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableOpacity
                      style={{ right: 10, top: 7 }}
                      onPress={myCustomShare}>
                      <AntDesigns name="sharealt" size={22} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      top: 15,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        color: '#9D9D9D',
                        left: 18,
                        bottom: 5,
                      }}>
                      <AntDesign
                        name="clockcircleo"
                        style={{
                          color: '#9d9d9d',
                          fontSize: 12,
                          lineHeight: 14.5,
                          // fontWeight: '500',
                        }}
                      />
                      <Text
                        style={{
                          color: '#9d9d9d',
                          fontSize: 12,
                          lineHeight: 14.5,
                          // fontWeight: '500',
                          left: 10,
                        }}>
                        3 hour ago
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <ReadMoreComp text={removeHtml(item.description)} />
                  </View>
                </View>
              </View>
            </ScrollView>
          );
        }}
        keyExtractor={(item, index) => item.key}
      />
    </>
  );
};
