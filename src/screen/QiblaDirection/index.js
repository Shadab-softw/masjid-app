/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { BgImage } from '../../component/ImageContainer';
import Qibla from './Qibla';

const index = ({ navigation }) => {
  return (
    <BgImage>
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
            // fontWeight: '550',
            left: 70,
            lineHeight: 30,
          }}>
          Qibla Direction
        </Text>
      </View>
      <Qibla />
    </BgImage>
  );
};

export default index;

const styles = StyleSheet.create({
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
});
