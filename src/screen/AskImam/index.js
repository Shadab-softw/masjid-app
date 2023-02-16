/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
// import {Image} from 'react-native-elements/dist/image/Image';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements';

import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import CustomInput from '../../component/InputFileds';
import Textarea from '../../component/Textarea';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../../component/CustomButton';
import Feather from 'react-native-vector-icons/Feather';

// import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import { FeatherIcon } from '../../constants/Icons';

const AskImamScreen = ({ navigation, route }) => {
  const { data } = route.params;
  console.log('rrrrrrrrrrr', JSON.stringify(data, null, 2));
  // console.log('route>>>>>', JSON.stringify(route,null,2));
  const [maleChecked, setMaleChecked] = useState('Male');
  const [femaleChecked, setFemaleChecked] = useState('Female');
  const [selectedButton, setSelectedButton] = useState(false);

  const [checked, setChecked] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [image, setImage] = useState();
  const [isLoading, SetIsLoading] = useState(false);
  const [gender, setGender] = useState('');

  const [First_Name__c, setFirst_Name__c] = useState('');
  const [Last_Name__c, setLast_Name__c] = useState('');
  const [Gender__c, setGender__c] = useState('');
  const [Birthdate__c, setBirthdate__c] = useState('');
  const [SuppliedEmail, setSuppliedEmail] = useState('');
  const [SuppliedPhone, setSuppliedPhone] = useState('');
  const [Education__c, setEducation__c] = useState('');
  const [Profession__c, setProfession__c] = useState('');
  const [Subject, setSubject] = useState('');
  const [Description, setDescription] = useState('');

  // const [Origin,setOrigin]=useState('')
  // const [Form_Name__c,setForm_Name__c]=useState('')

  const openModelHandler = () => {
    setIsModel(true);
  };
  const onSubmitHandler = async () => {
    if (
      !First_Name__c ||
      !Last_Name__c ||
      !Gender__c ||
      !Birthdate__c ||
      !SuppliedEmail ||
      !SuppliedPhone ||
      !Education__c ||
      !Profession__c
    ) {
      alert('please fill all filed');
    }

    const Tokendata = {
      client_id:
        '3MVG9IHf89I1t8hrTNgMfDwzJbbCrn01It9zcfaYI47Cm6zYRPSmPfg8Y7mrhcdu91hqmLZ2nUyisK.7duVeZ',
      client_secret:
        '91F2C0419DDBC709B60285E991EA36E923EB77F719F301C54B31FAC402F9E39A',
      username: 'operations@altawheedjc.com',
      password: '7K7DHmaKjFWm2skS!!1rHyeuzjhW8PC3FbABi5munC',
    };

    const result = await fetch(
      `https://ap1.salesforce.com/services/oauth2/token?grant_type=password&client_id=${Tokendata.client_id}&client_secret=${Tokendata.client_secret}&username=${Tokendata.username}&password=${Tokendata.password}`,
      {
        method: 'post',
      },
    );

    const response = await result.json();
    console.log('result', response.access_token);

    console.log('gggggggggg', Birthdate__c);

    if (response.access_token) {
      const data = {
        First_Name__c,
        Last_Name__c,
        Gender__c,
        Birthdate__c,
        SuppliedEmail,
        SuppliedPhone,
        Education__c,
        Profession__c,
        Subject,
        Description,
      };

      console.log("gender", data);
      try {
        const response1 = await fetch(
          `https://altawheedjc.my.salesforce.com/services/data/v20.0/sobjects/Case`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${response.access_token}`,
            },
            body: JSON.stringify(data),
          },
        );
        const result = await response1.json();
        console.log('responsne', result);

        if (result.success === true) {
          alert('successfully submited');
        } else {
          alert('something went wrong');
        }
      } catch (err) {
        console.log(err);
      }
      setFirst_Name__c('');
      setLast_Name__c('');
      setGender__c('');
      setBirthdate__c('');
      setSuppliedEmail('');
      setSuppliedEmail('');
      setSuppliedPhone('');
      setEducation__c('');
      setProfession__c('');
      setSubject('');
      setDescription('');
    }
  };
  const calenderHandler = () => {
    setIsModel(true);
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
    // setModalVisible(false);
  };

  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const regex = /(<([^>]+)>)/gi;

  return (
    <BgImage>
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
              left: 80,
              lineHeight: 30,
            }}>
            Ask Imam
          </Text>
        </View>

        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ top: -16 }}>
          <Image
            source={{ uri: data[1].thumbnail }}
            style={{ width: '100%', height: 200 }}
          />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            {/* <Text style={styles.heading}>{data[1].title}</Text> */}
          </View>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                alignSelf: 'auto',
                marginTop: 10,
                // width:'96%',
                // width:'100%'
              }}>
              {' '}
              {data[1].description.replace(regex, '')}
            </Text>
          </View>
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.title1}>
              Submit the form below to send your Question to Imam
            </Text>
          </View>

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
              plcholder="First Name"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={First_Name__c}
              onTextChange={text => setFirst_Name__c(text)}
            />
            <CustomInput
              value={Last_Name__c}
              onTextChange={text => setLast_Name__c(text)}
              plcholder="Last Name"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
            />
            <View>
              <Text
                style={{
                  color: '#a7c829',
                  fontSize: 18,
                  // fontWeight: '600',
                  lineHeight: 20,
                  marginTop: 20,
                  marginLeft: 10,
                }}>
                Gender
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <CheckBox
                  center
                  title="Male"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={Gender__c === 'male' ? true : false}
                  checkedColor="#a7c829"
                  onPress={() => {
                    // alert(gender)
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
                  center
                  title="Female"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#a7c829"
                  checked={Gender__c === 'female' ? true : false}
                  onPress={() => setGender__c('female')}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    marginTop: -10,
                  }}
                />
              </View>
              {/* {
                                errgender ?
                                    <Text style={{fontSize: 14, color: 'red'}}>{errgender}</Text>
                                    :
                                    null
                            } */}
            </View>
            <View style={styles.textContainer}>
              {/* <RNPickerSelect
                placeholder={{
                  label: 'Select a Gender...',
                  value: null,
                }}
                placeholderTextColor="#9D9D9D"


                onValueChange={(value) => setGender__c(value)}

                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },

                ]}
                value={Gender__c}
                style={{ inputAndroid: { color: '#FFFFFF' } }

                
        
              }
                useNativeAndroidPickerStyle={false}


              /> */}
            </View>

            {/* <CustomInput
              plcholder="DD/MM/YYYY"
              leftIcon="calendar"
              style={{paddingVertical: 10}}
              value={Birthdate__c}
              onTextChange={(text)=>setBirthdate__c(text)}
              leftHandler={()=>calenderHandler()}
            /> */}

            <View style={[styles.textContainer, { paddingVertical: 8 }]}>
              <DatePicker
                style={{ width: 200 }}
                date={Birthdate__c}
                mode="date"
                // iconComponent={
                //   <Feather name="calendar"
                //     color={CONSTANT.App.colors.Icon_Color}
                //     size={20}
                //   />

                // }

                placeholder="select date"
                format="YYYY-MM-DD"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    // marginLeft: 36,
                    borderWidth: 0,
                    color: CONSTANT.App.colors.Icon_Color,
                    paddingVertical: 10,
                    // backgroundColor:'green',
                  },
                  placeholderText: {
                    color: '#9D9D9D',
                  },
                  dateText: {
                    color: '#FFFFFF',
                    fontSize: 15,
                  },

                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => setBirthdate__c(date)}
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
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={SuppliedEmail}
              onTextChange={text => setSuppliedEmail(text)}
            />
            <CustomInput
              plcholder="Mobile*"
              leftIcon="phone"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={SuppliedPhone}
              onTextChange={text => setSuppliedPhone(text)}
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
            <CustomInput
              value={Education__c}
              onTextChange={text => setEducation__c(text)}
              plcholder="Education"
              // leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
            />
            <CustomInput
              value={Profession__c}
              onTextChange={text => setProfession__c(text)}
              plcholder="Profession"
              // leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
            />
            <CustomInput
              value={Subject}
              onTextChange={text => setSubject(text)}
              plcholder="Subject"
              // leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
            />
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
            <Textarea style={{ overflow: 'hidden' }} plcholder="write here"
              value={Description}
              onTextChange={text => setDescription(text)}
            />

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
            {isLoading ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <CustomButton
                title={'Submit'}
                variant={'filled'}
                //   style={{marginTop: 80}}
                onPress={() => onSubmitHandler()}
              />
            )}
            <Text
              style={{
                color: '#9D9D9D',
                fontSize: 15,
                // fontWeight: '500',
                paddingVertical: 20,
              }}>
              By clicking submit you are agreeing to the Terms and Conditions.
            </Text>
          </View>
        </ScrollView>
      </View>
    </BgImage>
  );
};

export default AskImamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

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
    backgroundColor: '#1a1d2e',
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
  rowData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
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
  title1: {
    color: 'rgba(157, 157, 157, 1)',
    fontSize: 15,
    // fontWeight: '400',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    // height: 67,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    // fontWeight: '500',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 20,
    // height: 67,
  },
  heading1: {
    color: '#fff',
    fontSize: 20,
    // fontWeight: '600',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 20,
    // height: 67,
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
