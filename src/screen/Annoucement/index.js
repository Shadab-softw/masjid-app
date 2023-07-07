/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import CONSTANT from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BgImage } from '../../component/ImageContainer';
import { Tab } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import Entypo from 'react-native-vector-icons/dist/Entypo';
import { FeaturedAnnounce, NewAnnounce } from './AnnounceList';

const AnnounceScreen = ({ navigation, showData }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [newAnnounce, setNewAnnounce] = useState(true);
  const [featuredAnnounce, setFeaturedAnnounce] = useState(true);

  const data = [
    {
      id: 1,
      title: 'New',
    },
    {
      id: 2,
      title: 'Featured ',
    },
    {
      id: 3,
      title: 'Past announcement',
    },
  ];

  const announceData = [
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
      id: 2,
      title: 'Announcement two ',
      desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
    },
    {
      id: 2,
      title: 'Announcement two ',
      desc: "Hello folks! We are going to conduct a session on Scrum and it's process. Details will be posted soon.",
    },
  ];
  const onchangeTab = item => {
    setSelectedIndex(item.id);
    if (item.id === 1) {
      setFeaturedAnnounce(true);
      setNewAnnounce(true);
    }
    if (item.id === 2) {
      setFeaturedAnnounce(true);
      setNewAnnounce(false);
    }
  };
  return (
    <BgImage>
      <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // bottom: 250,
              top: 28,
            }}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={25} color="#ffffff" />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                // fontWeight: '600',
                left: 60,
                top: 4,
              }}>
              Announcements
            </Text>
          </View>
        </View>
        {/* <ScrollView
          style={{zIndex: 1, top: 25}}
          horizontal={true}
          contentContainerStyle={{height: 200}}
          showsHorizontalScrollIndicator={false}>
          {data.map(item => {
            console.log('hhhu', item.title);
            return (
              <>
                <View key={item.id} style={{height: 100}}>
                  <Tab
                    value={true}
                    onChange={() => onchangeTab(item)}
                    key={item.id}
                    indicatorStyle={[
                      selectedIndex === 0 && styles.borderTab,
                      {
                        width: item.id === selectedIndex ? 30 : 0,
                        borderBottomWidth: item.id === selectedIndex ? 3 : 0,
                        borderBottomColor:
                          item.id === selectedIndex ? '#A7C829' : 'none',
                        marginLeft: 10,
                      },
                    ]}>
                    <Tab.Item
                      title={item.title}
                      titleStyle={{
                        color: '#A7C829',
                        fontSize: 18,
                        textTransform: 'none',
                        marginLeft: -15,
                      }}
                    />
                  </Tab>
                </View>
              </>
            );
          })}
        </ScrollView> */}
        <ScrollView
          verticle={true}
          style={{ top: 55 }}
          // contentContainerStyle={{paddingBottom: 180}}
          // onTouchMove={scroll}
          showsVerticalScrollIndicator={false}>
          {/* {selectedIndex === 1 && ( */}
          {newAnnounce && (
            <NewAnnounce
              navigation={navigation}
            //  handleRefresh={onRefreshHandler}
            />
          )}
          {/* )} */}
          {/* {selectedIndex === 2 && ( */}
          {/* {featuredAnnounce && (
            <FeaturedAnnounce
              navigation={navigation}
              // handleRefresh={onRefreshHandler}
            />
          )} */}
          {/* )} */}
        </ScrollView>
      </View>
    </BgImage>
  );
};
export default AnnounceScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#515151',
    marginTop: 23,
    borderRadius: 10,
    height: 155,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  announceBox: {
    height: 125,
    borderRadius: 10,
    width: 337,
    backgroundColor: 'rgba(98,98,98,.3)',
    marginTop: 15,
    left: 13,
    // position: 'absolute',
  },
  title: {
    color: '#fff',
    fontSize: 20,
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
    backgroundColor: 'rgba(98,98,98,.4)',
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
  },
});
