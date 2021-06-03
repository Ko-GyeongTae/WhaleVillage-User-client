import React, {memo} from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

export default ({ link }) => {
    if(link === ""){
      return <View style={Component.Video}><Text>No Video</Text></View>
    }
    return (
        <View style={Component.Video} renderToHardwareTextureAndroid={true}>
          <WebView
            javaScriptEnabled={true}
            useWebKit={true}
            domStorageEnabled={false}
            allowsInlineMediaPlayback={false}
            source={{ uri: link }}
          />
        </View>
    );
};

const Component = StyleSheet.create({
    Video: { 
      paddingTop: 10,
      width: 350, 
      height: 207,
    }
  });