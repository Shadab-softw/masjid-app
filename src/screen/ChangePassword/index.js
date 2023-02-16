/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import CustomInput, { InputComp } from '../../component/InputFileds';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useState } from 'react';
import { onChange } from 'react-native-reanimated';
import CustomButton from '../../component/CustomButton';
import { AntDesigns, FontAwesomes } from '../../constants/Icons';
import CONSTANT from '../../constants';
import { LoginApi } from '../../services/Auth';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../../context/authContext';
import { BgImage } from '../../component/ImageContainer';
import { color } from 'react-native-elements/dist/helpers';

const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [erroremailmsg, setErroremailmsg] = useState('');
  const [errorPassmsg, setErrorPassmsg] = useState('');
  const [data, setData] = useState(false);
  const [isSecure, setSecure] = useState(true);
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrormsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isEmailValid, setEmailValid] = useState('');
  const [isPasswrdValid, setIsPasswrdValid] = useState('');

  const dispatch = useDispatch();
  const { login } = useContext(AuthContext);

  const ValidateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async () => {
    var isValid = [];

    if (email === '') {
      isValid.push(false);
      setErrormsg('! Please fill the fileds');
    } else {
      isValid.push(true);
      setErrormsg('');
    }

    if (password === '') {
      isValid.push(false);
      setPass('! Please fill the password fileds');
    } else {
      isValid.push(true);
      setErrormsg('');
    }
  };

  return (
    <BgImage>
      <View style={styles.topContain}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            fontSize: 21,
            // fontWeight: '500',
            left: 50,
            lineHeight: 20,

          }}>
          Change password
        </Text>
      </View>

      <View style={styles.medium}>
        <CustomInput style={{ overflow: 'hidden', }}
          plcholder="Old password"
          onTextChange={value => {
            setEmail(value);

          }}
          leftIcon={'lock'}
        />
        <TouchableOpacity>
          <Text
            style={{
              color: '#a7c829',
              fontSize: 18,
              // fontWeight: '700',
              lineHeight: 20,
              textAlign: 'right',
              marginTop: 15,
              overflow: 'hidden',
            }}
            onPress={() =>
              navigation.navigate(CONSTANT.App.screenNames.forgot)
            }>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <CustomInput
          plcholder="New password"
          onTextChange={value => {
            setEmail(value);
          }}
          leftIcon={'lock'}
          style={{ marginTop: 15, overflow: 'hidden', }}
        />
        <CustomInput
          isSecure={isSecure}
          plcholder="Confirm password"
          onTextChange={value => {
            setPassword(value);
          }}
          leftIcon={'lock'}
          style={{ marginTop: 15, overflow: 'hidden', }}
        />

        <CustomButton
          variant={'filled'}
          title={'Change Password'}
          onPress={onSubmit}
          style={{ marginTop: 15 }}
        />
        <Text
          style={{
            fontSize: 16,
            // fontWeight: '400',
            color: '#9D9D9D',
            textAlign: 'center',
            top: 15,
          }}>
          please do not share your password with anyone.{' '}
        </Text>
      </View>
    </BgImage>
  );
};

export default ChangePassword;
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
    borderRadius: 10,
    backgroundColor: '#515151',
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
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 7,
  },
  medium: {
    width: '100%',
    height: 380,
    backgroundColor: CONSTANT.App.colors.boxBgColor,
    borderRadius: 20,
    marginTop: '22%',
    padding: 20,
    overflow: 'hidden',
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
