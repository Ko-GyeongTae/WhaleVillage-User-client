import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import YoutubePlayer from '../components/YoutubePlayer';
import { SliderBox } from 'react-native-image-slider-box';
import { baseUri, url } from '../../env';
import axios from 'axios';
import { useEffect } from 'react';

export default ({ navigation }) => {
  const [imageList, setImageList] = useState([]);
  const [cdn, setCdn] = useState();
  const [youtube, setYoutube] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  
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
      setImageList([]);
      res.data.map(r => {
        if(r.media[0] === "") {
          console.log('check', r);
          return;
        }else{
          console.log(r);
          setImageList(oldList => [...oldList, `${baseUri.outter_net}/api/v1/media/${r.media[0]}`]);
          console.log(imageList);
        }
      })
    })
    .catch(e => {
      console.log(e);
      Alert.alert("이미지를 불러오는데 실패했습니다.")
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getHeader();
    setImageList([]);
    console.log('Rerender');
    return () => {
      setIsMounted(false);
      console.log('unmount');
    }
  }, [isLoading, isMounted]);

  
  if(isLoading){
    return <Text>Loading..</Text>;
  } 
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={Style.Header} onPress={() => getHeader()}>
        <Image style={Components.headimg} source={require('../../assets/whalevillage/main/header.png')} />
      </TouchableOpacity>
      <View style={Style.Body}>
        <YoutubePlayer link={youtube} />
        <TouchableOpacity onPress={() => navigation.navigate('MediaList')}>
          <Image style={Components.More} source={require('../../assets/whalevillage/main/more.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PodbbangDetail', cdn)}>
          <Image style={Components.podbbang} source={require('../../assets/whalevillage/main/podbbang.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Podbbang')}>
          <Image style={Components.More} source={require('../../assets/whalevillage/main/more.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NoticeList')}>
          <Image style={Components.Notice} source={require('../../assets/whalevillage/main/noticeButton.png')}/>
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
          <Image style={Components.BottomButton}source={require('../../assets/whalevillage/main/question.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate("Introduce")}>
          <Image style={Components.BottomButton}source={require('../../assets/whalevillage/main/introduce.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }} onPress={() => navigation.navigate("Challenge")}>
          <Image style={Components.BottomButton}source={require('../../assets/whalevillage/main/challenge.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    backgroundColor: '#687DFB',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
    elevation: 5,
  },
  Body: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '82%',
    alignItems: 'center',
  },
  Footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '80%',
    height: '8%',
  }
});

const Components = StyleSheet.create({
  Img: {
    width: 90,
    height: 50,
  },
  headimg: {
    width: 270,
    height: 55,
    marginBottom: 5,
    position: 'absolute',
  },
  More: {
    marginTop: 5,
    marginBottom: 5,
    width: 120,
    height: 28,
  },
  podbbang: {
    width: 350,
    height: 130,
  },
  Notice: {
    width: 350,
    height: 34,
  },
  BottomButton: {
    width: 120,
    height: 45,
  }
});