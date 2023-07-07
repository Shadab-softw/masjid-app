import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import CONSTANT from '../../constants';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getChatApi } from '../../services/chatApi';
import { useAuth } from '../../hook/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { changeScreen } from './action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
});
const BgImage = ({ children }) => {
  const [initialRoute, setInitialRoute] = useState(CONSTANT.App.tabMenu.homeTAb);

  // const dispatch=useDispatch()
  // dispatch(changeScreen(initialRoute))
  const { auth, state } = useAuth()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);




  const userChatHandler = async () => {

    const data = {
      senderId: imamId,
      recieverId: state.user.id,
    }
    const result = await getChatApi(data)
    console.log(",<------", result)


  }


  // Check whether an initial notification is available



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground resizeMode="stretch"
        source={CONSTANT.App.screenImages.bg_Image}
        style={styles.container}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};
const BgDark = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={CONSTANT.App.screenImages.bg_Dark}
        style={styles.container}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

export { BgImage, BgDark };
