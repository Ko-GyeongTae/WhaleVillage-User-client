import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import { memo } from "react/cjs/react.production.min";
import { baseUri } from "../../env";
import NoticeBox from "../components/NoticeBox";

export default memo(({ navigation }) => {
    const [noticeList, setNoticeList] = useState([]);
    useEffect(() => {
        GetList();
    }, []);
    const GetList = async () => {
        await axios.get(`${baseUri.outter_net}/api/v1/post`)
            .then(res => {
                console.log(res.data);
                setNoticeList(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (
        <View style={Component.Container}>
            <View style={Style.Body}>

                {noticeList.length === 0 && <Text>게시물이 없습니다.</Text>}
                <FlatList
                    Style={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                    }}
                    data={noticeList}
                    initialNumToRender={10}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate("NoticeDetail", item)}>
                            <NoticeBox
                                content={item.content}
                                date={item.date}
                                title={item.title}
                            />
                        </TouchableOpacity>
                    }
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={3}
                    legacyImplementation={true}
                    disableVirtualization={false}
                    keyExtractor={item => item.uid.toString()}
                />
            </View>
        </View>
    );
});

const Style = StyleSheet.create({
    Body: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
    },
});

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#687DFB',
    },
    List: {
        backgroundColor: "#687DFB"
    }
})