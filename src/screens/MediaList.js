import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import YoutubePlayer from "../components/YoutubePlayer";
import PTRView from "react-native-pull-to-refresh";

export default () => {
    const youtubelist = [
        "https://www.youtube.com/embed/qGmJxG9Z4Bo",
        "https://www.youtube.com/embed/W4gWRK-_It8",
    ];
    const count = youtubelist.length;

    return (
        <View style={Component.Container}>
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
                        {youtubelist?.map(media => (
                            <YoutubePlayer key={media} link={media} />
                        ))}
                    </ScrollView>
                </PTRView>
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
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
    }
})