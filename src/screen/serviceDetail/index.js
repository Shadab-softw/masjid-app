/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import CONSTANT from '../../constants';
import { Button, Icon, Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../../component/InputFileds';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../../component/CustomButton';
import { ListComp } from '../../component/List';
import { useDispatch } from 'react-redux';
import { createAction } from '../Login/action';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationApp } from '../../navigation/navigation';
import { AuthContext } from '../../context';
import { BgImage } from '../../component/ImageContainer';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Carousel from 'react-native-looped-carousel';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { EventListComp } from '../../component/List/EventList';

const ServiceDetaiScreen = ({ navigation }) => {
  const [layoutStyle, setLayoutStyle] = React.useState({
    width: '100%',
    height: 210,
    marginLeft: 30,
    // marginRight: 10,
    right: 22,
    top: 20,
  });
  return (
    <BackgroundImage
      source={CONSTANT.App.screenImages.bg_Image}
      style={{ flex: 1 }}>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Services Details</Text>
      </View>
      <Carousel
        //   delay={2000}
        style={layoutStyle}
        autoplay={false}
        //   pageInfo
        pagingEnabled
        bullets={true}
        chosenBulletStyle={{
          backgroundColor: '#fff',
          color: 'white',
          fontSize: 15,
          width: 12,
          height: 12,
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        bulletStyle={{
          backgroundColor: '#b3afaf',
          borderWidth: 0,
          color: 'white',
          height: 12,

          width: 12,
        }}
        bulletsContainerStyle={{
          // marginRight: 70,
          left: '7%',
          // top: '0%',
          marginTop: '12%',
          marginBottom: 15,
          // borderWidth: 1,
          // borderStyle: 'solid',
          // borderColor: 'rgba(157, 157, 157, 0.6)',
          // backgroundColor: 'rgba(157, 157, 157, 0.6)',
          width: '5%',
          height: '3%',
          marginLeft: '30%',
          borderRadius: 20,
        }}>
        <View
          style={[
            layoutStyle,
            {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          ]}>
          <Image
            source={CONSTANT.App.screenImages.banner}
            style={{ borderRadius: 20, width: '100%' }}
          />
        </View>
        <View
          style={[
            layoutStyle,
            {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          ]}>
          <Image
            source={CONSTANT.App.screenImages.banner}
            style={{ borderRadius: 20, width: '100%' }}
          />
        </View>
        <View
          style={[
            layoutStyle,
            {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          ]}>
          <Image
            source={CONSTANT.App.screenImages.banner}
            style={{ borderRadius: 20, width: '100%' }}
          />
        </View>
      </Carousel>
      <View>
        <Text style={styles.title1}>Lorem ipsum dolor</Text>
      </View>
      <View>
        <Text style={styles.para}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum." pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum."
        </Text>
      </View>
      <CustomButton
        // variant={"filled"}
        title={' Inquire now'}
        onPress={() => navigation.navigate(CONSTANT.App.screenNames.signup)}
        style={{
          width: '90%',
          marginLeft: 20,
          borderWidth: 1,
          backgroundColor: '#A7C829',
          marginTop: 70,
          // bottom: '55%',
        }}
      />

      {/* </View> */}
    </BackgroundImage>
  );
};

export default ServiceDetaiScreen;
const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 24,
    // fontWeight: '500',
    top: 3,
    left: 80,
    right: 279,
    bottom: 748,
  },
  title1: {
    color: '#fff',
    fontSize: 22,
    // fontWeight: '500',
    lineHeight: 24,
    top: 8,
    left: 30,
    right: 279,
    bottom: 748,
  },
  para: {
    fontSize: 15,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    lineHeight: 22,
    color: '#fff',
    // left: 10,
    top: 30,

    paddingHorizontal: 20,
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
    left: 20,
  },
});
