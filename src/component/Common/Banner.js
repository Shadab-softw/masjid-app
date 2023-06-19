/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-looped-carousel';
import CONSTANT from '../../constants';

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

const {width} = Dimensions.get('window');
// const height=width*100/100;  //60%
const height = 200;
const BannerImgComp = () => {
  const [banner, setBanner] = useState();
  const [layoutStyle, setLayoutStyle] = useState({
    width: '100%',
    height: 190,
  });
  useEffect(() => {
    BannerImg();
  }, []);
  const BannerImg = async () => {
    try {
      const responseJson = await fetch( 
       // http://community.sadathussain.com/api/event-banner
        'http://app.altawheedjc.org/api/event-banner',
      );
      const result = await responseJson.json();
      setBanner(result?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {banner && (
        <Carousel
          //   delay={2000}
          style={layoutStyle}
          autoplay={false}
          //   pageInfo
          pagingEnabled
          bullets={true}
          chosenBulletStyle={{
            backgroundColor: 'gray',
            color: 'white',
            fontSize: 15,
            width: 12,
            height: 12,
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:40
          }}
          bulletStyle={{
            backgroundColor: '#b3afaf',
            borderWidth: 0,
            color: 'white',
            height: 12,

            width: 12,
          }}
          bulletsContainerStyle={{
            // marginRight: 70,
            left: '10%',
            // top: '-1%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '6%',
            marginBottom: 7,
            // borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(157, 157, 157, 0.6)',
            backgroundColor: 'rgba(157, 157, 157, 0.4)',
            width: '2%',
            height: '2%',
            marginLeft: '30%',
            borderRadius: 20,
          }}>
          {/* <> */}
          {/* <></> */}
          {banner
            ?.filter(item => (item.status == '1' ? 1 : 0))
            .map(item => {
              return (
                  <View
                  key={item.id}
                    style={[
                      layoutStyle,
                      {
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius:20
                      },
                    ]}>
                    <ImageLoad
                      source={{uri: item?.poster_link}}
                      loadingStyle={{size: 'large', color: '#a7c829'}}
                      style={{borderRadius: 150, height: 180, width: '100%'}}
                    />
                  </View>
              );
            })}
          {/* </> */}
        </Carousel>
      )}
    </>
  );
};

export default BannerImgComp;
