import React from 'react';
import { Text, View } from 'react-native';
import PodbbangPlayer from '../components/PodbbangPlayer';

export default ({route}) => {
    const param = route.params;
    return (
        <View>
            <View>
                <Text>팟빵</Text>
            </View>
            <PodbbangPlayer link={param.link}/>
        </View>
    );
}