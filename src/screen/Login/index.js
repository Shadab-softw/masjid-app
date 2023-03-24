/* eslint-disable prettier/prettier */
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import CustomInput, { InputComp } from '../../component/InputFileds';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';

import { useState } from 'react';
import { onChange } from 'react-native-reanimated';
import CustomButton from '../../component/CustomButton';
import { AntDesigns, FontAwesomes } from '../../constants/Icons';
import CONSTANT from '../../constants';
import { LoginApi } from '../../services/Auth';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../../context/authContext';
import { BgImage } from '../../component/ImageContainer';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(false);
  const [isSecure, setSecure] = useState(true);
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrormsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPswValid, setIsValidPass] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [errPass, setErrPass] = useState('');
  const [errBoth, setErrorBoth] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [fcm_token, setFcm_token] = useState('');

  const dispatch = useDispatch();
  const { login } = useContext(AuthContext);

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

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  };

  const ValidateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async () => {
    if (!username) {
      setErrEmail('Please enter email!');
    } else {
      // setErrEmail('');
    }
    if (!password) {
      setErrPass('Please enter password!');
    } else {
      setErrPass('');
    }

    if (username && password) {

      try {
        setLoading(false);
        const result = await login(username, password, fcm_token);
        // console.log('loginnnn', result);

      } catch (err) {
        console.log(err);
      }
      // if (email === 'demo@gmail.com' && password === 'demo123') {
      //   navigation.navigate(CONSTANT.App.screenNames.home);
      // } else if (email !== 'demo@gmail.com' || password !== 'demo123') {
      //   setErrorBoth('Please check email or password!');
      //           // setEmail('');
      //   setPassword('');

      // } else {
      //   // setEmail('');
      //   // setPassword('');
      //   // setModalVisible(true);
      //   console.log('error');
      //   setEmail('');
      //   setPassword('');

      // }
    }
  };

  const tryAgainHandler = () => {
    setModalVisible(!modalVisible);
    // setEmail('');
    setPassword('');
  };
  useEffect(() => {
    // console.log('hiiii');
    // requestUserPermission()
  }, []);


  return (
    <BgImage>
      <View style={styles.topContain}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate(CONSTANT.App.screenNames.splash)}>
          <Entypo name="chevron-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/app-logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContain}>
        <Text style={styles.text}>Login</Text>
        <View style={{ width: '100%' }}>
          <Text style={[styles.paragraph]}>
            Welcome To Al-Tawheed Islamic Center!
          </Text>
        </View>
      </View>

      <View style={styles.medium}>
        <Text
          style={{
            color: '#FC6C6B',
            fontSize: 14,
            marginBottom: 20,
            marginTop: 5,
          }}>
          {errBoth}
        </Text>

        <CustomInput
          plcholder="username"
          onTextChange={value => setUsername(value)}
          value={username}
          leftIcon={'mail'}
        />

        <Text
          style={{
            color: '#FC6C6B',
            fontSize: 14,
            marginBottom: 20,
            marginTop: 5,
          }}>
          {errEmail}
        </Text>

        <CustomInput
          isSecure={isSecure}
          plcholder=" Password"
          value={password}
          rightIcon={isSecure ? 'eye-off' : 'eye'}
          onTextChange={value => {
            setPassword(value);
            setErrorBoth('');
            setErrPass(null);
          }}
          onRightIconClick={() => {
            setSecure(!isSecure);
          }}
          leftIcon={'lock'}
          style={{ marginTop: -23 }}
        />

        <Text
          style={{
            color: '#FC6C6B',
            fontSize: 14,
            // marginBottom: ,

            marginTop: 5,
          }}>
          {errPass}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: -15,
            marginTop: -10,
          }}>
          <CheckBox
            title="Remember me"
            textStyle={{
              color: '#FFFFFF',
              //  fontWeight: '300',
              fontSize: 17
            }}
            checked={checked}
            checkedColor={CONSTANT.App.colors.Icon_Color}
            uncheckedColor={CONSTANT.App.colors.Icon_Color}
            onPress={e => setChecked(!checked)}
            containerStyle={{ backgroundColor: '#010417', borderWidth: 0 }}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(CONSTANT.App.screenNames.forgot)
            } style={{
              color: '#FFFFFF', marginRight: 10,
              //  fontWeight: '300',
              fontSize: 17
            }}>
            <Text style={{
              color: '#FFFFFF', marginRight: 10,
              //  fontWeight: '300',
              fontSize: 17
            }}>
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          variant={'filled'}
          title={'Login'}
          onPress={
            onSubmit
            // async () => {
            //     try {
            //         setLoading(false)
            //         await login(email, password)

            //     }
            //     catch (e) {

            //         setLoading(false)
            //     }
            // }
          }
        />
        <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderColor: 'grey',
            }} />
          <Text
            style={{
              color: '#9D9D9D',
              backgroundColor: '#010417',
              marginTop: -10,
              paddingHorizontal: 10,
            }}>
            or login using{' '}
          </Text>
        </View>

        {/* <View style={styles.socialBox}>
          <TouchableOpacity style={[styles.iconView, { marginRight: 5 }]}>
            <FontAwesomes name="google" size={25} color={'#FFFFFF'} />
            <Text style={{ color: '#FFFFFF', marginLeft: 4 }}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconView, { backgroundColor: '#3963BE' }]}>
            <FontAwesomes name="facebook-square" size={25} color={'#FFFFFF'} />
            <Text style={{ color: '#FFFFFF', marginLeft: 7 }}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.iconView,
            { backgroundColor: '#FFFFFF', marginLeft: '25%', marginTop: 10 },
          ]}>
          <AntDesigns name="apple-o" size={25} color={'#000000'} />
          <Text style={{ color: '#000000', marginLeft: 4 }}>Apple Id</Text>
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
        <Text style={styles.paragraph}>Don’t have an account?</Text>
        <TouchableOpacity>
          <Text
            style={{
              color: '#A7C829',
              marginTop: 7,
              fontSize: 16,
              // fontWeight: '500',
              left: 3,
            }}
            onPress={() =>
              navigation.navigate(CONSTANT.App.screenNames.signup)
            }>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(1, 4, 23, 0.8)',
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Incorrect Password</Text>

            <TouchableOpacity
              style={{ width: 200 }}
              onPress={() => navigation.goBack()}>
              <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
                Please enter a valid password to login your account
              </Text>
            </TouchableOpacity>
            <CustomButton
              title={'try again'}
              variant={'filled'}
              style={{ width: '100%', marginTop: 15 }}
              onPress={() => tryAgainHandler()}
            />

            <TouchableOpacity
              // style={{marginTop: 20}}
              onPress={() =>
                navigation.navigate(CONSTANT.App.screenNames.forgot)
              }>
              <Text style={[styles.modalText, { color: '#A7C829' }]}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BgImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
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
    paddingHorizontal: 20,
  },
  text: {
    color: '#A7C829',
    fontSize: 30,
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 7,
  },
  medium: {
    width: '100%',
    backgroundColor: CONSTANT.App.colors.boxBgColor,
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#A7C829',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    // fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
  },
});
export default LoginScreen;
