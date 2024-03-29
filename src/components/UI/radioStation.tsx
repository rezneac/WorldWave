import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

const RadioStation = (prop: any) => {
  return (
    <>
      <View style={styles.mainView}>
        <View style={styles.stationView}>
          {/* Displays radio station image */}
          <View style={styles.imageView}>
            <Image style={styles.image} source={{uri: prop.details[prop.index].radioimg}} />
          </View>

          {/* Displays radio station name */}
        </View>
      </View>
      <View style={[styles.stationNameView, {backgroundColor: useTheme().colors.primary}]}>
        <Text style={{color: useTheme().colors.text}} numberOfLines={2} ellipsizeMode="tail">
          {prop.details[prop.index].stationName}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 53.13,
  },
  mainView: {
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 3.5,
    borderTopRightRadius: 3.5,
    overflow: 'hidden',
  },
  stationView: {
    flexDirection: 'column',
    flex: 1,
  },
  stationNameView: {
    minHeight: 20,
    width: 100,
    backgroundColor: 'grey',
    alignItems: 'center',
    borderBottomStartRadius: 3.5,
    borderBottomEndRadius: 3.5,
    opacity: 50,
    overflow: 'hidden',
  },
  imageView: {
    height: 53,
    width: 100,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadioStation;
