import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import YoutubePlayer from '../components/YoutubePlayer';
import { SliderBox } from 'react-native-image-slider-box';

export default ({ navigation }) => {
  const cdnlink = 'https://cdn.podbbang.com/data1/jhunsong59/sbook004.mp3';
  //const youtube = "https://www.youtube.com/embed/TcMBFSGVi1c?playsinline=1&fs=1";
  const youtube = "https://www.youtube.com/embed/qGmJxG9Z4Bo";

  const imagelist = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ];
  const LinkToCdn = () => {
    Linking.canOpenURL(cdnlink)
      .then(supported => {
        if (supported) {
          Linking.openURL(cdnlink);
        } else {
          console.log(`${cdnlink} is not correct!`);
        }
      })
  }

  return (
    <View>
      <View style={Style.Header}>
        <Text style={FontStyle.Title}>고래산마을</Text>
        <Image style={Component.Img} source={require('../../assets/whale.png')} />
      </View>
      <View style={Style.Body}>
        <YoutubePlayer link={youtube} />
        <TouchableOpacity onPress={() => navigation.navigate('MediaList')}>
          <Text>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => LinkToCdn()}>
          <View style={Component.cdn}>
            <Text>CDN LINK</Text>
          </View>
        </TouchableOpacity>
        <SliderBox
          autoplay={true}  //자동 슬라이드 넘김
          circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
          resizeMode="cover"  // 이미지 사이즈 조절값
          images={imagelist} // 이미지 주소 리스트 
          dotColor="rgba(0,0,0,0)" // 아래 점 투명으로 안보이게 가림
          inactiveDotColor="rgba(0,0,0,0)"
          ImageComponentStyle={{ width: 200, height: 200 }} // 이미지 Style 적용
          currentImageEmitter={(currentIndex) => { // 이미지가 바뀔때 어떤 동작을 할지 설정 
            console.log(currentIndex + 1);

            console.log(imagelist[currentIndex]);
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: '8%',
            right: 0,
            paddingTop: 4,
            paddingRight: 6,
            paddingBottom: 4,
            paddingLeft: 10,
            borderTopLeftRadius: 14,
            borderBottomLeftRadius: 14,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <Text style={{ fontSize: 10, color: '#ffffff' }}>
            Hello
        </Text>
        </View>

      </View>
      <View style={Style.Footer}>
      </View>
    </View>
  );
};

const FontStyle = StyleSheet.create({
  Title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

const Style = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    backgroundColor: 'orange',
    width: '100%',
    height: 700,
    alignItems: 'center',
  },
  Footer: {
    backgroundColor: 'yellow',
    width: '100%',
    height: 100,
  }
});

const Component = StyleSheet.create({
  cdn: {
    width: 120,
    height: 40,
    backgroundColor: 'pink',
  },
  Img: {
    width: 90,
    height: 50,
  },
  Video: {
    paddingTop: 40,
    width: 400,
    height: 290
  }
});
