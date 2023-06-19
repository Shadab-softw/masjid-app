import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';

import {BgImage} from '../../component/ImageContainer';

const VerseComp = () => {

  const [data,setData]=useState([])
  useEffect(()=>{
    getByChapter()
  },[])

  const getByChapter=async()=>{
    try{
const result=await fetch('http://api.quran.com/api/v3/chapters/1/verses?recitation=1&translations=21&language=en&text_type=words')
const resJson=await result.json()
    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <BgImage>
      <Text style={{color: 'white'}}>Quran Translation Screen</Text>
    </BgImage>
  );
};

export {VerseComp};

const styles = StyleSheet.create({
  image: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
});
