import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SettingsSVG} from '../../../icons/sliders-solid';
import {HeartSVG} from '../../../icons/heart-solid';
import {RadioSVG} from '../../../icons/radio-solid';
import {store, persistor} from '../../../store/persistStore';
import {useTheme} from '@react-navigation/native';
import React from 'react';

const CustomBottomBar = ({state, descriptors, navigation, onFocus, baseColor}: any) => {
  const [currentTheme, setCurrentTheme] = React.useState(store.getState().appTheme);

  //Updates to change the color for  the TopBar
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Update the theme in the state when the store changes
      setCurrentTheme(store.getState().appTheme);
    });

    // Cleanup subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const getIcon = (label: string, fill: string) => {
    switch (label) {
      case 'MainScreen':
        return <RadioSVG height={30} width={30} fill={fill} />;
      case 'FavouriteScreen':
        return <HeartSVG height={30} width={30} fill={fill} />;
      case 'SettingsScreen':
        return <SettingsSVG height={30} width={30} fill={fill} />;
      default:
        return null;
    }
  };

  const screenNames: {[key: string]: string} = {
    MainScreen: 'Stations',
    FavouriteScreen: 'Favourites',
    SettingsScreen: 'Settings',
  };

  return (
    <View style={[styles.tabContainer, {backgroundColor: useTheme().colors.topBar}]}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPressHandler = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <View style={styles.tabItem} key={index}>
            <Pressable onPress={onPressHandler} style={[{alignItems: 'center'}]}>
              {getIcon(label, isFocused ? currentTheme.colors.highlight : currentTheme.colors.tertiary)}
              <Text style={[styles.textLabel, isFocused ? {color: '#fff'} : {color: currentTheme.colors.tertiary}]}>
                {screenNames[label]}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
  },
  tabItem: {
    flex: 1,
    alignSelf: 'center',
  },
  outline: {
    backgroundColor: 'black',
    height: 2,
    width: '50%',
    marginBottom: 9,
    alignSelf: 'center',
  },
  textLabel: {
    fontSize: 16,
  },
});

export default CustomBottomBar;
