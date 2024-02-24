import {View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, Pressable} from 'react-native';
import {store, persistor} from '../../../src/store/persistStore';
import getThemePallete from '../../components/UI/Theme/ThemePicker';

type iProp = {
  position: {x: number; y: number};
  onDisplay: any;
  contextProp: any;
  colour: string;
  textColor: string;
};

const ContextMenu = ({position, onDisplay, contextProp, colour, textColor}: iProp) => {
  // Render the context menu component based on the position prop
  // and implement the desired functionality
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const menuWidth = 150; // Adjust the width of the context menu as needed
  const menuHeight = 200; // Adjust the height of the context menu as needed

  // Calculate the maximum x and y coordinates for the context menu
  const maxX = screenWidth - menuWidth;
  const maxY = screenHeight - menuHeight;

  // Adjust the position of the context menu if it exceeds the maximum coordinates
  var adjustedX = Math.min(position.x, maxX);
  var adjustedY = Math.min(position.y - 30, maxY - 80);

  const onPress = () => {
    onDisplay(false);
  };

  const onPressedHandler = (item: string) => {
    switch (item) {
      case 'Gray theme':
        store.dispatch({
          type: 'UPDATE_THEME',
          newTheme: getThemePallete('grayTheme'), // Use your desired theme
        });
        break;
      case 'Light blue':
        store.dispatch({
          type: 'UPDATE_THEME',
          newTheme: getThemePallete('lightTheme'), // Use your desired theme
        });
        break;
      case 'Chocolate':
        store.dispatch({
          type: 'UPDATE_THEME',
          newTheme: getThemePallete('chocolateTheme'), // Use your desired theme
        });
        break;
      case 'Black theme':
        store.dispatch({
          type: 'UPDATE_THEME',
          newTheme: getThemePallete('blackTheme'),
        });
        break;
    }
    onDisplay(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, {height: screenHeight, width: screenWidth}]}></View>
      </TouchableWithoutFeedback>
      <View
        style={[
          {
            top: adjustedY,
            left: adjustedX,
            height: menuHeight,
            width: menuWidth,
          },
          styles.contextMenu,
          {backgroundColor: colour},
        ]}>
        {contextProp.map((item: string, index: number) => (
          <View key={index} style={{flex: 1}}>
            {index > 0 ? <View style={styles.separator}></View> : null}
            <Pressable
              style={({pressed}) => (pressed ? [styles.pressed, styles.button] : styles.button)}
              android_ripple={{color: 'grey'}}
              onPress={() => onPressedHandler(item)}>
              <View key={index} style={[styles.slide, {width: 118}]}>
                <Text style={[styles.itemText, {color: textColor}]}>{item}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 16,
  },
  slide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
  },
  container: {
    position: 'absolute',
  },
  contextMenu: {
    flex: 1,
    position: 'absolute',
    borderRadius: 3.5,
    padding: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  textItem: {
    fontSize: 16,
  },
  separator: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ContextMenu;
