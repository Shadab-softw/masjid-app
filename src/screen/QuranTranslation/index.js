/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable keyword-spacing */

import React, { useEffect, useState, useRef } from 'react';

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
  ImageBackground,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Sound from 'react-native-sound';
import { BgImage } from '../../component/ImageContainer';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useIsFocused } from '@react-navigation/native'
import { Overlay } from 'react-native-element'
import TrackPlayer, {

  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import CONSTANT from '../../constants';


const { width, height } = Dimensions.get('window');



// useEffect(async() => {
//   const currentTrack = await TrackPlayer.getCurrentTrack();
// },[TrackPlayer])


const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });


  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const QuranTransScreen = ({ route, navigation }) => {
  const playBackState = usePlaybackState();
  const progress = useProgress();
  const { item } = route.params;
  const [chapter, setChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [totalPages, setTotalPages] = useState(0);
  const [isEndLoading, setIsEndLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const isFocused = useIsFocused()

  const flatListRef = useRef(null);

  useEffect(() => {
    setupIfNecessary();
    fetchChapter();
  }, [pageCurrent + 1])

  useEffect(async () => {
    if (isFocused) {
      await TrackPlayer.setupPlayer();
    } else {
      await TrackPlayer.stop();
    }

  }, [isFocused])

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {

      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentIndex(track.id)

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: track.id - 1, animated: true });
      }
    }
  });

  const fetchChapter = async () => {
    try {
      const response = await fetch(`https://api.quran.com/api/v3/chapters/${item.id}/verses?recitation=1&translations=21&language=en&page=${pageCurrent}&text_type=words`);
      const responseJson = await response.json();
      if (chapter.length !== responseJson.pagination.total_count) {
        let chapterArr = [];
        setChapter(chapter.concat(responseJson.verses));

        responseJson.verses.map((item) => {
          let temp = {};
          temp.id = item.id;
          temp.url = `https://audio.qurancdn.com/${item.audio.url}`;
          temp.title = item.text_simple;
          temp.artist = '';
          chapterArr = [...chapterArr, temp]
        })
        setUpPlayer(chapterArr)
        setPageCurrent(pageCurrent + 1)
        setTotalPages(responseJson.meta.total_pages);
        if (totalPages === responseJson.meta.current_page) {
          setIsListEnd(true)
        }
        setIsEndLoading(false)

        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      setIsListEnd(true)
      setLoading(false);

    }
  };
  const setUpPlayer = async (chapter) => {


    await TrackPlayer.setupPlayer();
    // TrackPlayer.updateOptions({
    //   capabilities: [
    //     TrackPlayer.CAPABILITY_PLAY,
    //     TrackPlayer.CAPABILITY_PAUSE,
    //     TrackPlayer.CAPABILITY_JUMP_FORWARD,
    //     TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    //     TrackPlayer.CAPABILITY_STOP,
    //   ],
    // })
    await TrackPlayer.add(chapter);
    // await TrackPlayer.on


  };
  const onSkipToNext = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    await TrackPlayer.skipToNext(currentTrack);
  };

  const onSkipToPrevious = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    await TrackPlayer.skipToPrevious(currentTrack);
  };

  const togglePlayBack = async (playBackState) => {
    await TrackPlayer.reset();
    let chapterArr = []
    chapter.map((item) => {
      let temp = {};
      temp.id = item.id;
      temp.url = `https://audio.qurancdn.com/${item.audio.url}`;
      temp.title = item.text_simple;
      temp.artist = '';
      chapterArr = [...chapterArr, temp]
    })
    await TrackPlayer.add(chapterArr);
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playBackState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    };
  };


  const onPlayAudio = async (item, index) => {
    await TrackPlayer.reset();
    const currentTrack = await TrackPlayer.getCurrentTrack();

    setCurrentIndex(item.id)
    let filter = chapter.filter(x => x.id >= item.id)
    const track = {
      id: item.id,
      url: `https://audio.qurancdn.com/${item.audio.url}`,

    }
    let chapterArr = []
    filter.map((item) => {
      let temp = {};
      temp.id = item.id;
      temp.url = `https://audio.qurancdn.com/${item.audio.url}`;
      temp.title = item.text_simple;
      temp.artist = '';
      chapterArr = [...chapterArr, temp]
    })

    await TrackPlayer.add(chapterArr);

    await TrackPlayer.play()
    setIsPlaying(true)
  }

  const onPauseAudio = async () => {
    await TrackPlayer.pause()
    setIsPlaying(false)
  }


  const renderChapter = ({ item, index }) => {
    return (
      <>
        <View
          key={item.id}
          style={{
            paddingVertical: 10,
            backgroundColor: 'rgba(98,98,98,0.3)',
            marginVertical: 10,
            borderRadius: 10,
            paddingHorizontal: 10,
            // overflow:'hidden'
          }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, }}>
              <View >
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, padding: 2, }}>{item.chapter_id}:{item.verse_number}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 25, borderRadius: 4 }}>
              <View>
                <FeatherIcon name="more-vertical" color="#fff" size={20} style={{ textAlign: 'center', fontSize: 20, padding: 2 }} />
              </View>
            </TouchableOpacity>
          </View>


          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 10,
              marginVertical: 10,
              overflow: 'hidden'
            }}>

            <TouchableOpacity
              onPress={() => isPlaying ? onPauseAudio() : onPlayAudio(item, index)}//isPlaying ? onPauseAudio() :
              style={{
                width: 30,
                height: 30,
                borderRadius: 150,
                backgroundColor: '#A7C829',
                alignItems: 'center',
                justifyContent: 'center',
              }}>

              {currentIndex !== null && currentIndex === item.id ? (
                isPlaying ? (
                  <AntDesign name="pausecircle" color={'#000'} /> //play
                ) : (
                  <AntDesign name="caretright" color={'#000'} />
                )
              ) : (
                <AntDesign name="caretright" color={'#000'} />
              )}



            </TouchableOpacity>


            <Text style={{
              fontSize: 17, color: currentIndex !== null && currentIndex === item.id ? (
                isPlaying ? '#A7C829' : '#ffff') : '#ffff', width: '80%', paddingRight: 5
            }}>
              {item.text_indopak}
            </Text>
          </View>
          <View>
            <Text style={{ color: '#FFFFFF', fontSize: 17 }}>
              {item.words.map(word => {
                return word.translation.text;
              })}

            </Text>
            {/* {currentIndex ? <Text>this is hide </Text> : ''} */}
          </View>



        </View>
      </>



      //   return <TouchableOpacity key={item.id} style={{ padding: 20, backgroundColor: '#ccc' }}>
      //     <Text>{item.text_indopak}</Text>
      //   </TouchableOpacity>
      // };

      // if (loading) {
      //   return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //     <ActivityIndicator color='#bc2b78' size="large" />
      //   </View>
    )

  }

  const renderFooter = () => {
    return isEndLoading ? (
      <View>
        <ActivityIndicator
          style={{ marginBottom: 230 }}
          color='#A7C829'
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
        fetchChapter()
      }, 1000)
    }

  }


  return (

    <ImageBackground resizeMode="stretch" style={{ flex: 1, width: width, height: "auto", position: 'relative' }}
      source={CONSTANT.App.screenImages.bg_Image}>
      <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 0, width: '90%', flexDirection: 'row', marginTop: 24, display: 'flex' }}>
        <TouchableOpacity style={{ width: '20%', }}
          onPress={() => {
            navigation.goBack(null)
          }}>
          <View style={{ width: '100%' }}>
            <FeatherIcon name="chevron-left" color="#fff" size={20} style={{ textAlign: 'center' }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ height: 45, width: '50%', paddingHorizontal: 0, marginTop: 10 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 20, }}>Quran</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 15, width: '100%' }}>
        <View style={{ width: '40%', }}>
          <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.2)', height: 60, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 20, flexDirection: 'row', width: '100%' }}>
            <View style={{ padding: 0, width: '77%' }}>
              <Text style={{
                color: '#fff', fontSize: 16,
                //  fontFamily: 'inter'
              }}>{item.name_complex}</Text>

              <View style={{ width: '100%', }}>
                <Text style={{ fontSize: 14, color: '#9D9D9D', }}>{item.revelation_place}</Text>
              </View>

            </View>
            <View style={{ marginLeft: 20, width: '100%' }}>
              <FeatherIcon name="chevron-down" color="#fff" size={20} style={{ marginTop: 10 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: '45%', }}>
          <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.2)', height: 60, borderRadius: 8, padding: 10, paddingLeft: 17, marginLeft: 20, flexDirection: 'row' }}>
            <View>
              <Text style={{
                color: '#fff', fontSize: 16,
                //  fontFamily: 'inter',
                width: 100, marginTop: 10
              }}>Verse {item.id}</Text>

            </View>
            <View >
              <FeatherIcon name="chevron-down" color="#fff" size={20} style={{ marginTop: 10 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        style={{ paddingHorizontal: 25, height: height * 0.57 }}
        data={chapter}
        keyExtractor={(item) => item.id}
        renderItem={renderChapter}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />

      <View style={{ width: "100%", backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', paddingVertical: 18 }}>
        <Slider
          style={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor={'#FFF'}
          minimumTrackTintColor="#A7C829"
          maximumTrackTintColor="#ccc"
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value)
          }}
        />


        <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, }}>
          <Text style={{ color: '#ccc' }}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={{ color: '#ccc' }}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>

        <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 90, marginTop: 0 }}>
          <TouchableOpacity onPress={onSkipToPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color={'#FFFF'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { togglePlayBack(playBackState) }}>
            <Ionicons name={playBackState === State.Playing ? 'ios-pause-circle' : "ios-play-circle"} size={35} color={'#A7C829'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSkipToNext}>
            <Ionicons name="play-skip-forward-outline" size={35} color={'#FFFF'} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    height: 40, flexDirection: 'row',
    fontSize: 50,
    // transform: [{scaleX:0 },{ scaleY: 3 }]
  },
  progressLableContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressLableText: {
    color: '#a7c829'
  },
  musicController: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginLeft: 70
  }
});