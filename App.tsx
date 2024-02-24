import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screen/MainScreen';
import CustomBottomBar from './src/components/UI/navigationBar/CustomTopBar';
import FavouriteScreen from './src/screen/FavouriteScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StatusBar} from 'react-native';
import PlayerManagerMenu from './src/components/UI/bottomMenu/BottomMenu';
import {store, persistor} from './src/store/persistStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

const TabStack = () => {
  const iconColour = {
    onFocus: '#fcfcfc',
    baseColor: '#898F9C',
  };

  return (
    <Tab.Navigator initialRouteName="MainScreen" tabBar={props => <CustomBottomBar {...props} {...iconColour} />}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="FavouriteScreen" component={FavouriteScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [currentTheme, setCurrentTheme] = React.useState(store.getState().appTheme);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Update the theme in the state when the store changes
      setCurrentTheme(store.getState().appTheme);
    });

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const MyTheme: any = {
    ...currentTheme,
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar animated={true} barStyle={'dark-content'} backgroundColor={MyTheme.colors.topBar} />
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="TabStack" component={TabStack} />
            </Stack.Navigator>
          </NavigationContainer>
          {/* Initiate bottom player menu manager */}
          <PlayerManagerMenu colour={MyTheme.colors.topBar} />
        </PersistGate>
      </Provider>
    </>
  );
}
