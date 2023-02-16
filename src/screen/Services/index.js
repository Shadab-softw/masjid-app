/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */

import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Modal
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
import MoreScreen from '../More';
const Data = [
  {
    id: 1,
    name: 'New Muslim',
    Icon_Name: 'mic',
    bgColor: '#20BBD4',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.NewMuslimScreen,
    tabScreen: CONSTANT.App.tabMenu.newMuslimTab,
  },
  {
    id: 2,
    name: 'Ask Imam',
    Icon_Name: 'mic',
    bgColor: '#DFBB2B',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.AskImamScreen,
    tabScreen: CONSTANT.App.tabMenu.askImamTab,

  },
  {
    id: 3,
    name: 'Weekend School',
    Icon_Name: 'mic',
    bgColor: '#A758EB',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.WeekendSchoolScreen,
    tabScreen: CONSTANT.App.tabMenu.weekSchoolTab,

  },
  {
    id: 4,
    name: 'Marriage Services',
    Icon_Name: 'mic',
    bgColor: '#DF6C2B',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.MarriageServicesScreen,
    tabScreen: CONSTANT.App.tabMenu.marriageTab,

  },
  {
    id: 5,
    name: 'Ramadan Services',
    Icon_Name: 'mic',
    bgColor: '#5E5E5E',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.Ramdan,
    tabScreen: CONSTANT.App.tabMenu.ramzanTab,

  },
  {
    id: 6,
    name: 'Consultation',
    Icon_Name: 'mic',
    bgColor: '#A7C829',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.CunsultationScreen,
    tabScreen: CONSTANT.App.tabMenu.consultTab,

  },
  {
    id: 7,
    name: 'Funeral Services',
    Icon_Name: 'mic',
    bgColor: '#A7C5',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.FuneralServicesScreen,
    tabScreen: CONSTANT.App.tabMenu.funeralTab,

  },
  {
    id: 8,
    name: 'News Letter',
    Icon_Name: 'mic',
    bgColor: '#f6d523',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.NewsLetterScreen,
    tabScreen: CONSTANT.App.tabMenu.newsLetterTab,

  },
  {
    id: 9,
    name: 'General Assembly',
    Icon_Name: 'mic',
    bgColor: '#e237d3',
    type: 'feather',
    Screen: CONSTANT.App.screenNames.GeneralAssemblyScreen,
    tabScreen: CONSTANT.App.tabMenu.generalTab,

  },
];
const Services = ({ route, navigation }) => {

  const { routed } = route.params;

  console.log('routed', routed);

  const [serviceData, setServiceData] = useState();

  useEffect(() => {
    getPostServices();

  }, []);
  const getPostServices = async () => {
    try {
      // const result = await fetch(`http://community.sadathussain.com/api/post?category_id=1`, {
      const result = await fetch(`http://app.altawheedjc.org/api/post?category_id=1`, {
        method: 'post',
      });
      const resJson = await result.json();
      setServiceData(resJson.post);
      // const aaa = await resJson.post.map(item => {
      //   return item.title.includes('New Muslim')

      // })

      // let currentIndex = 0
      // console.log("vvv", aaa)
      // console.log("aray of obeject", aaa[currentIndex])


    }
    catch (err) {
      console.log(err);
    }
  };



  const handleNavigation = (data) => {
    console.log('data', data);
    // console.log('serviceData>>>>',JSON.stringify(serviceData,null,2));

    if (serviceData) {
      let isPresent = serviceData.map(item => {
        if (item.title.toLowerCase().includes(data.name.toLowerCase())) {
          return item;
        }
      });
      console.log('isPresent>>>>', JSON.stringify(isPresent, null, 2));

      if (isPresent) {

        navigation.navigate(routed === 'fromHome' ? data.tabScreen : data.Screen, {
          data: isPresent,
        });
      }
    }

  };

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
        <Text style={styles.title}>Services</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: 110,
            marginTop: 21,
            marginLeft: -10,
          }}>
          {Data.map(item => {
            {/* {console.log("inside map", item)} */ }

            return (
              <>
                <TouchableOpacity onPress={() => {
                  handleNavigation(item);
                }}
                  // navigation.navigate(item.Screen,{
                  // description:  serviceData.description
                  // })

                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 10,
                    marginLeft: 20,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: 30,
                      // justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate(item.Screen, {
                      //     screen: CONSTANT.App.screenNames.services,
                      //     initial: false,
                      //   })
                      // }
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: item.bgColor,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 15,
                        //   marginTop: '-10%',
                      }}
                      key={item.id}>
                      <Icon
                        name={item.Icon_Name}
                        type={item.type}
                        size={15}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        // marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: -10,
                        width: 200,
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          // fontWeight: '400',
                          fontSize: 16,
                          width: 150,
                          display: 'flex',
                          textAlign: 'left',
                          paddingRight: 20,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
      </View>

      {/* </View> */}
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 24,
    // fontWeight: '500',
    top: 3,
    left: 110,
    right: 279,
    bottom: 748,
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
  modalView: {
    margin: 20,
    backgroundColor: CONSTANT.App.colors.boxBgColor,
    borderRadius: 20,
    width: '80%',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default Services;
