import axios from "axios";
import React from "react";
import { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { baseUri } from "../../env";

export default memo(({ navigation, route }) => {
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
            <View style={Style.TextBox}>
                <Text style={{ padding: 10, fontSize: 15 }}>{post.contents}</Text>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={true}
                onMomentumScrollEnd={
                    () => { console.log('Scrolling is End') }
                }
            >

                <View>
                    {!post.media && <Text>이미지가 없습니다.</Text>}
                    {post.media.map(m => {
                        return <Image key={m} style={Style.ImageBox} source={{ uri: `${baseUri.outter_net}/api/v1/media/${m}` }} />
                    })}
                </View>
            </ScrollView>
        </View>
    );
});

const Style = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f1f1f1',
    },
    TextBox: {
        width: 340,
        height: '35%',
        marginTop: 30,
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    ImageBox: {
        width: 300,
        height: 300,
    }
});
