/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Platform,
} from 'react-native';
// import {Image} from 'react-native-elements/dist/image/Image';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomInput from '../../component/InputFileds';
import Textarea from '../../component/Textarea';
import { CheckBox } from 'react-native-elements';

import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import CustomInput from '../../component/InputFileds';
// import Textarea from '../../component/Textarea';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../../component/CustomButton';
import Feather from 'react-native-vector-icons/Feather';

const ContactUsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [Gender__c, setGender__c] = useState('');
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  // const [firstName , setFirstName] = useState('');
  // const [lastName , setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [MobilePhone, setMobilePhone] = useState('');
  const [Description, setDescription] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Company, setCompany] = useState('xyz');
  const [Form_Name__c, setForm_Name__c] = useState('');
  const [LeadSource, setLeadSource] = useState('');
  // const [isModalVisible, setModalVisible] = useState(false);

  const submitHandler = async () => {
    try {

      const data = {
        FirstName,
        LastName,
        Company,
        Form_Name__c,
        LeadSource,
        Gender__c,
        Email,
        MobilePhone,
        Description,
      };
      console.log(data);
      const token = '00D4P000000zWtC!AQwAQC0qgx9W3pKdZjb5sz62pujfanp2aZ1ERsTQIlO8kzOz6VtVKDAsHUhwmfAXpoKopHRsYhmyEY_dLYPuiUA7RD240yzX';
      const result = await fetch('https://altawheedjc.my.salesforce.com/services/data/v20.0/sobjects/Lead', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify(data),

      });
      console.log('result', result);
      if (result.ok === true) {
        // setModalVisible(true)
        alert('Sucsessully sent');
      }

    } catch (err) {
      console.log(err);
    }
    setFirstName('');
    setLastName('');
    setCompany('');
    setForm_Name__c('');
    setLeadSource('');
    setEmail('');
    setGender__c('');
    setMobilePhone('');
    setDescription('');
    setLeadSource('');


  };
  const ChoosePhoto = () => {
    // bs.current.snapTo(1);

    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(images => {
      setImage(images.path);
      //   setModalVisible(false);
      console.log(images.path);
      //   bs.current.snapTo(1);
    });
    setModalVisible(false);
  };

  const bs = React.createRef();
  const fall = new Animated.Value(1);
  return (
    <BgImage>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.mainView}  >
          <View style={styles.container}>
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
                  left: 85,
                  lineHeight: 30,
                }}>
                Contact us
              </Text>
            </View>
            <ScrollView
              vertical={true}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              style={{ top: -16 }}>
              <View style={{ width: '100%', paddingHorizontal: 20 }}>
                <Text style={styles.title}>
                  We would like your suggestions and feedback to improve our
                  services. We also wish to address any complaints as best we
                  can.
                </Text>
              </View>
              <KeyboardAvoidingView enabled>
                <View style={styles.inContainer}>
                  <Image
                    source={CONSTANT.App.screenImages.contactImg}
                    style={{ width: '100%' }}
                  />
                  <Text
                    style={{
                      color: '#a7c829',
                      fontSize: 18,
                      // fontWeight: '600',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 20,
                    }}>
                    Masjid
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 18,
                      marginTop: 15,
                    }}>
                    <AntDesign
                      name="mail"
                      style={{ color: '#a7c829', fontSize: 20 }}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                        // fontWeight: '400',
                        lineHeight: 20,
                        marginLeft: 10,
                      }}>
                      contact@aticjc.com
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 18,
                      marginTop: 15,
                    }}>
                    <Ionicons
                      name="md-location-outline"
                      style={{ color: '#a7c829', fontSize: 20 }}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                        // fontWeight: '400',
                        lineHeight: 20,
                        marginLeft: 5,
                        paddingRight: 10,
                        width: 265,
                      }}>
                      Al Tawheed Center, 984 Westside Ave, Jersey City, NJ
                      07306, United States
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '70%',
                      borderBottomWidth: 1,
                      borderColor: '#fff',
                      paddingTop: 20,
                      left: 20,
                      opacity: 20,
                      marginHorizontal: 20,
                    }} />
                  <Text
                    style={{
                      color: '#a7c829',
                      fontSize: 18,
                      // fontWeight: '600',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 20,
                    }}>
                    Masjid Office
                  </Text>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginLeft: 18,
                      marginTop: 15,
                    }}>
                    <Ionicons
                      name="md-location-outline"
                      style={{ color: '#a7c829', fontSize: 20 }}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                        // fontWeight: '400',
                        lineHeight: 20,
                        marginLeft: 5,
                        paddingRight: 10,
                        width: 265,
                        paddingBottom: 30,
                      }}>
                      Al Tawheed Center, 984 Westside Ave, Jersey City, NJ
                      07306, United States
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 21,
                    lineHeight: 24,
                    // fontWeight: '600',
                    top: 60,
                    left: 4,
                  }}>
                  Get in touch
                </Text>
                <Text
                  style={{
                    color: '#9D9D9D',
                    fontSize: 17,
                    // fontWeight: '500',
                    lineHeight: 20,
                    marginLeft: 4,
                    top: 70,
                    paddingRight: 10,
                    width: 315,
                  }}>
                  Want to get in touch? We'd love to hear from you. Here's how
                  you can reach us
                </Text>
                <View style={styles.inContainer1}>
                  <Text

                    style={{
                      color: '#a7c829',
                      fontSize: 18,
                      // fontWeight: '600',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 10,
                    }}>
                    Personal Information
                  </Text>
                  <CustomInput
                    value={FirstName}
                    onTextChange={(value) => setFirstName(value)}

                    plcholder="First Name"
                    leftIcon={'user'}
                    style={{ marginBottom: 15, paddingVertical: 10, overflow: 'hidden' }}

                  />
                  <CustomInput
                    value={LastName}
                    onTextChange={(value) => setLastName(value)}

                    plcholder="Last Name"
                    leftIcon={'user'}
                    style={{ marginBottom: 15, paddingVertical: 10 }}
                  />
                  <Text
                    style={{
                      color: 'rgba(157, 157, 157, 1)',
                      fontSize: 16,
                      // fontWeight: '600',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 10,
                    }}>
                    Gender*
                  </Text>
                  <View style={styles.rowData}>
                    <CheckBox
                      title="Male"
                      textStyle={{
                        color: '#FFFFFF',
                        // fontWeight: '300',
                        fontSize: 15,
                      }}
                      checked={Gender__c === 'male' ? true : false}
                      checkedColor="#a7c829"
                      uncheckedColor={CONSTANT.App.colors.Icon_Color}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={e => {
                        setGender__c('male');
                      }}
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        marginTop: -10,
                        alignItems: 'flex-start',
                      }}
                    />
                    <CheckBox
                      title="Female"
                      textStyle={{
                        color: '#FFFFFF',
                        // fontWeight: '300',
                        fontSize: 15,
                      }}
                      checked={Gender__c === 'female' ? true : false}
                      checkedColor="#a7c829"
                      uncheckedColor={CONSTANT.App.colors.Icon_Color}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      onPress={() => setGender__c('female')}
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        marginTop: -10,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#a7c829',
                      fontSize: 18,
                      // fontWeight: '600',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 10,
                    }}>
                    Contact Information
                  </Text>
                  <CustomInput
                    plcholder="Email*"
                    leftIcon="mail"
                    style={{ paddingVertical: 10, overflow: 'hidden' }}
                    onTextChange={value => setEmail(value)}
                    value={Email}
                  />
                  <CustomInput
                    plcholder="Mobile*"
                    leftIcon="phone"
                    style={{ paddingVertical: 10, overflow: 'hidden' }}
                    onTextChange={value => setMobilePhone(value)}
                    value={MobilePhone}
                  />
                  <Text
                    style={{
                      color: '#a7c829',
                      fontSize: 18,
                      // fontWeight: '600',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 10,
                    }}>
                    Additional Information
                  </Text>

                  <Text
                    style={{
                      color: 'rgba(157, 157, 157, 1)',
                      fontSize: 16,
                      // fontWeight: '400',
                      lineHeight: 20,
                      marginTop: 20,
                      marginLeft: 10,

                    }}>
                    Reason for Contact*
                  </Text>

                  {/* <CustomInput plcholder="Comments" /> */}
                  <Textarea style={{ overflow: 'hidden' }} plcholder="write here" onTextChange={value => setDescription(value)}
                    value={Description} />

                  <View style={styles.boxC}>
                    <View style={styles.boxwrap}>
                      <TouchableOpacity onPress={ChoosePhoto}>
                        <View style={styles.box1}>
                          <Feather name="image" style={styles.img} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.boxwrap}>
                      <TouchableOpacity onPress={ChoosePhoto}>
                        <View style={styles.box1}>
                          <Feather name="image" style={styles.img} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.boxwrap}>
                      <TouchableOpacity onPress={ChoosePhoto}>
                        <View style={styles.box1}>
                          <Feather name="image" style={styles.img} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.boxwrap}>
                      <TouchableOpacity onPress={ChoosePhoto}>
                        <View style={styles.box1}>
                          <Feather name="image" style={styles.img} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: '#9D9D9D',
                      fontSize: 13,
                      // fontWeight: '400',
                      paddingVertical: 10,
                    }}>
                    PNG,JPG & DOC file only
                  </Text>
                  <CheckBox
                    title="Signup for Newsletter"
                    textStyle={{
                      color: 'rgba(157, 157, 157, 1)',
                      // fontWeight: '300',
                      fontSize: 15,
                      left: -10,
                      top: -2,
                    }}
                    checked={checked}
                    checkedColor={{ backgroundColor: 'rgba(157, 157, 157, 1)' }}
                    uncheckedColor={{ backgroundColor: 'rgba(157, 157, 157, 1)' }}
                    // uncheckedColor={CONSTANT.App.colors.Icon_Color}
                    onPress={e => setChecked(!checked)}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      left: -13,
                    }}
                  />
                  <CustomButton
                    title={'Submit'}
                    variant={'filled'}
                    //   style={{marginTop: 80}}
                    onPress={submitHandler}
                  />
                  <Text
                    style={{
                      color: '#9D9D9D',
                      fontSize: 15,
                      // fontWeight: '500',
                      paddingVertical: 20,
                    }}>
                    By clicking submit you are agreeing to the Terms and
                    Conditions.
                  </Text>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BgImage>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
  },
  rowData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,

    overflow: 'hidden',
  },
  inContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 35,
    overflow: 'hidden',
    borderRadius: 10,
  },
  inContainer1: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 90,
    overflow: 'hidden',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 20,


  },
  topContain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // top: 10,
    height: 120,
    overflow: 'hidden',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxC: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  boxwrap: {
    height: 82,
    width: 68,
    backgroundColor: 'rgba(98, 98, 98, 0.5)',
    borderRadius: 10,

    padding: 1,
  },
  box1: {
    borderRadius: 10,
    height: 80,
    width: 66,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  img: {
    fontSize: 20,
    color: '#9D9D9D',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 17,
    // fontWeight: '400',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    // height: 67,
  },
});
