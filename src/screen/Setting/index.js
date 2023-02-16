/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AuthContext } from '../../context/authContext';
import { BgImage } from '../../component/ImageContainer';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Carousel from 'react-native-looped-carousel';
import Feather from 'react-native-vector-icons/dist/Feather';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { EventListComp } from '../../component/List/EventList';
import MoreScreen from '../More';
import ToggleSwitch from 'toggle-switch-react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

const SettingScreen = ({ navigation }) => {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(true);
  const [toggle4, setToggle4] = useState(true);
  const Data = [
    {
      id: 1,
      name: 'New Muslim',
      Icon_Name: 'mic',
      bgColor: '#20BBD4',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
    {
      id: 2,
      name: 'Ask Imam',
      Icon_Name: 'mic',
      bgColor: '#DFBB2B',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
    {
      id: 3,
      name: 'Weekend School',
      Icon_Name: 'mic',
      bgColor: '#A758EB',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
    {
      id: 4,
      name: 'Marriage Services',
      Icon_Name: 'mic',
      bgColor: '#DF6C2B',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
    {
      id: 5,
      name: 'Ramsan Services',
      Icon_Name: 'mic',
      bgColor: '#5E5E5E',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
    {
      id: 6,
      name: 'Cunsultation',
      Icon_Name: 'mic',
      bgColor: '#A7C829',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
    {
      id: 7,
      name: 'Funeral Services',
      Icon_Name: 'mic',
      bgColor: '#A7C5',
      type: 'feather',
      Screen: CONSTANT.App.screenNames.servicesDetail,
    },
  ];
  const { logout } = useContext(AuthContext)


  const toggle1Button = () => {
    if (toggle1 == true) {
      setToggle1(false);
    } else if (toggle1 == true) {
      setToggle1(false);
    }
  };
  const toggle2Button = () => {
    if (toggle2 == false) {
      setToggle2(true);
    } else if (toggle2 == true) {
      setToggle2(false);
    }
  };
  const toggle3Button = () => {
    if (toggle3 == false) {
      setToggle3(true);
    } else if (toggle3 == true) {
      setToggle3(false);
    }
  };
  const toggle4Button = () => {
    if (toggle4 == false) {
      setToggle4(true);
    } else if (toggle4 == true) {
      setToggle4(false);
    }
  };
  return (
    <BgImage>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 40 }}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={25} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView
          vertical={true}
          contentContainerStyle={{ height: '100%', paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.row}>
              <AntDesign name="idcard" style={styles.icon} />
              <Text style={styles.heading}>Account</Text>
            </View>
            <View style={styles.rrow1}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.ProfileScreen)
                }>
                <Text style={styles.heading1}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.ProfileScreen)
                }>
                <Entypo
                  name="chevron-right"
                  size={25}
                  color="#ffffff"
                  style={styles.icon1}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row2}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.ChangePassword)
                }>
                <Text style={styles.heading2}>Change password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.ChangePassword)
                }>
                <Entypo
                  name="chevron-right"
                  size={25}
                  color="#ffffff"
                  style={styles.icon2}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container1}>
            <View style={styles.row}>
              <Feather name="bell" style={styles.icon} />
              <Text style={styles.heading}>Notifcations</Text>
            </View>
            <View style={styles.row11}>
              <TouchableOpacity>
                <Text style={styles.heading1}>In app notification</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <ToggleSwitch
                  isOn={toggle1}
                  onColor="#a7c829"
                  offColor="#9D9D9D"
                  labelStyle={{
                    color: 'black',
                    //  fontWeight: '900'
                  }}
                  size="mediums"
                  onToggle={toggle1Button}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row2}>
              <TouchableOpacity>
                <Text style={styles.heading5}>Verse of day</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <ToggleSwitch
                  isOn={toggle2}
                  onColor="#a7c829"
                  offColor="#9D9D9D"
                  labelStyle={{
                    color: 'black',
                    //  fontWeight: '900'
                  }}
                  size="medium"
                  onToggle={toggle2Button}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row3}>
              <TouchableOpacity>
                <Text style={styles.heading6}>Miscellaneous</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <ToggleSwitch
                  isOn={toggle3}
                  onColor="#a7c829"
                  offColor="#9D9D9D"
                  labelStyle={{
                    color: 'black',
                    //  fontWeight: '900' 
                  }}
                  size="medium"
                  onToggle={toggle3Button}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container4}>
            <View style={styles.row}>
              <Entypo name="dots-three-horizontal" style={styles.icon} />
              <Text style={styles.heading}>Others</Text>
            </View>
            <View style={styles.row1}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.AskImamSettingScreen,
                  )
                }>
                <Text style={styles.heading1}>Ask Imam</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>
                navigation.navigate(CONSTANT.App.screenNames.AskImamSettingScreen,
                )
              }>
                <Entypo
                  name="chevron-right"
                  size={25}
                  color="#ffffff"
                  style={styles.icon1}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row2}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.ContactUs)
                }>
                <Text style={styles.heading8}>Contact us</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>
                navigation.navigate(CONSTANT.App.screenNames.ContactUs)
              }>
                <Entypo
                  name="chevron-right"
                  size={25}
                  color="#ffffff"
                  style={styles.icon2}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              {/* <Entypo name="dots-three-horizontal" style={styles.icon} /> */}
              {/* <Text style={styles.heading}>Others</Text> */}
            </View>
            <View style={styles.roww2}>
              <TouchableOpacity
                onPress={() => navigation.navigate(CONSTANT.App.screenNames.FeedbackScreen)

                }>
                <Text style={styles.heading9}>Send feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate(CONSTANT.App.screenNames.FeedbackScreen)

              }>
                <Entypo
                  name="chevron-right"
                  size={25}
                  color="#ffffff"
                  style={styles.icon2}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.Sign2}>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await logout()
                  } catch (err) {
                    // console.log(err)
                  }
                }
                }>
                <Text style={styles.heading10}>Sign Out</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={async () => {
                try {
                  await logout()
                } catch (err) {
                  // console.log(err)
                }
              }
              }>
                <Entypo
                  name="log-out"
                  size={25}
                  color="#ffffff"
                  style={styles.iconlog_out2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </BgImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
    // paddingHorizontal: 10,

    overflow: 'hidden',
  },
  container1: {
    width: '100%',
    // flex: 1,
    marginBottom: 90,
    // top: -85,
  },

  container4: {
    width: '100%',
    // flex: 1,
    // flex: 1,

    // top: -133,
    paddingBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    // fontWeight: '500',
    top: 3,
    left: 110,
    right: 279,
    bottom: 748,
  },
  heading: {
    fontSize: 18,
    color: '#a7c829',
    // fontWeight: '400',
    lineHeight: 20,
    left: 10,
  },
  heading1: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    marginRight: 80,
  },
  heading2: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    // marginRight: 10,
  },
  heading8: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    marginRight: 50,
  },
  heading9: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    marginRight: 20,
    // top: 5,
  },
  heading10: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    marginRight: 50,
    marginTop: 10,
    // top: 5,
  },
  heading5: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    marginRight: 130,
  },
  heading6: {
    fontSize: 17,
    color: '#fff',
    // fontWeight: '300',
    lineHeight: 20,
    marginRight: 110,
  },
  heading7: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: '400',
    lineHeight: 20,
    marginRight: 193,
  },
  icon: {
    fontSize: 20,
    color: '#a7c829',
    marginLeft: -10
  },
  icon1: {
    color: '#fff',
    marginLeft: 130,
  },
  icon2: {
    color: '#fff',
    marginLeft: 115,
  },
  iconlog_out2: {
    color: '#fff',
    marginLeft: 115,
    marginTop: 10,
    fontSize: 25,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    left: 35,
    top: 35,
  },
  rrow1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    // width: '100%',
    // left: 20,
    top: 65,
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 25,
    // width: '100%',
    // left: 20,
    top: 65,
  },
  row11: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 3,
    // width: '100%',
    // left: 20,
    top: 65,
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 8,

    // width: '100%',
    // left: 20,
    top: 80,
  },
  roww2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,

    // width: '100%',
    // left: 20,
    top: 100,
  },
  Sign2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 0,

    // width: '100%',
    // left: 20,
    top: 100,
    marginTop: 8,
  },
  row3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // width: '100%',
    // left: 20,
    top: 95,
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

export default SettingScreen;
