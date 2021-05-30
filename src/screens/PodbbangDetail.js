import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PodbbangPlayer from '../components/PodbbangPlayer';

export default ({route}) => {
    const param = route.params;
    return (
        <View style={Component.Container}>
            <View style={Style.Body}>
                <PodbbangPlayer link={param.link}/>
            </View>
        </View>
    );
}

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
    }
})