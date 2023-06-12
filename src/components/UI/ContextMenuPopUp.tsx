import {View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback} from 'react-native';

type iProp = {
  position: {x: number; y: number};
  onDisplay: any;
  contextProp: any;
};

const ContextMenu = ({position, onDisplay, contextProp}: iProp) => {
  // Render the context menu component based on the position prop
  // and implement the desired functionality
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  // console.log(`Width:${screenWidth},Height:${screenHeight}`);

  const menuWidth = 150; // Adjust the width of the context menu as needed
  const menuHeight = 200; // Adjust the height of the context menu as needed

  // Calculate the maximum x and y coordinates for the context menu
  const maxX = screenWidth - menuWidth;
  const maxY = screenHeight - menuHeight;

  // Adjust the position of the context menu if it exceeds the maximum coordinates
  var adjustedX = Math.min(position.x, maxX);
  var adjustedY = Math.min(position.y - 30, maxY - 80);

  console.log(contextProp);

  const onPress = () => {
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
        ]}>
        <View>
          {/* <Text>Hello</Text> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'black',
    // opacity: 0.15,
    position: 'absolute',
  },
  contextMenu: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#808080',
    borderRadius: 3.5,
    padding: 16,
  },
});

export default ContextMenu;
