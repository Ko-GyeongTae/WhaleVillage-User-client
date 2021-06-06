import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import { baseUri } from "../../env";

export default ({ route }) => {
    console.log(route.params);
    const [post, setPost] = useState("");
    const [isLoading, setIsLoading] = useState(true);
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

    const OpneLink = (m) => {
        console.log(m);
        Linking.canOpenURL(m)
        .then(supported => {
          if (supported) {
            Linking.openURL(m);
          } else {
            console.log("Don't know how to open URI: " + m);
          }
        }
        )};

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
                        let format = m.split('photo.')[1]
                        if(format === 'png' || format === 'jpg' || format === 'bmp' || format === 'gif'){
                            return <Image key={m} style={Style.ImageBox} source={{ uri: m }} />
                        } else {
                            return (
                                <View style={Style.Download}>
                                    <TouchableOpacity key={m} onPress={() => OpneLink(m)}>
                                        <Text style={{fontSize: 20}}>동영상 받으러 가기</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })}
                </View>
            </ScrollView>
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
    TextBox: {
        width: 340,
        height: '35%',
        marginTop: 30,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    ImageBox: {
        width: 340,
        height: 255,
        marginBottom: 20,
        borderRadius: 10,
    },
    Download: {
        width: 340,
        height: 60,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
