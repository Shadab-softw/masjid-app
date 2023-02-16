/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import CustomInput, { InputComp } from '../../component/InputFileds';

import CustomButton from '../../component/CustomButton';
import profile from '../../assets/images/profile.png';

import { BgImage } from '../../component/ImageContainer';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import CONSTANT from '../../constants';
const EditProfileScreen = ({ navigation, route }) => {
  const { username, emailId, mobileNumber } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(profile);
  const [profilename, setProfileName] = useState(username);
  const [email, setEmail] = useState(emailId);
  const [mobile, setMobile] = useState(mobileNumber);

  // const ChoosePhoto = () => {
  //   bs.current.snapTo(1);

  //   ImagePicker.openPicker({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   }).then(images => {
  //     setImage(images.path);
  //     //   setModalVisible(false);
  //     console.log(images.path);
  //     bs.current.snapTo(1);
  //   });
  //   setModalVisible(false);
  // };
  // const TakePhoto = () => {
  //   bs.current.snapTo(1);

  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   }).then(imagee => {
  //     setImage(imagee.path);
  //     console.log(imagee);
  //   });
  // };

  // const renderInner = () => (
  //   <View style={styles.panel}>
  //     <View style={{alignItems: 'center'}}>
  //       <Text style={styles.panelTitle}>Upload image</Text>
  //       <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
  //     </View>
  //     <View
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'space-around',
  //       }}>
  //       <View>
  //         <TouchableOpacity onPress={TakePhoto}>
  //           <Image
  //             source={CONSTANT.App.staticImages.camera}
  //             style={{left: 20}}
  //           />
  //           <Text
  //             style={{
  //               color: '#fff',
  //               fontSize: 15,
  //               fontWeight: '300',
  //               left: 2,
  //               top: 5,
  //             }}>
  //             Camera
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View>
  //         <TouchableOpacity onPress={ChoosePhoto}>
  //           <Image
  //             source={CONSTANT.App.staticImages.gallery}
  //             style={{left: 40}}
  //           />
  //           <Text
  //             style={{
  //               color: '#fff',
  //               fontSize: 15,
  //               fontWeight: '300',
  //               right: 5,
  //               top: 5,
  //             }}>
  //             Browse Gallery
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );

  // const renderHeader = () => (
  //   <View style={styles.header}>
  //     <View style={styles.panelHeader}>
  //       <View style={styles.panelHandle} />
  //     </View>
  //   </View>
  // );

  const bs = React.createRef();
  const fall = new Animated.Value(1);
  return (
    <>
      <BgImage>
        <View style={{ paddingHorizontal: 15 }}>
          <Animated.View
            style={{
              //   margin: 20,
              width: '100%',
              opacity: Animated.add(0.8, Animated.multiply(fall, 1.0)),
            }}>
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
                  left: 50,
                  lineHeight: 30,
                }}>
                Edit Profile
              </Text>
            </View>

            <View style={styles.medium}>

              <CustomInput
                value={profilename}
                onTextChange={value => setProfileName(value)}
                style={{ overflow: 'hidden', marginVertical: 15 }}
              />
              {/* </KeyboardAvoidingView> */}

              <CustomInput
                value={email}

                onTextChange={value => setEmail(value)}
                style={{ overflow: 'hidden', marginVertical: 15 }}
              />
              <CustomInput
                value={mobile}
                onTextChange={value => setMobile(value)}
                style={{ overflow: 'hidden', marginVertical: 15 }}
              />

              <CustomButton
                variant={'filled'}
                title={'Save Profile'}
                onPress={() =>
                  navigation.navigate(CONSTANT.App.screenNames.ProfileScreen)
                }
                style={{ top: 20 }}
              />
            </View>
            {/* </KeyboardAvoidingView> */}
            {/* </ScrollView> */}
          </Animated.View>
        </View>
      </BgImage>
      {/* <BottomSheet
        ref={bs}
        snapPoints={[250, -100]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        initialPosition={'50%'} //200, 300
        // snapPoints={['-10%', '40%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        enabledGestureInteraction={true}
      /> */}
    </>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    // padding: 20,
    backgroundColor: 'rgba(1, 4, 33, 1)',
    height: 205,
    paddingTop: 20,
    overflow: 'hidden',
    // position: 'absolute',
    // width: '100%',
    // flex: 1,
    // bottom: -10,

    // bottom: -60,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: 'rgba(1, 4, 33, 1)',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    overflow: 'hidden',
    top: 2,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  panelHandle: {
    width: 60,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#9D9D9D',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 23,
    height: 35,
    top: -25,
    color: '#fff',
  },
  panelSubtitle: {
    fontSize: 13,
    color: '#fff',
    top: -25,

    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
    backgroundColor: 'rgba(98,98,98,.4)',
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
  text1: {
    color: 'gray',
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
    height: 420,
    backgroundColor: 'rgba(98,98,98,.3)',
    borderRadius: 20,
    marginTop: '35%',
    padding: 20,
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
