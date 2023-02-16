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
import BookList from './BookList';
import CONSTANT from '../../constants';

const HadeethsInfoScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const { hadeethTitleEn, hadeethTitleAr, name, desc } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageCurrent, setPageCurrent] = useState(1);
  console.log('test', hadeethTitleEn);
  console.log('name', name);
  console.log('route', route.params);
  useEffect(() => {
    // !data && unsubscribe();
    unsubscribe();
  }, []);
  const unsubscribe = async () => {
    try {
      let response = await fetch(
        `https://api.sunnah.com/v1/collections/${name}/books?page=${pageCurrent}`,
        {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );
      let responseJson = await response.json();
      console.log('response>>>', responseJson);
      setData(data.concat(responseJson.data));
      setIsLoading(false);

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
  const bookName = text => {
    const regex = /(<([^>]+)>)/gi;
    return text.replace(regex, '');
  };
  const handleLoadMore = () => {
    // alert("hiiiii")
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
          About {hadeethTitleEn}
        </Text>
      </View>
      {/* <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{paddingBottom: 100}}
        style={{overflow: 'hidden'}}> */}

      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        style={{ overflow: 'hidden' }}>
        <FlatList
          style={{ overflow: 'hidden' }}
          data={data}
          onRefresh={() => {
            // alert = 'jb';
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <TouchableOpacity key={name}>
              <View style={styles.container}>
                <View style={styles.announceBox}>
                  <View style={{}}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // width: '100%',
                      }}>
                      {/* {data.map(item => {
                    return <BookList books={item.book} />;
                  })} */}
                      <View>
                        <Text
                          style={{
                            color: '#A7C829',
                            fontSize: 16,
                            // fontWeight: '400',
                            marginVertical: 15,
                            marginHorizontal: 10
                          }}>
                          {hadeethTitleEn}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#A7C829',
                            fontSize: 16,
                            // fontWeight: '400',
                            marginVertical: 15,
                            marginHorizontal: 10

                          }}>
                          {hadeethTitleAr}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        color: '#fff',
                        marginHorizontal: 10,
                        fontSize: 14,
                        alignSelf: 'auto',
                        width: '96%',
                        marginRight: 30,
                        // marginLeft:30
                      }}>
                      {bookName(desc)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          }
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={false}
          renderItem={({ item }) => {
            console.log('item', item);
            return (
              <>
                <View style={styles.container1}>
                  <View style={styles.announceBox}>
                    <BookList
                      books={item.book}
                      number={item.bookNumber}
                      start={item.hadithStartNumber}
                      end={item.hadithEndNumber}
                      navigation={navigation}
                      name={name}
                      hadeethTitle={hadeethTitleEn}
                      pageCurrent={pageCurrent}
                      setPageCurrent={setPageCurrent}
                    />
                  </View>
                </View>
              </>
            );
          }}
          keyExtractor={(item, index) => item.key}
        />
      </ScrollView>

      {/* </ScrollView> */}
    </BgImage>
  );
};

export default HadeethsInfoScreen;

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
