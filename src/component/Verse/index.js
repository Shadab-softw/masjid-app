import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

import { BgImage } from '../../component/ImageContainer';

const VerseComp = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    getByChapter()
  }, [])

  const getByChapter = async () => {
    try {
      const result = await fetch('http://api.quran.com/api/v3/chapters/1/verses?recitation=1&translations=21&language=en&text_type=words')
      const resJson = await result.json()
      // resJson.verses.map(item=>{
      //   // console.log("item",item)
      //   // setData(item.words)

      // })



    } catch (err) {
      console.log(err)

    }

  }
  return (
    <BgImage>
      <Text style={{ color: 'white' }}>Quran Translation Screen</Text>
      {/* {      console.log("data",data)
}

{
 data.length > 0 &&  data.map(word=>{
    console.log("word",word.transliteration.text)

    return(
      <View>
        <Text style={{fontSize:12,color:'#FFFFFF'}}>{word.translation.text}</Text>
        <Text style={{fontSize:12,color:'#FFFFFF'}}>{word.transliteration.text}</Text>

      </View>
    )
})
} */}
    </BgImage>
  );
};

export { VerseComp };

const styles = StyleSheet.create({
  image: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
});
