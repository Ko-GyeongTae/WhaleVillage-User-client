import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { baseUri } from "../../env";

export default ({ route }) => {
    const [post, setPost] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const date = new Date(post.date);
    const getDetail = async () => {
        await axios.get(`${baseUri.outter_net}/api/v1/post/${route.params.uid}`)
            .then(res => {
                setPost(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
        setIsLoading(false);
    }
   
    useEffect(() => {
        getDetail();
    }, []);
    if (isLoading) {
        return <Text>Loading...</Text>
    }
    return (
        <View style={Style.Container}>
            <View style={Style.Header}>
                <Text style={FontStyle.Title}>{post.title}</Text>
                <Text>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate() - 1 < 10 ? "0" + date.getDate() - 1 : date.getDate()}일`}</Text>
            </View>
            <View style={Style.TextBox}>
                <Text style={{ padding: 10 }}>{post.contents}</Text>
                <View>
                    {!post.media && <Text>이미지가 없습니다.</Text>}
                    {post.media.map(m => {
                        console.log(`${baseUri.outter_net}/api/v1/media/${m}`),
                        <Image style={{width: 100, height: 100, backgroundColor: 'red'}} source={{ uri: `${baseUri.outter_net}/api/v1/media/${m}`}} />
                    })}
                </View>
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f1f1f1',
    },
    Header: {
        backgroundColor: '#ffffff',
        height: '10%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    TextBox: {
        width: 340,
        height: '80%',
        marginTop: 30,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: '#ffffff',
    },
    ImageBox: {
        width: 100,
        height: 100,
    }
});

const FontStyle = StyleSheet.create({
    Title: {
        fontSize: 20
    }
});