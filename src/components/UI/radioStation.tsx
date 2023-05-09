import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const RadioStation = (prop: any) => {

  return (
    <View style={styles.mainView}>
      <View style={styles.stationView}>
        {/* Displays radio station image */}
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{ uri: prop.details[prop.index].radioimg }}
          />
        </View>

        {/* Displays radio station name */}
        <View style={styles.stationNameView}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {prop.details[prop.index].stationName}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 53.13,
  },
  mainView: {
    height: 120,
    width: 100,
    backgroundColor: '#ffffff',
    borderRadius: 3.5,
  },
  stationView: {
    flexDirection: 'column',
    flex: 1,
  },
  stationNameView: {
    height: 20,
    width: 100,
    backgroundColor: '#C5C5C5',
    alignItems: 'center',
    flex: 1,
    borderBottomStartRadius: 3.5,
    borderBottomEndRadius: 3.5,
    opacity: 50,
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
