/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

// import Sound Component
import Sound from 'react-native-sound';
import { BgImage } from '../../component/ImageContainer';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const QuranTransScreen = ({ route, navigation }) => {
  let sound1, sound2, sound3, sound4, sound5, sound6;
  const { item } = route.params;
  // console.log('chapterItem', item)

  const [Item, setItem] = useState(item);
  const [data, setData] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isPlaying, setIsplaying] = useState(true);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [index, setIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isEndLoading, setIsEndLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  useEffect(() => {
    getByChapter();
    Sound.setCategory('Playback', true); // true = mixWithOthers
    return () => {
      if (sound1) sound1.release();
    };
  }, [isPlaying]);

  const getByChapter = async () => {
    try {
      console.log(`http://api.quran.com/api/v3/chapters/${Item.id}/verses?recitation=7&translations=21&language=en&page=${pageCurrent}&text_type=words`,)
      const result = await fetch(
        `http://api.quran.com/api/v3/chapters/${Item.id}/verses?recitation=7&translations=21&language=en&page=${pageCurrent}&text_type=words`,
      );
      console.log('result', result, pageCurrent, Item.id);
      const resJson = await result.json();
      console.log('result', resJson);
      setData(data.concat(resJson.verses));
      setPageCurrent(pageCurrent + 1)
      setTotalPages(resJson.meta.total_pages);
      if (totalPages === resJson.meta.current_page) {
        setIsListEnd(true)
      }
      setIsEndLoading(false)
      //   setIsLoading(false)
    } catch (err) {
      setIsListEnd(true)
      console.log('ffffff', err);
      setIsLoading(false);
    }
  };

  const playProgress = () => {
    setTimeout(() => {
      let getAudioUrlIndex = currentIndex;
      let getData = data.filter((i, index) => {
        if (currentIndex + 1 === index) {
          return i;
        }
      });
      if (getData.length > 0 && getData !== undefined) {
        getAudioUrlIndex = currentIndex + 1;
      }
      console.log('getDATA', getData[0].audio.url);
      sound1.getCurrentTime(seconds => {
        console.log('pal', sound1.getDuration() === seconds);
        if (seconds >= sound1.getDuration()) {
          setCurrentIndex(getAudioUrlIndex);
          console.log('paly again');
          // playSound(getData.audio.url)
        }
      });
    }, 1000);
  };

  const playSound = (item, index) => {
    // console.log(item)

    sound1 = new Sound(
      `https://audio.qurancdn.com/${item}`,
      '',
      (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound1.play(() => {
          sound1.release();
          // alert('succes')

          console.log(
            'duration in seconds: ' +
            sound1.getDuration() +
            ', sound1.getNumberOfLoops() ' +
            sound1.getNumberOfLoops(),
          );
        });
      },
    );
  };

  const onNextPlay = () => {
    console.log('onNextPlay', sound1);
    if (sound1) {
      console.log('onNextPlay');
      let getData = data.filter((i, index) => {
        if (currentIndex + 1 === index) {
          return i;
        }
      });
      if (getData.length > 0 && getData !== undefined) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const onPrevPlay = () => {
    console.log('object');
    if (sound1) {
      console.log('object');
      let getData = data.filter((i, index) => {
        if (currentIndex - 1 === index) {
          return i;
        }
      });
      if (getData.length > 0 && getData !== undefined) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const onStopPlay = () => {
    let url = data[0];
    console.log(url);
  };

  const resumeSound = (_item, index) => {
    // console.log("toggle")
    if (sound1) {
      sound1.pause();
    }
  };

  const onClickHandler = (item, index) => {
    setCurrentIndex(index);
    setCurrentSelected(item.id);
    // console.log(data)
    if (isPlaying) {
      playSound(item.audio.url);
      setIsplaying(false);
      setIndex(1);
    } else {
      // stopSound();
      setIndex(0);
      resumeSound();
      setIsplaying(true);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      // <ScrollView >

      <View
        key={item.id}
        style={{
          paddingVertical: 10,
          backgroundColor: 'rgba(98,98,98,0.3)',
          marginVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => onClickHandler(item, index)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 150,
              backgroundColor: '#00acc2',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {currentIndex !== null && currentIndex === index ? (
              isPlaying ? (
                <AntDesign name="caretright" color={'#FFFFFF'} /> //play
              ) : (
                <AntDesign name="pausecircle" color={'red'} />
              )
            ) : (
              <AntDesign name="caretright" color={'#FFFFFF'} />
            )}
            {/* {index !== null ?
              isPlaying ?
                <AntDesign name="caretright" color={'#FFFFFF'} /> ://play
                <AntDesign name="pausecircle" color={'red'} />} */}
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => stopSound(item.audio.url)}
            style={{
              width: 30, height: 30, borderRadius: 150, backgroundColor: '#00acc2',
              alignItems: 'center', justifyContent: 'center'
            }}>
            <AntDesign name="pausecircle" color={'#FFFFFF'} />

          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => nextPlay(item.audio.url)}
            style={{
              width: 30, height: 30, borderRadius: 150, backgroundColor: '#00acc2',
              alignItems: 'center', justifyContent: 'center'
            }}>
            <AntDesign name="check" color={'red'} />

          </TouchableOpacity> */}

          <Text style={{ fontSize: 17, color: '#FFFFFF' }}>
            {item.text_indopak}
          </Text>
        </View>
        <View>
          <Text style={{ color: '#FFFFFF', fontSize: 17 }}>
            {item.words.map(word => {
              // console.log(word.verse_key)
              return word.translation.text;
            })}
          </Text>
          {/* {currentIndex ? <Text>this is hide </Text> : ''} */}
        </View>
      </View>
      // </ScrollView>
      //
    );
  };

  const renderFooter = () => {
    return isEndLoading ? (
      <View>
        <ActivityIndicator
          style={{ marginBottom: 10 }}
          color="#bc2b78"
          size="large"
        />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!isListEnd) {
      setIsEndLoading(true)
      setPageCurrent(pageCurrent + 1)
      setTimeout(() => {
        getByChapter()
      }, 1000)

      // setIsEndLoading(false)



    }
    // console.log("totalPages",totalPages)
    // if (totalPages === pageCurrent) {
    //   setIsLoading(false);
    //   return;
    // }
    // // setPageCurrent(pageCurrent + 1);
    // getByChapter()
    // setIsLoading(true);
    // // console.log("page",data.mata.total_pages)
    // // data.map(item=>{
    // //   if(item.page_number=== pageCurrent){
    // //     setIsLoadingfalse(false)
    // //   }
    // // })
  };
  return (

    <BgImage>
      {console.log(pageCurrent)}
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.key}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />

      <View
        style={{
          width: '100%',
          height: 100,
          position: 'relative',
          left: 0,
          top: -30,
        }}>
        <Slider
          style={styles.progressContainer}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor={'#FFD369'}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="red"
        />
        <View style={styles.progressLableContainer}>
          <Text style={styles.progressLableText}>0:00</Text>
          <Text style={styles.progressLableText}>3.55</Text>
        </View>
        <View style={styles.musicController}>
          <TouchableOpacity onPress={onPrevPlay}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={'#FFD369'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onStopPlay}>
            {index === 0 ? (
              <Ionicons
                name="play"
                size={75}
                color={'#FFD369'}
                style={{ marginTop: -20 }}
              />
            ) : (
              <Ionicons
                name="ios-pause-circle"
                size={75}
                color={'#FFD369'}
                style={{ marginTop: -20 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextPlay}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={'#FFD369'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BgImage>
  );
};

export default QuranTransScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  textStyle: {
    flex: 1,
    padding: 5,
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 7,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
  },
  progressContainer: {
    width: 350,
    height: 40,
    flexDirection: 'row',
    fontSize: 50,
    // transform: [{scaleX:0 },{ scaleY: 3 }]
  },
  progressLableContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLableText: {
    color: '#a7c829',
  },
  musicController: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginLeft: 70,
  },
});
