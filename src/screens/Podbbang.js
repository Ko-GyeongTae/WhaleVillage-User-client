import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { memo } from "react";
import { baseUri } from "../../env";
import PodbbangBox from "../components/PodbbangBox";

export default memo(({ navigation }) => {
    const [podbbangList, setPodbbangList] = useState([]);
    const getList = async () => {
        await axios.get(`${baseUri.outter_net}/api/v1/link/podbbang`)
            .then(res => {
                setPodbbangList(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    const count = podbbangList.length;
    useEffect(() => {
        getList()
    }, []);

    return (
        <View style={Component.Container}>
            <View style={Style.Body}>
                {count === 0 && <Text>게시물이 없습니다.</Text>}
                <FlatList
                    style={{
                        width: 350,
                        height: "100%",
                    }}
                    data={podbbangList}
                    initialNumToRender={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("PodbbangDetail", item)}>
                            <PodbbangBox
                                key={item.uid}
                                title={item.title}
                                isPrimary={item.isPrimary}
                            />
                        </TouchableOpacity>
                    )}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={3}
                    disableVirtualization={false}
                    legacyImplementation={true}
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
})

const Component = StyleSheet.create({
    Container: {
        flex: 1,
        height: '100%',
        backgroundColor: "#687DFB",
        alignItems: 'center',
    },
})