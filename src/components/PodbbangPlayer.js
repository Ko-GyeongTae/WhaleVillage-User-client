import React from 'react';
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview';

export default ({ link }) => {
    console.log("INSIDE PLAYER : " + link);
    return (
        <View style={Component.Video}>
          <WebView
            javaScriptEnabled={true}
            useWebKit={true}
            domStorageEnabled={false}
            allowsInlineMediaPlayback={false}
            source={{ uri: link }}
          />
        </View>
    );
}

const Component = StyleSheet.create({
    Video: { 
      width: '100%', 
      height: '100%',
    }
  });