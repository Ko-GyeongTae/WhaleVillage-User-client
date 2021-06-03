import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import YoutubePlayer from '../components/YoutubePlayer';
import { SliderBox } from 'react-native-image-slider-box';
import { baseUri, url } from '../../env';
import axios from 'axios';
import { useEffect } from 'react';
import { memo } from 'react';

export default ({ navigation }) => {
  const [imageList, setImageList] = useState([]);
  const [cdn, setCdn] = useState();
  const [youtube, setYoutube] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const getHeader = async() => {
    await axios.get(`${baseUri.outter_net}/api/v1/link/youtube`)
    .then(res => {
      setYoutube(res.data[0].link);
      res.data.map(media => {
        if(media.isPrimary === true){
          setYoutube(media.link);
        }
      })
    })
    .catch(e => {
      Alert.alert("유튜브링크를 불러오는데 실패했습니다.")
    });
    await axios.get(`${baseUri.outter_net}/api/v1/link/podbbang`)
    .then(res => {
      setCdn(res.data[0]);
    })
    .catch(e => {
      Alert.alert("팟빵링크를 불러오는데 실패했습니다.")
    });
    await axios.get(`${baseUri.outter_net}/api/v1/thumbnail/new`)
    .then(res => {
      res.data.map(r => {
        setImageList([...imageList, `${baseUri.outter_net}/api/v1/media/${r.media}`]);
        console.log(imageList);
        setIsLoading(false);
      })
    })
    .catch(e => {
      console.log(e);
      Alert.alert("이미지를 불러오는데 실패했습니다.")
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getHeader();
    return () => {
      console.log('clean');
      setCdn("");
      setYoutube([]);
    }
  }, []);

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
        <Image style={Component.headimg} source={require('../../assets/whalevillage/main/header.png')} />
      </View>
      <View style={Style.Body}>
        <YoutubePlayer link={youtube} />
        <TouchableOpacity onPress={() => navigation.navigate('MediaList')}>
          <Text style={FontStyle.More}>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PodbbangDetail', cdn)}>
          <View style={Component.cdn}>
            <Text style={FontStyle.CDN}>팟빵 링크</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Podbbang')}>
          <Text style={FontStyle.More}>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
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
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate("Question")}>
          <Text style={FontStyle.Redirect}>문의사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => LinkTo(url.introduce)}>
          <Text style={FontStyle.Redirect}>마을소개</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => LinkTo(url.challenge)}>
          <Text style={FontStyle.Redirect}>마을체험</Text>
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
    fontSize: 30,
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
    backgroundColor: '#687DFB',
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
  },
  headimg: {
    width: 270,
    height: 55,
  }
});