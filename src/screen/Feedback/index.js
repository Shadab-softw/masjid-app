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
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { CheckBox } from 'react-native-elements';

import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import CustomInput from '../../component/InputFileds';
import Textarea from '../../component/Textarea';
import CustomButton from '../../component/CustomButton';

const FeedbackScreen = ({ navigation }) => {
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [checked, setChecked] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [streetaddress, setStreetAddress] = useState('');
  const [addressline, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [stateregion, setStateRegion] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [write, setWrite] = useState('');


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
            Feedback
          </Text>
        </View>

        <ScrollView
          vertical={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          style={{ top: 2 }}>
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Text style={styles.heading}>Give Feedback To Us</Text>
            {/* <Text style={styles.subHeading}>Fill this form</Text> */}
          </View>
          {/* <View style={{width: '100%', paddingHorizontal: 20}}>
            <Text style={styles.heading1}> Send Us Message</Text>
          </View> */}

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
              plcholder="First Name"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden', }}
              onTextChange={value => setFirstName(value)}
              value={firstName}

            />
            <CustomInput
              plcholder="Last Name"
              leftIcon="user"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setLastName(value)}
              value={lastName}
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
                  //  fontWeight: '300',
                  fontSize: 15
                }}
                checked={maleChecked}
                checkedColor={CONSTANT.App.colors.Icon_Color}
                uncheckedColor={CONSTANT.App.colors.Icon_Color}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                onPress={e => {
                  setMaleChecked(!maleChecked);
                  // setFemaleChecked(!femaleChecked);
                }}
                containerStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  borderWidth: 0,
                }}
              />
              <CheckBox
                title="Female"
                textStyle={{
                  color: '#FFFFFF',
                  //  fontWeight: '300',
                  fontSize: 15
                }}
                checked={femaleChecked}
                checkedColor={CONSTANT.App.colors.Icon_Color}
                uncheckedColor={CONSTANT.App.colors.Icon_Color}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                onPress={e => {
                  setFemaleChecked(!femaleChecked);
                  // setMaleChecked(!maleChecked);
                }}
                containerStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  borderWidth: 0,
                }}
              />
            </View>
            <CustomInput
              plcholder="DD/MM/YYYY"
              leftIcon="calendar"
              style={{ paddingVertical: 10, }}
            // onTextChange={value => setCalendar(value)}
            // value={calendar}
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
              Contact Information
            </Text>
            <CustomInput
              plcholder="Email*"
              leftIcon="mail"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setEmail(value)}
              value={email}

            />
            <CustomInput
              plcholder="Mobile*"
              leftIcon="phone"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setMobile(value)}
              value={mobile}
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
              Address Information
            </Text>
            <CustomInput plcholder="Address" style={{ paddingVertical: 10, overflow: 'hidden' }} onTextChange={value => setAddress(value)}
              value={address} />
            <CustomInput
              plcholder="Street Address"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setStreetAddress(value)}
              value={streetaddress}
            />
            <CustomInput
              plcholder="Address Line 2"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setAddressLine(value)}
              value={addressline}
            />
            <CustomInput plcholder="City" style={{ paddingVertical: 10, overflow: 'hidden' }} onTextChange={value => setCity(value)}
              value={city} />
            <CustomInput
              plcholder="State / Province / Region"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setStateRegion(value)}
              value={stateregion}
            />
            <CustomInput
              plcholder="ZIP / Postal Code"
              style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setZipCode(value)}
              value={zipcode}
            />
            <CustomInput plcholder="Country" style={{ paddingVertical: 10, overflow: 'hidden' }}
              onTextChange={value => setCountry(value)}
              value={country} />
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
              Additional Information/Request*
            </Text>

            {/* <CustomInput plcholder="Comments" /> */}
            <Textarea style={{ overflow: 'hidden' }} plcholder="write here"
              onTextChange={value => setWrite(value)}
              value={write} />

            <CustomButton
              title={'Submit'}
              variant={'filled'}
            //   style={{marginTop: 80}}
            />
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

export default FeedbackScreen;

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
    fontSize: 22,
    // fontWeight: '600',
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
});
