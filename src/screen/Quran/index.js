/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { Icon } from 'react-native-element';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BgImage } from '../../component/ImageContainer';
import CONSTANT from '../../constants';
import { VerseComp } from '../../component/Verse';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import { Avatar } from 'react-native-elements';

const QuranScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [listChapter, setListChapter] = useState([]);
  const [chapterId, setChapterId] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getListChapter();
  }, []);
  const getListChapter = async () => {
    try {
      const responseJson = await fetch(
        'https://api.quran.com/api/v4/chapters?language=ur',
      );
      const result = await responseJson.json();
      setListChapter(result.chapters);
      // console.log(result)
    } catch (err) {
      console.log(err);
    }
  };

  const verseHandler = item => {
    // console.log("hiii",item)
    setChapterId(item.id);
    navigation.navigate(CONSTANT.App.screenNames.QuranTransScreen, { item });
  };
  return (
    <BgImage>
      <ScrollView>
        {/* <TouchableOpacity onPress={toggleModal}>
          <Text style={{color: '#FFFFFF'}}>Select Lang</Text>
        </TouchableOpacity> */}
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            flexDirection: 'row',
            marginTop: 24,
          }}>
          <TouchableOpacity
            style={{ height: 40, width: 40 }}
            onPress={() => {
              navigation.goBack(null);
            }}>
            <FeatherIcon name="chevron-left" color="#fff" size={20} />
          </TouchableOpacity>
          <View style={{ height: 40, width: '55%' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>Quran</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/quranAyatLogo.png')}
            style={{ height: 164, width: 286, resizeMode: 'cover' }}
          />
        </View>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 24,
            // fontWeight: '600',
          }}>
          The Noble Quran
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 16,
            // fontFamily: 'inter',
            lingeHeight: 19,
            color: '#A7C829',
            marginTop: 25,
            marginBottom: 15,
          }}>
          Popular Searches
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: 98,
              height: 37,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{
              color: '#fff', fontSize: 14,
              //  fontFamily: 'inter'
            }}>
              ayatul-kursi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: 98,
              height: 37,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 14 }}>ayatul-kursi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: 98,
              height: 37,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 14 }}>surah-al-mulk</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          {listChapter.map(item => {
            return (
              <TouchableOpacity
                style={styles.textmode}
                key={item.id}
                onPress={() => verseHandler(item)}>
                <View style={{ width: '10%' }}>
                  <Avatar
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: 35,
                    }}
                    rounded
                    title={item.id}
                    titleStyle={{
                      color: '#A7C829',
                      fontSize: 16,
                      // fontWeight: '400',
                    }}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 15,
                    width: '65%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      width: 100,
                      paddingLeft: 5,
                      color: '#FFFFFF',
                    }}>
                    {item.name_complex}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      width: 100,
                      paddingLeft: 5,
                      color: '#9D9D9D',
                      marginTop: 5,
                      // fontWeight: '500',
                    }}>
                    {item.revelation_place}
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      width: '100%',
                      paddingRight: 19,
                      color: '#A7C829',
                      // fontFamily: 'Arial Unicode MS',
                    }}>
                    {item.name_arabic}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <VerseComp />
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 30,
            width: '100%',
            height: 400,
            backgroundColor: '#FFFFFF',
          }}>
          <Button title="Hide modal" onPress={toggleModal} />

          <CircleCheckBox
            checked={true}
            onToggle={checked => console.log('My state is: ', checked)}
            labelPosition={LABEL_POSITION.RIGHT}
            label="Checkbox example"
          />
        </View>
      </Modal>
    </BgImage>
  );
};

export default QuranScreen;

const styles = StyleSheet.create({
  image: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
  textmode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'rgba(98,98,98,0.3)',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
});
