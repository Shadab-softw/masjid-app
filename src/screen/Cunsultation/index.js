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
  ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
// import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';

import { CheckBox } from 'react-native-elements';

import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import CustomInput from '../../component/InputFileds';
import Textarea from '../../component/Textarea';
import CustomButton from '../../component/CustomButton';

const CunsultationScreen = ({ navigation, route }) => {
  const { data } = route.params
  console.log("ddd", data)
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [First_Name__c, setFirst_Name__c] = useState('')
  const [Last_Name__c, setLast_Name__c] = useState('')
  const [Gender__c, setGender__c] = useState('')
  const [gender, setGender] = useState('')
  const [SuppliedEmail, setSuppliedEmail] = useState('')
  const [SuppliedPhone, setSuppliedPhone] = useState('')
  const [Subject, setSubject] = useState('')
  const [Description, setDescription] = useState('')
  const [Origin, setOrigin] = useState('')
  const [Form_Name__c, setForm_Name__c] = useState('')
  const [isLoading, SetIsLoading] = useState(false)

  const onSubmitHandler = async () => {

    console.log('hiii')
    if (!First_Name__c || !Last_Name__c || !gender || !SuppliedEmail || !SuppliedPhone || !Subject) {
      alert("please fill all filed")

    }

    const Tokendata = {
      client_id: '3MVG9IHf89I1t8hrTNgMfDwzJbbCrn01It9zcfaYI47Cm6zYRPSmPfg8Y7mrhcdu91hqmLZ2nUyisK.7duVeZ',
      client_secret: '91F2C0419DDBC709B60285E991EA36E923EB77F719F301C54B31FAC402F9E39A',
      username: 'operations@altawheedjc.com',
      password: '7K7DHmaKjFWm2skS!!1rHyeuzjhW8PC3FbABi5munC'
    }


    const result = await fetch(`https://ap1.salesforce.com/services/oauth2/token?grant_type=password&client_id=${Tokendata.client_id}&client_secret=${Tokendata.client_secret}&username=${Tokendata.username}&password=${Tokendata.password}`, {
      method: 'post'
    })

    const response = await result.json()

    if (response.access_token) {

      const data = {
        First_Name__c,
        Last_Name__c,
        gender,
        SuppliedEmail,
        SuppliedPhone,
        Subject,
        Description,
        Origin,
        Form_Name__c,
      }

      console.log(data)
      try {
        const response1 = await fetch(`https://altawheedjc.my.salesforce.com/services/data/v20.0/sobjects/Case`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.access_token}`
          },
          body: JSON.stringify(data)
        })
        const result = await response1.json()
        console.log("responsne", result)

        if (result.success === true) {
          alert("successfully submited")
        } else {
          alert("something went wrong")

        }
      }
      catch (err) {
        console.log(err)
      }

      setFirst_Name__c("")
      setLast_Name__c("")
      setGender__c("")
      setSuppliedEmail("")
      setSuppliedPhone("")
      setSubject("")
      setDescription("")
      setOrigin("")
      setForm_Name__c("")

      SetIsLoading(false)
    }
  }





  // /(<([^>]+)>)/gi
  const regex = /(<([^>]+)>)/gi
  // someText = someText.replace(/(\r\n|\n|\r)/gm, "");

  console.log(data[6].description.replace(regex, ''))

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
              left: 40,
              lineHeight: 30,
            }}>
            Cunsultation Services
          </Text>
        </View>

        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          style={{ top: 2 }}>
          <Image
            source={{ uri: data[6].thumbnail }}
            style={{ width: '100%', height: 200 }}
          />

          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.heading}>
              {data[6].title}
            </Text>
            {/* <Text style={styles.subHeading}>Fill this form</Text> */}
          </View>
          <View style={{ width: '100%' }}>
            <Text style={{
              color: '#fff',
              fontSize: 14,
              alignSelf: 'auto',
              // width:'96%',
              // width:'100%'

            }}> {data[6].description.replace(regex, '')}</Text>
          </View>

          <View style={styles.inContainer1}>
            <Text
              style={{
                color: '#a7c829',
                fontSize: 18,
                // fontWeight: '600',
                lineHeight: 20,
                marginTop: 10,
                marginLeft: 10,
                paddingBottom: 10,
              }}>
              Personal Information
            </Text>
            <CustomInput
              value={First_Name__c}
              onTextChange={(text) => setFirst_Name__c(text)}
              plcholder="First Name"
              leftIcon="user"
              style={{ paddingVertical: 10 }}
            />

            <CustomInput
              value={Last_Name__c}
              onTextChange={(text) => setLast_Name__c(text)}

              plcholder="Last Name"
              leftIcon="user"
              style={{ paddingVertical: 10 }}
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

              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  center
                  title="Male"
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={gender === 'male' ? true : false}
                  checkedColor="#801088"
                  onPress={() => {
                    // alert(gender)
                    setGender('male');
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
                  checkedColor="#801088"
                  checked={gender === 'female' ? true : false}
                  onPress={() => setGender('female')}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    marginTop: -10,
                  }}
                />
              </View>
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
            <Text
              style={{
                color: '#a7c829',
                fontSize: 18,
                // fontWeight: '600',
                lineHeight: 20,
                marginTop: 20,
                marginLeft: 10,
                paddingBottom: 10,
              }}>
              Contact Information
            </Text>
            <CustomInput
              value={SuppliedEmail}
              onTextChange={(text) => setSuppliedEmail(text)}
              plcholder="Email*"
              leftIcon="mail"
              style={{ paddingVertical: 10 }}
            />
            <CustomInput
              value={SuppliedPhone}
              onTextChange={(text) => setSuppliedPhone(text)}

              plcholder="Mobile*"
              leftIcon="phone"
              style={{ paddingVertical: 10 }}
            />

            <Text
              style={{
                color: '#a7c829',
                fontSize: 18,
                // fontWeight: '600',
                lineHeight: 20,
                marginTop: 20,
                marginLeft: 10,
                paddingBottom: 10,
              }}>
              Additional Information
            </Text>

            <Text
              style={{
                color: 'rgba(157, 157, 157, 1)',
                fontSize: 16,
                // fontWeight: '400',
                lineHeight: 20,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}>
              Subject*
            </Text>
            <CustomInput style={{ paddingVertical: 10 }}
              value={Subject}
              onTextChange={(text) => setSubject(text)}


            />
            <Text
              style={{
                color: 'rgba(157, 157, 157, 1)',
                fontSize: 16,
                // fontWeight: '400',
                lineHeight: 20,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}>
              Additional Information/Request*
            </Text>

            {/* <CustomInput plcholder="Comments" /> */}
            <Textarea plcholder="write here"
              value={Description}
              onTextChange={(text) => setDescription(text)}
            />
            <CustomInput style={{ paddingVertical: 10 }}
              value={Origin}
              plcholder="origin"
              onTextChange={(text) => setOrigin(text)} />

            <CustomInput style={{ paddingVertical: 10 }}
              value={Form_Name__c}
              onTextChange={(text) => setForm_Name__c(text)}
              plcholder="form name"

            />

            {
              isLoading ? <ActivityIndicator size="large" color="green" />
                :
                <CustomButton
                  title={'Submit'}
                  variant={'filled'}
                  //   style={{marginTop: 80}}
                  onPress={() => onSubmitHandler()}
                />

            }
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

export default CunsultationScreen;

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
    top: 40,
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
    fontSize: 20,
    // fontWeight: '600',
    lineHeight: 25,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 10,
    alignSelf: 'flex-start'
    // height: 67,
  },
  subHeading: {
    color: '#f4f5f4',
    fontSize: 15,
    // fontWeight: '500',
    lineHeight: 20,
    width: '100%',
    left: -15,
    // top: 10,
    paddingVertical: 20,
    // height: 67,
  },
  heading1: {
    color: '#fff',
    fontSize: 22,
    // fontWeight: '700',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 10,
    // height: 67,
  },
  textContainer: {
    width: "100%",
    backgroundColor: '#1a1d2e',
    paddingLeft: 20,
    borderRadius: 8,
    opacity: 0.9,
  },

});
