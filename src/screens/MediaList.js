import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import YoutubePlayer from "../components/YoutubePlayer";
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
            })
            .catch(e => {
                console.log(e);
            })
    }

    const count = youtubeList.length;
    useEffect(() => {
        getList();
        return () => {
            console.log('cleanup');
        }
    }, []);
    return (
        <View style={Component.Container}>
            <View style={Style.Body}>
                {count === 0 && <Text>게시물이 없습니다.</Text>}
                <FlatList
                    style={{
                        width: 350,
                        height: "100%",
                        backgroundColor: "#687DFB",
                    }}
                    data={youtubeList}
                    initialNumToRender={10}
                    renderItem={({item}) => <YoutubePlayer link={item.link} />}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={3}
                    disableVirtualization={false}
                    legacyImplementation={true}
                    keyExtractor={item => item.uid.toString()}
                />
            </View>
        </View>
    );
};

const Style = StyleSheet.create({
    Body: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#687DFB',
    },
})

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
    },
})