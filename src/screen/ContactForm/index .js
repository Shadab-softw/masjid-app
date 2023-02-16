/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import CustomButton from '../../component/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

import { BgImage } from '../../component/ImageContainer';
import CustomInput from '../../component/InputFileds';
const ContactForm = ({ navigation }) => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Company, setCompany] = useState('')
  const [Form_Name__c, setForm_Name__c] = useState('')
  const [LeadSource, setLeadSource] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);

  const submitHandler = async () => {
    try {

      const data = {
        FirstName,
        LastName,
        Company,
        Form_Name__c,
        LeadSource


      }
      console.log(data)
      const token = '00D4P000000zWtC!AQwAQPceg8CYKVqKFOBN0gF_jjD4fRacUHX3XO7i2Ic1Y1OqBZ2dBGboTX7UuNIk1_cMqJc05hJ9tkCz2p3Y0L6OsA0BgW3.'
      const result = await fetch('https://altawheedjc.my.salesforce.com/services/data/v20.0/sobjects/Lead', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`

        },
        body: JSON.stringify(data)

      })
      console.log("result", result)
      if (result.ok === true) {
        // setModalVisible(true)
        alert("Sucsessully Lead created !!!")
      }

    } catch (err) {
      console.log(err)
    }
    setFirstName('')
    setLastName('')
    setCompany('')
    setForm_Name__c('')
    setLeadSource('')


  }

  // const toggleModal = () => {
  //   setModalVisible(false);
  // };

  return (
    <BgImage>
      <View style={styles.container}>
        <View
          style={{
            top: 30,
            height: 80,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',

              fontSize: 25,
              // fontWeight: '500',
              marginLeft: 40,
            }}>
            Contact Form
          </Text>
        </View>
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={false}
          style={{ overflow: 'hidden' }}>
          <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
            <CustomInput
              value={FirstName}
              onTextChange={(value) => setFirstName(value)}

              plcholder="First Name"
              leftIcon={'user'}
              style={{ marginBottom: 15, paddingVertical: 10 }}
            />
            <CustomInput
              value={LastName}
              onTextChange={(value) => setLastName(value)}

              plcholder="Last Name"
              leftIcon={'user'}
              style={{ marginBottom: 15, paddingVertical: 10 }}
            />
            <CustomInput
              value={Company}

              onTextChange={(value) => setCompany(value)}

              plcholder="Company Name"
              leftIcon={'user'}
              style={{ marginBottom: 15, paddingVertical: 10 }}
            />
            <CustomInput
              value={Form_Name__c}
              onTextChange={(value) => setForm_Name__c(value)}

              plcholder="Form Name"
              leftIcon={'user'}
              style={{ marginBottom: 15, paddingVertical: 10 }}
            />
            <CustomInput
              value={LeadSource}
              onTextChange={(value) => setLeadSource(value)}

              plcholder="LeadSource"
              leftIcon={'user'}
              style={{ marginBottom: 15, paddingVertical: 10 }}
            />

            <CustomButton variant={'filled'} title={'Submit'} onPress={submitHandler} />
          </View>
        </ScrollView>
      </View>
      {/* <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>lead created Successfully!</Text>
          <TouchableOpacity onPress={toggleModal }>
            <Text style={{fontSize:30}}>X</Text>

          </TouchableOpacity>

        </View>
      </Modal>
 */}
    </BgImage>
  );
};

export default ContactForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
