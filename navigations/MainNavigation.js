import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from '../src/screens/Main';
import MediaList from '../src/screens/MediaList';
import NoticeList from '../src/screens/NoticeList';
import NoticeDetail from '../src/screens/NoticeDetail';
import Podbbang from '../src/screens/Podbbang';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="TimeLine" headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="MediaList" component={MediaList} />
      <Stack.Screen name="NoticeList" component={NoticeList} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
      <Stack.Screen name="Podbbang" component={Podbbang} />
    </Stack.Navigator>
  </NavigationContainer>
);
