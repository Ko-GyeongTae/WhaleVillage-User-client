import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import YoutubePlayer from '../components/YoutubePlayer';
import { SliderBox } from 'react-native-image-slider-box';
import { baseUri, url } from '../../env';
import axios from 'axios';
import { useEffect } from 'react';

export default ({ navigation }) => {
  /*const cdnlink = 'https://m.podbbang.com/channels/1779381';
  const youtube = "https://www.youtube.com/embed/qGmJxG9Z4Bo";
*/
  const imageList = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ];
  let cdnlink = "";
  let youtube = "";
  const [isLoading, setIsLoading] = useState(true);
  let buffer;

  const getHeader = async() => {
    await axios.get(`${baseUri.outter_net}/api/v1/link/youtube`)
    .then(res => {
      buffer = res.data;
      youtube = res.data[0].link;
      res.data.map(media => {
        if(media.isPrimary === true){
          youtube = media.link;
        }
      })
      console.log('Youtube');
    })
    .catch(e => {
      console.log(e);
    });
    console.log(youtube);
    await axios.get(`${baseUri.outter_net}/api/v1/link/podbbang`)
    .then(res => {
      buffer = res.data;
      res.data.map(media => {
        if(media.isPrimary === true){
          cdnlink = media.link;
        }
      })
      console.log('Podbbang');
    })
    .catch(e => {
      console.log(e)
    });
    if(cdnlink === ""){
      cdnlink = buffer[0].link;
    }
    console.log(cdnlink);
    setIsLoading(false);
  }

  useEffect(() => {
    getHeader();
  });

  const LinkTo = (link) => {
    try {
      Linking.canOpenURL(link)
        .then(supported => {
          if (supported) {
            Linking.openURL(link);
          } else {
            console.log(`${link} is not correct!`);
          }
        });
    } catch (e) {
      Alert.alert('유효하지 않은 링크입니다.');
    }
  }
  if(isLoading){
    return <Text>Loading..</Text>;
  } 
  return (
    <View>
      <View style={Style.Header}>
        <Image source={require('../../assets/header.png')} />
      </View>
      <View style={Style.Body}>
        <YoutubePlayer link={youtube} />
        <TouchableOpacity onPress={() => navigation.navigate('MediaList')}>
          <Text style={FontStyle.More}>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => LinkTo(cdnlink)}>
          <View style={Component.cdn}>
            <Text style={FontStyle.CDN}>팟빵 링크</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Podbbang')}>
          <Text style={FontStyle.More}>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NoticeList')}>
          <View style={Component.notice}>
            <Text style={FontStyle.Notice}>공지사항</Text>
          </View>
        </TouchableOpacity>
        <View>
          <SliderBox
            autoplay={true}  //자동 슬라이드 넘김
            disableOnPress={true}
            circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
            images={imageList} // 이미지 주소 리스트 
            dotColor="#000000" // 아래 점 투명으로 안보이게 가림
            inactiveDotColor="#000000"
            onCurrentImagePressed={() => console.log('notice')}
            ImageComponentStyle={{ width: 350, height: 207 }} // 이미지 Style 적용
          />
        </View>
      </View>
      <View style={Style.Footer}>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => LinkTo(url.inquiry)}>
          <Text style={FontStyle.Redirect}>문의</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => LinkTo(url.introduce)}>
          <Text style={FontStyle.Redirect}>마을소개</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => LinkTo(url.product)}>
          <Text style={FontStyle.Redirect}>특산품</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FontStyle = StyleSheet.create({
  Title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  CDN: {
    fontSize: 30,
  },
  More: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  Redirect: {
    fontSize: 40,
  },
  Notice: {
    fontSize: 30,
  }
});

const Style = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    elevation: 5,
  },
  Body: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  Footer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    height: '10%',
    elevation: 5,
  }
});

const Component = StyleSheet.create({
  cdn: {
    width: 350,
    height: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  notice: {
    width: 350,
    height: 40,
    marginTop: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  Img: {
    width: 90,
    height: 50,
  }
});
/*
<Text style={FontStyle.Title}>고래산마을</Text>
        <Image style={Component.Img} source={require('../../assets/whale.png')} />
        */