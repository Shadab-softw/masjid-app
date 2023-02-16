/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import CONSTANT from '../../constants';

import { BgImage } from '../../component/ImageContainer';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Carousel from 'react-native-looped-carousel';
import { useIsFocused } from '@react-navigation/native';

import { Tab } from 'react-native-elements';
import {
  UpEventListComp,
  FeaturedEventListComp,
} from '../../component/List/EventList';
import BannerImgComp from '../../component/Common/Banner';
import HijriDate from '../../component/HijriDate';

const EventScreen = ({ navigation }) => {
  const [upEvent, setupEvent] = useState(true);
  const [featureEvent, setfeatureEvent] = useState(true);
  const [disableScroll, setDisableScroll] = useState(false);
  const [marginleft, setMarginLeft] = useState(20);
  const [CustomView, setCustomView] = useState(ScrollView);
  const [touch, setTouch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [layoutStyle, setLayoutStyle] = React.useState({
    width: '100%',
    height: 190,
  });

  const scroll = () => {
    setDisableScroll(true);
    setCustomView(View);
    setTouch(false);
    // alert('hi');
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setDisableScroll(false);
    }
  }, [isFocused]);
  // console.log({ disableScroll, touch });
  const onRefreshHandler = () => {
    console.log({ touch, disableScroll });
    if (touch == true) {
      if (disableScroll === true) {
      }
    }
  };
  const handleScroll = event => {
    let y = event.nativeEvent.contentOffset.y;
    let x = event.nativeEvent.contentOffset.x;
    let rounded = Math.floor(y);
    if (rounded >= 180) {
      if (disableScroll === false) {
        setDisableScroll(true);
        setCustomView(View);
        setTouch(true);
      }
    }
    console.log('ffffffff', { x, y, rounded });
  };
  // onclick

  const onchangeTab = item => {
    setSelectedIndex(item.id);
    if (item.id === 1) {
      setupEvent(true);
      setfeatureEvent(true);
    }
    if (item.id === 2) {
      setupEvent(false);
      setfeatureEvent(true);
    }
  };

  console.log('index value', selectedIndex);
  return (
    <View
      onTouchMove={onRefreshHandler}
      style={{ width: '100%', height: '100%' }}>
      <BackgroundImage
        source={CONSTANT.App.screenImages.bg_Image}
        style={{ flex: 1, paddingHorizontal: 15 }}>
        <View onTouchMove={() => setDisableScroll(false)}>
          <Text style={styles.title}>Events</Text>
        </View>
        {!disableScroll && (
          <View style={{ padding: 10 }}>
            <View style={styles.box}>
            </View>
            <HijriDate />
          </View>
        )}

        <CustomView
          scrollEnabled={true}
          setDisableScroll={false}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}>
          <View style={styles.banner}>
            {!disableScroll && (
              <BannerImgComp />
            )}

            <ScrollView
              verticle={true}
              style={{ marginTop: 2, marginleft: 10 }}
              onTouchMove={scroll}
              showsVerticalScrollIndicator={false}>
              {selectedIndex === 1 && (
                <UpEventListComp
                  navigation={navigation}
                  handleRefresh={onRefreshHandler}
                />
              )}
            </ScrollView>
          </View>
        </CustomView>
      </BackgroundImage>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 72,
    backgroundColor: 'transparent',
    borderRadius: 15,
    // top: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  today: {
    padding: 13,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    // fontWeight: '500',
    top: 57,
    left: 24,
    right: 279,
    bottom: 728,
  },
  banner: {
    top: 30,
    paddingHorizontal: 10,
    borderRadius: 40
  },
  borderTab: {
    width: 40,
    borderBottomWidth: 3,
    borderBottomColor: '#A7C829',
    marginLeft: 10,
  },
});
export default EventScreen;
