/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import CustomButton from '../../component/CustomButton';
import { BgImage } from '../../component/ImageContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import BookList from './BookList';

const BookDetailsScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    titleEn,
    titleAr,
    hadeethsnumber,
    CollectionName,
    number,
    hadeethTitleEn,
    pageCurrent,
    setPageCurrent,
  } = route.params;
  //   console.log('test', hadeethTitleEn);

  console.log('route', route.params);
  useEffect(() => {
    // !data && unsubscribe();
    unsubscribe();
  }, []);
  const unsubscribe = async () => {
    try {
      let response = await fetch(
        `https://api.sunnah.com/v1/collections/${CollectionName}/books/${hadeethsnumber}/hadiths`,
        {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );
      let responseJson = await response.json();
      setData(responseJson.data);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  const removeHtmlEn = text => {
    const regex = /(<([^>]+)>)/gi;
    return text.replace(regex, '');
  };

  const removeHtmlAr = text => {
    const regex = /(<([^>]+)>)/gi;
    return text.replace(regex, '');
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
    setIsLoading(true);
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
            fontSize: 20,
            marginTop: 5,
            // fontWeight: '400',
            marginLeft: 30,
          }}>
          About {titleEn}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            // fontWeight: '600',
            margin: 15,
          }}>
          {number}
        </Text>

        <Text
          style={{
            color: '#a7c829',
            fontSize: 18,
            // fontWeight: '600',
            margin: 15,
            width: '60%',
          }}>
          {titleEn}
        </Text>

        <Text
          style={{
            color: '#a7c829',
            fontSize: 18,
            // fontWeight: '600',
            margin: 15,
          }}>
          {titleAr}
        </Text>
      </View>
      <FlatList
        style={{ overflow: 'hidden' }}
        data={data}
        onRefresh={() => {
          // alert = 'jb';
        }}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={renderFooter}
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={false}
        renderItem={({ item }) => {
          console.log('item', item);
          return (
            <ScrollView
              vertical={true}
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={{paddingBottom: 400}}
              style={{ overflow: 'hidden' }}>
              {data.map(hadees => {
                console.log('hadees>>>>>>>----', hadees.hadith[0].body);
                return (
                  <View key={`hadees-list-${hadees.hadith[0].chapterId}`}>
                    <View style={styles.container}>
                      <View style={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: '100%',
                            paddingHorizontal: 10,
                            marginTop: 10
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              // fontWeight: '400',
                              margin: 10,
                            }}>
                            Chapter: {hadees.hadith[0].chapterTitle}
                            {/* ({hadees.hadith[0].chapterNumber}) */}
                          </Text>

                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              // fontWeight: '400',
                              margin: 10,
                              lineHeight: 20,
                            }}>
                            {/* Chapter: {hadees.hadith[0].chapterTitle} */}
                            ({hadees.hadith[0].chapterNumber})
                          </Text>
                        </View>

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: '100%',
                            paddingHorizontal: 0,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              // fontWeight: '400',
                              // margin: 5,
                              textAlign: 'center',

                            }}>
                            ({hadees.hadith[1].chapterNumber})
                            {/* {hadees.hadith[1].chapterTitle} */}
                          </Text>

                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 16,
                              // fontWeight: '400',
                              // margin: 10,
                              textAlign: 'center',
                            }}>
                            {/* ({hadees.hadith[1].chapterNumber}) */}
                            {hadees.hadith[1].chapterTitle}
                          </Text>
                        </View>

                      </View>
                    </View>
                    <View style={styles.container}>
                      <View style={styles.announceBox}>
                        <Text
                          style={{
                            color: 'white',
                            marginHorizontal: 10,
                            marginVertical: 10,
                            fontSize: 15,
                            lineHeight: 20,

                          }}>
                          {/* {hadees.hadith[0].body.split(':') && */}
                          {removeHtmlEn(hadees.hadith[0].body)}
                          {/* } */}
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            marginHorizontal: 10,
                            marginVertical: 10,
                            fontSize: 15,
                            lineHeight: 20,
                            color: '#A7C829',
                          }}>
                          {removeHtmlAr(hadees.hadith[1].body)}
                        </Text>

                        {/* <HTMLView value={hadees.hadith[1].body} /> */}
                      </View>
                      {/* </View> */}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          );
        }}
        keyExtractor={(item, index) => item.key}
      />
    </BgImage>
  );
};

export default BookDetailsScreen;

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
  container1: {
    width: '100%',
    backgroundColor: 'rgba(98,98,98,.3)',
    marginTop: 28,
    borderRadius: 10,

    // paddingBottom: 30,
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
