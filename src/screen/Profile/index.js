/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomInput, { InputComp } from '../../component/InputFileds';

import CustomButton from '../../component/CustomButton';
import profile from '../../assets/images/profile.png';
import { useAuth } from '../../hook/useAuth';
import { BgImage } from '../../component/ImageContainer';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CONSTANT from '../../constants';



const ProfileScreen = ({ navigation }) => {

  const [useremail, setUserEmail1] = useState('');
  const { auth, state } = useAuth();


  const [user, setUser] = useState([]);
  const [profilepassword, setProfilePassword] = useState('');
  const [profilename, setProfileName] = useState('');
  console.log('user1', user)

  const getUser = async () => {
    const userid = state.user

    const data = {
      id: userid.id,
      userName: userid.username,
      emaill: userid.email,
      mobileN: userid.mobile,

    }
    console.log('getUser', data)
    try {
      let result = await fetch(`http://app.altawheedjc.org/api/getUser?id=${data.id}`, {
        method: 'post'
      })
      const resJson = await result.json()
      console.log("userrr", resJson.user)

      if (resJson) {
        console.log('new', resJson.user);

        setUser(resJson.user)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getUser()
  }, [state.user])
  return (
    <>
      <BgImage>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.topContain}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.goBack()}>
              <Entypo name="chevron-left" size={22} color="#ffffff" />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 25,
                // fontWeight: '600',
                left: 110,
                lineHeight: 30,
              }}>
              Profile
            </Text>
          </View>
          {/* <ScrollView
            vertical={true}
            contentContainerStyle={{height: 550}}
            showsVerticalScrollIndicator={false}> */}
          {/* <KeyboardAvoidingView behavior={'position'}> */}
          <View style={styles.medium}>
            {/* <Avatar
              size="xlarge"
              rounded
              // title="CR"
              containerStyle={{top: -85, left: 70}}
              //   activeOpacity={0.7}
              // onPress={() => bs.current.snapTo(0)}
              source={profile}
            /> */}

            {/* <KeyboardAvoidingView  behavior={> */}
            <CustomInput plcholder="User Name" style={{ marginVertical: 20 }}
              value={user.username}
              editable={false}
            />
            {/* </KeyboardAvoidingView> */}

            <CustomInput plcholder="Email" style={{ marginVertical: 20 }}
              value={user.email}
              editable={false}
            />

            <CustomInput plcholder="Mobile" style={{ marginVertical: 20, overflow: 'hidden' }}
              onTextChange={value => setProfilePassword(value)}
              value={user.mobile}
              editable={false}
            />

            <CustomButton
              // variant={'filled'}
              title={'Edit Profile'}
              style={{ marginVertical: 20, borderColor: '#a7c829', borderWidth: 2 }}
              onPress={() =>
                navigation.navigate(CONSTANT.App.screenNames.EditProfile, {
                  username: user.username,
                  emailId: user.email,
                  mobileNumber: user.mobile,
                })
              }
            />
          </View>
        </View>
      </BgImage>
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    // padding: 20,
    backgroundColor: 'rgba(1, 4, 33, 1)',
    height: 205,
    paddingTop: 20,
    overflow: 'hidden',
    // position: 'absolute',
    // width: '100%',
    // flex: 1,
    // bottom: -10,

    // bottom: -60,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: 'rgba(1, 4, 33, 1)',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    overflow: 'hidden',
    top: 2,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  panelHandle: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#9D9D9D',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 23,
    height: 35,
    top: -25,
    color: '#fff',
  },
  panelSubtitle: {
    fontSize: 13,
    color: '#fff',
    top: -25,

    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  image: {
    flex: 1,
    // width:'100%',
    // height:'100%',
    padding: 20,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(98,98,98,.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topContain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 30,
  },
  logo: {
    width: 99,
    height: 66,
    marginLeft: 100,
  },
  textContain: {
    // width:71,
    // height:31
  },
  text: {
    color: '#A7C829',
    // fontWeight: 'bold',
    fontSize: 30,
  },
  text1: {
    color: 'gray',
    // fontWeight: 'bold',
    fontSize: 30,
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 7,
  },
  medium: {
    width: '100%',
    height: 420,
    backgroundColor: 'rgba(98,98,98,.3)',
    borderRadius: 20,
    marginTop: '35%',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#9D9D9D',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 20,
  },
  socialBox: {
    width: '100%',
    flexDirection: 'row',

    alignItems: 'center',
    marginTop: 25,
  },
  iconView: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DD4B39',
    justifyContent: 'center',
    padding: 15,
    marginLeft: 5,
    borderRadius: 10,
  },
});
