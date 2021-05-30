import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PodbbangPlayer from '../components/PodbbangPlayer';

export default ({route}) => {
    const param = route.params;
    return (
        <View style={Component.Container}>
            <View style={Style.Header}>
                <Text style={Component.Title}>팟빵</Text>
            </View>
            <View style={Style.Body}>
                <PodbbangPlayer link={param.link}/>
            </View>
        </View>
    );
}

const Style = StyleSheet.create({
    Header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        alignItems: 'flex-end',
        justifyContent: 'center',
        elevation: 5,
    },
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
    Title: {
        fontSize: 40
    }
})