import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screen/MainScreen';
import CustomBottomBar from './src/components/UI/navigationBar/CustomTopBar';
import FavouriteScreen from './src/screen/FavouriteScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StatusBar} from 'react-native';
import PlayerManagerMenu from './src/components/UI/BottomMenu';
import {store, persistor} from './src/store/persistStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';


const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#293241',
  },
};

const Tab = createMaterialTopTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator initialRouteName="MainScreen" tabBar={props => <CustomBottomBar {...props} />}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={
          {
            // title: 'World Wave',
            // headerTintColor: 'white',
            // headerStyle: {
            //   backgroundColor: '#364153',
            // },
          }
        }
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={
          {
            // title: 'Favourite station on World Wave',
            // headerTintColor: 'white',
            // headerStyle: {
            //   backgroundColor: '#364153',
            // },
          }
        }
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={
          {
            // title: 'World Wave',
            // headerTintColor: 'white',
            // headerStyle: {
            //   backgroundColor: '#364153',
            // },
          }
        }
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
    
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar animated={true} barStyle={'dark-content'} backgroundColor="#596673" />
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="TabStack" component={TabStack} />
            </Stack.Navigator>
          </NavigationContainer>
          {/* Initiate bottom player menu manager */}
          <PlayerManagerMenu />
        </PersistGate>
      </Provider>
    </>
  );
}
