/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../component/CustomButton';
import { BgImage } from '../../component/ImageContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import CONSTANT from '../../constants';

const HadithsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  // const [currPage, setCurrPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    // !data && unsubscribe();
    unsubscribe();
  }, []);
  const unsubscribe = async () => {
    try {
      let response = await fetch(
        `https://api.sunnah.com/v1/collections?limit=100&page=${pageCurrent}`,
        {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );
      let responseJson = await response.json();
      console.log('response', responseJson.data);
      setData(responseJson.data);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };
  const renderFooter = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator
          style={{ marginBottom: 10 }}
          color="#a7c829"
          size="large"
        />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(false);
  };
  return (
    <BgImage>
      <View
        style={{
          top: 30,
          height: 80,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            // fontWeight: '500',
            marginLeft: 40,
          }}>
          Hadith 
        </Text>
      </View>

      <FlatList
        style={{ overflow: 'hidden' }}
        data={data}
        onRefresh={() => {
          // alert = 'jb';
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={false}
        renderItem={({ item }) => {
          console.log('item', item);
          return (
            <ScrollView
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={{ overflow: 'hidden' }}>
              <TouchableOpacity style={{ height: 'auto', width: '100%', margin: 0, }}
                onPress={() =>
                  navigation.navigate(
                    CONSTANT.App.screenNames.HadeethsInfoScreen,
                    {
                      hadeethTitleEn: item.collection[0].title,
                      hadeethTitleAr: item.collection[1].title,
                      name: item.name,
                      desc: item.collection[0].shortIntro,
                      pageCurrent: pageCurrent,
                      setPageCurrent: setPageCurrent,
                    },
                  )
                }>
                <View style={styles.container}>
                  <View style={styles.announceBox}>
                    {/* <Text
                      style={{
                        color: '#a7c829',
                        fontSize: 19,
                        // fontWeight: '500',
                        margin: 10,
                        marginBottom: 0,
                        marginLeft: 20,
                        // width: '60%',
                      }}>
                      {item.name}
                    </Text> */}
                    {console.log(item.collection[1].title)}
                    <View style={{}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // width: '100%',
                          // marginLeft:20,
                        }}>
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              // fontWeight: '400',
                              margin: 10,
                              marginBottom: 0,
                              marginLeft: 20,
                              // width: '90%',
                            }}>
                            {item.collection[0].title}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              // fontWeight: '400',
                              margin: 10,
                              marginBottom: 0,
                              marginRight: 20,
                              width: '80%',
                            }}>
                            {item.collection[1].title}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
        keyExtractor={(item, index) => item.key}
      />
    </BgImage>
  );
};

export default HadithsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(98,98,98,.3)',
    marginTop: 28,
    borderRadius: 10,

    paddingBottom: 30,
    paddingTop: 5,
    // height: 145,
    // flexDirection: 'row',
  },
  image: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
