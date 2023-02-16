/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReadMoreComp = ({ description }) => {
  console.log("description", description)
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

  const bookName = text => {
    const regex = /(<([^>]+&<p>,)>)/gi;
    return text.replace(regex, '');
  };

  return (
    <View style={styles.mainContainer}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 2}
        style={styles.title}>
        {bookName(description)}
      </Text>

      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{
            marginTop: 20,
            fontSize: 17,
            // fontWeight: '400',
            lineHeight: 20,
            marginRight: 20,
            color: '#a7c829',
          }}>
          {textShown ? 'Show less' : 'Read more'}
        </Text>
      ) : null}
    </View>
  );
};
export default ReadMoreComp;
const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: '400',
    lineHeight: 20,
    width: '100%',
    left: -15,
    top: 10,
    // height: 67,
  },
});
