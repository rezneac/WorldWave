import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContextMenu from '../components/UI/ContextMenuPopUp';
import {useState} from 'react';
import {version} from '../../package.json';

const SettingsScreen = () => {
  const [positionPressed, setPositionPressed] = useState({x: 0, y: 0});
  const [display, setDisplay] = useState(false);

  const onDisplayHandler = (value: boolean) => {
    setDisplay(value);
  };

  const handleLongPress = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;

    setPositionPressed({x: pageX, y: pageY});

    // setDisplay(true);
  };

  return (
    <View style={styles.containerSettings}>
      <View style={styles.versionContent}>
        <Text style={styles.titleSettingContent}>Version</Text>
        <Text style={styles.infoSettingContent}>{version}</Text>
      </View>

      {/* TODO:Finish after finishing logic with select languages */}
      {/* <Pressable onPress={handleLongPress}>
        <View style={styles.versionContent}>
          <View style={styles.selectLanguage}>
            <Text style={styles.titleSettingContent}>Select your language</Text>
            <Text style={styles.titleSettingContent}>(Unavailabe for now)</Text>
          </View>
        </View>
      </Pressable> */}

      {display && <ContextMenu position={positionPressed} onDisplay={onDisplayHandler} contextProp={undefined} />}
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  pickerView: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: '#344051',
  },
  containerSettings: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 16,
  },
  versionContent: {
    justifyContent: 'center',
    height: 57,
    marginTop: 28,
    borderRadius: 20,
    backgroundColor: '#596673',
    paddingHorizontal: 20,
    elevation: 5,
  },
  titleSettingContent: {
    color: '#1D212D',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSettingContent: {
    color: 'black',
    fontWeight: '400',
    opacity: 0.6,
  },
  selectLanguage: {
    flexDirection: 'row',
    marginRight: 16,
    justifyContent: 'space-between',
  },
});
