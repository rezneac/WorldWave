import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screen/MainScreen';
import TrackPlayer from 'react-native-track-player';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#293241',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'World Wave',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#364153',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
