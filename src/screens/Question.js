import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default () => {

    return(
        <View style={Style.Container}>
            <View style={Style.TextBox}>
                <Text style={FontStyle.Title}>고래산마을</Text>
                <Text style={FontStyle.Address}>경상북도 영덕군 축산면 영축로 963</Text>
                <Text style={FontStyle.Tel}>054-733-5558</Text>
                <WebView
                    style={Style.WebView}
                    javaScriptEnabled={true}
                    useWebKit={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    source={{ uri: 'https://m.map.naver.com/search2/search.naver?query=%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EC%98%81%EB%8D%95%EA%B5%B0%20%EC%B6%95%EC%82%B0%EB%A9%B4%20%EC%98%81%EC%B6%95%EB%A1%9C%20963&siteLocation=&queryRank=&type=#/map' }}
                />
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    TextBox: {
        width: 340,
        height: 600,
        marginTop: 30,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    WebView: {
        marginTop: 20,
        width: '100%',
        height: '100%',
    }
})

const FontStyle = StyleSheet.create({
    Title:{
        fontSize: 40,
        paddingTop: 20,
        paddingLeft: 20,
        fontWeight: '300',
    },
    Address:{
        fontSize: 15,
        paddingTop: 25,
        paddingLeft: 20,
    },
    Tel:{
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 20,
    }
})