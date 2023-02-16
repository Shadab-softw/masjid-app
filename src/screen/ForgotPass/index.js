/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomInput from '../../component/InputFileds';

import CustomButton from '../../component/CustomButton';

import CONSTANT from '../../constants';

import { BgImage } from '../../component/ImageContainer';

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

  text: {
    color: '#A7C829',
    // fontWeight: 'bold',
    fontSize: 30,
    marginTop: 15
  },
  paragraph: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontWeight: '400',
    lineHeight: 19.36,
    marginTop: 15

  },
  medium: {
    width: '100%',
    height: 235,
    backgroundColor: CONSTANT.App.colors.boxBgColor,
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
  },
  // inputContainer: {
  //   width: '100%',
  //   backgroundColor: '#9D9D9D',
  //   borderRadius: 15,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   paddingHorizontal: 15,
  //   paddingVertical: 6,
  //   marginBottom: 20,
  // },
  socialBox: {
    width: '100%',
    flexDirection: 'row',

    alignItems: 'center',
  },
  iconView: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DD4B39',
    justifyContent: 'center',
    padding: 15,
    marginLeft: 5,
    marginTop: 15,
    borderRadius: 10,
  },
  msg: {
    color: '#9D9D9D',
    fontSize: 14,
    lineHeight: 17,
    // fontWeight: '400',
    width: 294,
    height: 34,
    marginTop: 20
  },
});
const ForgotPassScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  return (
    <BgImage>
      <View style={styles.topContain}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContain}>
        <Text style={styles.text}>Forgot Password</Text>
        <Text style={styles.paragraph}>
          Enter your valid email id and we will send you a link to reset your
          password.
        </Text>
      </View>

      <View style={styles.medium}>
        <CustomInput
          plcholder="Email Id"
          onTextChange={value => {
            setEmail(value);
          }}
          leftIcon={'mail'}
        />

        <CustomButton
          variant={'filled'}
          title={'Submit'}
          style={{ marginTop: 20 }}
        />
        <Text style={styles.msg}>
          Not received? Please check your spam or junk mail folder message.
        </Text>
      </View>
    </BgImage>
  );
};

export default ForgotPassScreen;
