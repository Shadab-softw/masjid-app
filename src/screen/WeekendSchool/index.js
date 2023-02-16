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

import { CheckBox } from 'react-native-elements';

import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import CustomInput from '../../component/InputFileds';
import Textarea from '../../component/Textarea';
import CustomButton from '../../component/CustomButton';
// import RNPickerSelect from 'react-native-picker-select';

const WeekendSchoolScreen = ({ navigation, route }) => {
  const { data } = route.params;
  console.log("data", data)
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, SetIsLoading] = useState(false)

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastname] = useState('')
  const [Company, setCompany] = useState('')
  const [Gender__c, setGender__c] = useState('')
  const [gender, setGender] = useState('')
  const [Email, setEmail] = useState('')
  const [MobilePhone, setMobilePhone] = useState('')
  const [Description, setDescription] = useState('')
  const [Form_Name__c, setForm_Name__c] = useState('')
  const [LeadSource, setLeadSource] = useState('')



  const onSubmitHandler = async () => {
    SetIsLoading(true)
    if (!FirstName || !LastName || !Company || !Gender__c || !Email || !MobilePhone || !Description || !Form_Name__c || !LeadSource) {
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
    console.log("result", response.access_token)

    if (response.access_token) {

      const data = {
        FirstName,
        LastName,
        Company,
        Gender__c,
        Email,
        MobilePhone,
        Description,
        Form_Name__c,
        LeadSource



      }
      console.log(data)
      try {
        const response1 = await fetch(`https://altawheedjc.my.salesforce.com/services/data/v20.0/sobjects/Lead`, {
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
      setFirstName("")
      setLastname("")
      setCompany("")
      setGender__c("")
      setEmail("")
      setMobilePhone("")
      setDescription("")
      setForm_Name__c("")
      setLeadSource("")


      SetIsLoading(false)

    }

  }
  const regex = /(<([^>]+)>)/gi


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
            Weekend School
          </Text>
        </View>


        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          style={{ top: 2 }}>
          <Image
            source={{ uri: data[3].thumbnail }}
            style={{ width: '100%', height: 200 }}
          />

          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            {/* <Text style={styles.heading}>Stay connected With Us</Text> */}
            <Text style={styles.heading1}>{data[3].title}</Text>
          </View>
          <View style={{ width: '100%' }}>
            <Text style={{
              color: '#fff',
              fontSize: 14,
              alignSelf: 'auto',
              marginTop: 10
              // width:'96%',
              // width:'100%'

            }}> {data[3].description.replace(regex, '')}</Text>
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
              value={FirstName}
              onTextChange={(text) => setFirstName(text)}
              plcholder="First Name"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
            />
            <CustomInput
              value={LastName}
              onTextChange={(text) => setLastname(text)}

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
              plcholder="Email*"
              leftIcon="mail"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={Email}
              onTextChange={(text) => setEmail(text)}
            />
            <CustomInput
              plcholder="Mobile*"
              leftIcon="phone"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={MobilePhone}
              onTextChange={(text) => setMobilePhone(text)}


            />
            <CustomInput
              plcholder="Company*"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={Company}
              onTextChange={(text) => setCompany(text)}


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
              Enquiry*
            </Text>

            {/* <CustomInput plcholder="Comments" /> */}
            <Textarea plcholder="write here" value={Description}
              onTextChange={(text) => setDescription(text)}
            />
            <CustomInput
              plcholder="Form"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={Form_Name__c}
              onTextChange={(text) => setForm_Name__c(text)}
            />
            <CustomInput
              plcholder="Lead"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              value={LeadSource}
              onTextChange={(text) => setLeadSource(text)}
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

export default WeekendSchoolScreen;

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
    fontSize: 26,
    // fontWeight: '800',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    paddingVertical: 10,
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
