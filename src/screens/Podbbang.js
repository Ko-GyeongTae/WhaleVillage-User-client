import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import NoticeBox from "../components/NoticeBox";
import PodbbangBox from "../components/PodbbangBox";
import PodbbangPlayer from "../components/PodbbangPlayer";

export default ({navigation}) => {
    const podbbanglist = [
        {
            "uid": 1,
            "title": "전쟁사, 동양전쟁사146",
            "link": "https://m.podbbang.com/channels/10887/episodes/24053562",
            "isPrimary": false,
        },
        {
            "uid": 2,
            "title": "테스트 테스트",
            "link": "https://m.podbbang.com/channels/1779381",
            "isPrimary": true,
        }
    ];
    const count = podbbanglist.length;

    return (
        <View style={Component.Container}>
            <View style={Style.Header}>
                <Text style={Component.Title}>영상목록</Text>
            </View>
            <View style={Style.Body}>
                <PTRView
                    style={Component.List}
                    onRefresh={() => {
                        console.log('refresh!');
                    }}
                    pullHeight={400}
                >

                    <ScrollView
                        contentContainerStyle={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        {count === 0 && <Text>게시물이 없습니다.</Text>}
                        {podbbanglist?.map(m => (
                            <PodbbangBox 
                                onPress={() => navigation.navigate('PodbbangDetail', m)}
                                key={m.uid}
                                title={m.title}
                            />
                        ))}
                    </ScrollView>
                </PTRView>
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    Header: {
        width: '100%',
        height: '10%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        elevation: 5,
    },
    Body: {
        width: '100%',
        height: '90%',
    },
})

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
    },
    List:{
        backgroundColor: "#f0f0f0"
    },
    Title: {
        fontSize: 40
    }
})