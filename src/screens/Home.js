import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import YoutubePlayer from '../components/YoutubePlayer';

export default ({navigation}) => {
  const cdnlink = 'https://cdn.podbbang.com/data1/jhunsong59/sbook004.mp3';
  //const youtube = "https://www.youtube.com/embed/TcMBFSGVi1c?playsinline=1&fs=1";
  const youtube = "https://www.youtube.com/embed/qGmJxG9Z4Bo";

  const LinkToCdn = () => {
    Linking.canOpenURL(cdnlink)
    .then(supported => {
      if(supported){
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
        <YoutubePlayer link={youtube}/>
        <TouchableOpacity onPress={() => navigation.navigate('MediaList')}>
          <Text>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => LinkToCdn()}>
          <View style={Component.cdn}>
            <Text>CDN LINK</Text>
          </View>
        </TouchableOpacity>
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
