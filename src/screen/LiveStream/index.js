import React, {useState} from 'react';

import {View, Text} from 'react-native';
import {BgImage, BgDark} from '../../component/ImageContainer';
import YouTube from 'react-native-youtube';

const LiveStreamScreen = ({navigation}) => {
  console.log('props', navigation);

  const [changeData, setChangeData] = useState();
  return (
    <BgDark>
      <YouTube
        apiKey="AIzaSyDZHW_lJVN-3Z9Z7j0nwDm0jK3fCR0WK6c"
        videoId="9em32dDnTck"
        play={true} // control playback of video with true/false
        origin="http://www.youtube.com"
        controls={1}
        // control whether the video should play in fullscreen or inline
        // loop={true} // control whether the video should loop when ended
        onReady={e => console.log('ready', e)}
        onChangeState={e => setChangeData(e.state)}
        onChangeQuality={e => console.log('qualy', e)}
        onError={e => console.log('error', e)}
        style={{
          height: 250,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          // placeItem: 'center',
          // alignItems: 'center',
          top: 180,
        }}
      />
    </BgDark>
  );
};

export default LiveStreamScreen;
