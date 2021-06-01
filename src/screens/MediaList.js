import React from "react";
import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import YoutubePlayer from "../components/YoutubePlayer";
import PTRView from "react-native-pull-to-refresh";
import { useState } from "react";
import axios from "axios";
import { baseUri } from "../../env";
import { useEffect } from "react";

export default () => {
    const [youtubeList, setYoutubeList] = useState([]);
    const getList = async () => {
        await axios.get(`${baseUri.outter_net}/api/v1/link/youtube`)
            .then(res => {
                setYoutubeList(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    const count = youtubeList.length;
    useEffect(() => {
        getList();
    }, []);
    return (
        <View style={Component.Container}>
            <View style={Style.Body}>

                {count === 0 && <Text>게시물이 없습니다.</Text>}
                <FlatList
                    style={{
                        width: 350,
                        height: "100%",
                        backgroundColor: "#f0f0f0",
                    }}
                    data={youtubeList}
                    initialNumToRender={3}
                    renderItem={({item}) => <YoutubePlayer link={item.link} />}
                    removeClippedSubviews={true}
                    disableVirtualization={false}
                />
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    Body: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
    },
})

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
    },
    List: {
        backgroundColor: "#f0f0f0"
    }
})