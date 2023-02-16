/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
// import RNPickerSelect from 'react-native-picker-select';

import CustomInput, { InputComp } from '../../component/InputFileds';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';

import { useState } from 'react';
import { onChange, set } from 'react-native-reanimated';
import CustomButton from '../../component/CustomButton';
import { AntDesigns, FontAwesomes } from '../../constants/Icons';
import CONSTANT from '../../constants';
import { LoginApi } from '../../services/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './action';

import { AuthContext } from '../../context/authContext';
import { BgImage } from '../../component/ImageContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../hook/useAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 5,
    backgroundColor: '#515151',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topContain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 99,
    height: 66,
    marginLeft: 100,
  },
  textContain: {
    // width:71,
    // height:31
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  text: {
    color: '#A7C829',
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
    height: 500,
    backgroundColor: CONSTANT.App.colors.boxBgColor,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: '5%'
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
  textContainer: {
    width: '100%',
    backgroundColor: '#1a1d2e',
    paddingLeft: 20,
    borderRadius: 8,
    opacity: 0.9,
    marginVertical: 10,
  },

});
const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { auth, state } = useAuth();
  // console.log('ischhhack',state);


  const { register } = useContext(AuthContext);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [isSecure, setSecure] = useState(false);
  const [loading, setLaoding] = useState(false);
  const [fcm_token, setFcm_token] = useState('');

  useEffect(() => {
    requestUserPermission();
  }, []);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      setFcm_token(token);
      // console.log('Authorization status:', authStatus, token);
      // console.log('Tokennnnnnnn', token);
    }
  }
  const onSubmit = async () => {
    setLaoding(false)
    try {
      const data = {
        firstname,
        lastname,
        email,
        username,
        password,
        confirm_password,
        fcm_token
      }
      // console.log(data)
      const result = await register(data)
      console.log('result', result)
      if (result.status === 'S') {
        navigation.navigate(CONSTANT.App.screenNames.login)
      }
      if (state.assignUser.data !== undefined) {
        //  console.log('this is mt first comment')
        navigation.navigate(CONSTANT.App.screenNames.login)

      }

      // if(result.status == "S"){
      // navigation.navigate(CONSTANT.App.screenNames.login)

      // }
      setLaoding(false);
    } catch (err) {
      console.log(err);

    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setUserName('');
    setPassword('');
    setConfirm_password('');

    setLaoding(false);
  };

  return (
    <BgImage>
      <View style={styles.topContain}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContain}>
        <Text style={styles.text}>Register</Text>
        <Text style={styles.paragraph}>
          Welcome back! Build your prayer habbits with Al-Tauheed.
        </Text>
      </View>
      <ScrollView>
        <View style={styles.medium}>
          <CustomInput
            value={firstname}
            plcholder="Firstname"
            onTextChange={value => {
              setFirstName(value);
            }}
            leftIcon={'user'}
            style={{ marginBottom: 15, overflow: 'hidden' }}
          />
          <CustomInput
            value={lastname}
            plcholder="Lastname"
            onTextChange={value => {
              setLastName(value);
            }}
            leftIcon={'user'}
            style={{ marginBottom: 15, overflow: 'hidden' }}
          />
          <CustomInput
            plcholder="Email"
            value={email}
            onTextChange={value => {
              setEmail(value);
            }}
            leftIcon={'user'}
            style={{ marginBottom: 15, overflow: 'hidden' }}
          />

          <CustomInput
            plcholder="Username"
            value={username}
            onTextChange={value => {
              setUserName(value);
            }}
            leftIcon={'user'}
            style={{ marginBottom: 15, overflow: 'hidden' }}
          />
          <CustomInput
            plcholder="password"
            value={password}
            onTextChange={value => {
              setPassword(value);
            }}
            leftIcon={'lock'}
            style={{ marginBottom: 15, overflow: 'hidden' }}
          />


          <CustomInput
            isSecure={isSecure}
            plcholder="Confirm Password"
            value={confirm_password}
            rightIcon={isSecure ? 'eye-off' : 'eye'}
            onTextChange={value => {
              setConfirm_password(value);
            }}
            onRightIconClick={() => {
              setSecure(!isSecure);
            }}
            leftIcon={'lock'}
            style={{ marginBottom: 15, overflow: 'hidden' }}
          />
          {
            loading ? <ActivityIndicator size="large" color="green" />
              :


              <CustomButton
                variant={'filled'}
                title={'Register'}
                onPress={() => onSubmit()
                }
              />
          }
          {/* <View style={{width: '100%', alignItems: 'center', marginTop: 30}}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: 'grey',
            }}></View>
          <Text
            style={{
              color: '#9D9D9D',
              backgroundColor: '#010417',
              marginTop: -10,
              paddingHorizontal: 10,
            }}>
            or login using
          </Text>
        </View> */}

          {/* <View style={styles.socialBox}>
          <TouchableOpacity style={[styles.iconView, {marginRight: 5}]}>
            <FontAwesomes name="google" size={25} color={'#FFFFFF'} />
            <Text style={{color: '#FFFFFF', marginLeft: 4}}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconView, {backgroundColor: '#3963BE'}]}>
            <FontAwesomes name="facebook-square" size={25} color={'#FFFFFF'} />
            <Text style={{color: '#FFFFFF', marginLeft: 7}}>Facebook</Text>
          </TouchableOpacity>
        </View> */}
          {/* <TouchableOpacity
          style={[
            styles.iconView,
            {backgroundColor: '#FFFFFF', marginLeft: '25%', marginTop: 10},
          ]}>
          {/* <FontAwesomes name="facebook-square" size={25} color={'#000000'} /> */}
          {/* <AntDesigns name="apple-o" size={25} color={'#000000'} />
          <Text style={{color: '#000000', marginLeft: 4}}>Apple Id</Text>
        </TouchableOpacity> */}
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            // marginTop: 50,
            paddingHorizontal: 20,
          }}>
          <Text style={styles.paragraph}>Existing user?</Text>
          <TouchableOpacity>
            <Text
              style={{
                color: '#A7C829',
                marginTop: 7,
                fontSize: 16,
                // fontWeight: '500',
                left: 3,
              }}
              onPress={() => navigation.navigate(CONSTANT.App.screenNames.login)}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </BgImage>
  );
};

export default SignUpScreen;
