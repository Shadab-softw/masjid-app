/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CONSTANT from '../../constants';

const ReadMoreComp = props => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [verseData, setVerseData] = useState();

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  useEffect(() => {
    DailyVerse();
  }, []);
  const DailyVerse = async () => {
    try {
      let response = await fetch(CONSTANT.Api.DailyVerse,
        {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk',
          },
        },
      );
      let responseJson = await response.json();
      setVerseData(responseJson?.data);
      // console.log('DailyVerse', JSON.stringify(responseJson?.data,null,2));

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 2}

        style={{
          color: '#fff',
          fontSize: 17,
          // width: '100%',
          // fontWeight: '300',
          lineHeight: 30,
          // fontStyle: 'normal',
          marginTop: 0,

          top: -40,
        }}>
        {verseData?.eng_verse}

      </Text>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 2} style={{
          color: '#fff',
          fontSize: 17,
          // width: '100%',
          // fontWeight: '300',
          lineHeight: 30,
          // fontStyle: 'normal',
          marginTop: 0,
          top: -27,
        }}> {verseData?.arb_verse}</Text>

      <Text
        style={{
          color: '#9D9D9D',
          // top: 10,
          fontSize: 17,
          // fontWeight: '500',
          lineHeight: 17,
          // top: -10,
        }}>
        {verseData?.arb_title}
      </Text>

      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{ lineHeight: 21, marginTop: 10, color: '#a7c829' }}>
          {textShown ? 'Show less' : 'Read more'}
        </Text>
      ) : null}
    </View>
  );
};
export default ReadMoreComp;
const styles = StyleSheet.create({});
