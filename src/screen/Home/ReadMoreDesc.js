/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReadMoreDesc = props => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 2}
        style={{
          fontSize: 16,
          lineHeight: 19,
          color: '#fff',
          // fontWeight: '400',
          // fontStyle: 'normal',
          bottom: 1,
          display: 'flex',
          textAlign: 'left',
          alignItems: 'center'
        }}>
        {props.text}
      </Text>

      {lengthMore ? (
        <Text
          // onPress={toggleNumberOfLines}
          style={{ lineHeight: 21, marginTop: 10, color: '#a7c829' }}>
          {textShown ? '' : ''}
        </Text>
      ) : null}
    </View>
  );
};
export default ReadMoreDesc;
const styles = StyleSheet.create({});
