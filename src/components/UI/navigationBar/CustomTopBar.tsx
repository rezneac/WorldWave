import {Pressable, StyleSheet, Text, View} from 'react-native';
import SettingsSVG from '../../../icons/sliders-solid.svg';
import {HeartSVG} from '../../../icons/heart-solid';
import RadioSVG from '../../../icons/radio-solid.svg';

const CustomBottomBar = ({state, descriptors, navigation}: any) => {
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
    <View style={styles.tabContainer}>
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
              {getIcon(label, isFocused ? '#ffffff' : '#000')}
              <Text style={[styles.textLabel, isFocused ? {color: '#fff'} : {color: '#000'}]}>
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
    backgroundColor: '#596673',
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
