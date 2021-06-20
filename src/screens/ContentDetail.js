import { Text, View, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { useEffect } from 'react';

export default ({ route }) => {
    console.log(route.params);
    const [content, setContent] = useState("");
    
    useEffect(() => {
        setContent(route.params);
    }, []);

    return (
        <View style={Style.Container}>
            <ScrollView
                showsHorizontalScrollIndicator={true}
                onMomentumScrollEnd={
                    () => { console.log('Scrolling is End') }
                }
            >
                <Text style={{ padding: 10, fontSize: 15 }}>{content.contents}</Text>
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
        backgroundColor: '#f5f5f5',
    }
});
