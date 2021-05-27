import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default() => {
  const [appIsReady, setAppIsReady] = useState(false);
  const cdnlink = 'https://cdn.podbbang.com/data1/jhunsong59/sbook004.mp3';

  const [align, setAlign] = useState('center');
  const [alignsecond, setAlignsecond] = useState(false);

  setTimeout(() => {
    setAlign('flex-start'), setAlignsecond(true);
  }, 3000);
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
      </View>
      <View style={Style.Body}>

        <View style={{ paddingTop: 50, width: 400, height: 290 }}>
          <WebView
            javaScriptEnabled={true}
            useWebKit={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            source={{ uri: "https://www.youtube.com/embed/TcMBFSGVi1c?playsinline=1&fs=1" }}
          />
        </View>
        <TouchableOpacity onPress={() => LinkToCdn()}>
          <View style={Component.cdn}>
            <Text>CDN LINK</Text>I 
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
    paddingTop: 20,
  },
});

const Style = StyleSheet.create({
  Header: {
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
  }
})
