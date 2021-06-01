import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Component = StyleSheet.create({
    Component: {
        flex: 1,
        width: 350,
        height: 80,
        marginTop: '3%',
        marginBottom: '3%',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
    },
    Header: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    Bottom:{
        alignItems: 'flex-end',
        paddingBottom: 5,
        paddingRight: 5,
    }
});

const FontStyle = StyleSheet.create({
    Title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default (props) => {
  return (
    <TouchableOpacity style={Component.Component} onPress={() => props.onPress()}>
      <View style={Component.Header}>
        <Text style={FontStyle.Title}>{props.isPrimary ? `✅ ${props.title}` : props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
