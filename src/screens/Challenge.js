import React from 'react';
import WebView from 'react-native-webview';

export default () => {
    return (
        <WebView
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            useWebKit={true}
            domStorageEnabled={false}
            allowsInlineMediaPlayback={false}
            source={{ uri: 'http://goraesan.com/www/content/1511924222277409' }}
        />)
    ;
}