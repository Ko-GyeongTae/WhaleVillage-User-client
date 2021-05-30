import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Text, View, StyleSheet, ScrollView } from "react-native";
import PTRView from "react-native-pull-to-refresh";
import { baseUri } from "../../env";
import NoticeBox from "../components/NoticeBox";

export default ({navigation}) => {
    const [noticeList, setNoticeList] = useState([]);
    useEffect(() => {
        GetList();
    }, []);
    const GetList = async() => {
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
        <View style={Style.Container}>
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
                        {noticeList.length === 0 && <Text>게시물이 없습니다.</Text>}
                        {noticeList?.map(notice => (
                            <NoticeBox
                                onPress={() => navigation.navigate("NoticeDetail", notice)}
                                key={notice.uid}
                                content={notice.content}
                                date={notice.date}
                                postUid={notice.uid}
                                title={notice.title}
                            />
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
});

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
    },
    List:{
        backgroundColor: "#f0f0f0"
    }
})