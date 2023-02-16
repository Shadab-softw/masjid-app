import React from 'react'
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
  
  import {BgImage} from '../../component/ImageContainer';
  import CustomInput from '../../component/InputFileds';

const ContactListScreen = () => {
    return (
        <BgImage>
            <Text>ContactListScreen</Text>
        </BgImage>
    )
}

export default ContactListScreen
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