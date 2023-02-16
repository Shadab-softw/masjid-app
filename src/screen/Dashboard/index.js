import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import {BgImage} from '../../component/ImageContainer';
import messaging from '@react-native-firebase/messaging';

const DashBoardScreen = () => {
  return (
    <BgImage>
      <Text>DashBoardScreen Screen</Text>
    </BgImage>
  );
};

export default DashBoardScreen;
