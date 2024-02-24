import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContextMenu from '../components/UI/ContextMenuPopUp';
import {useState} from 'react';
import {version} from '../../package.json';
import {useTheme} from '@react-navigation/native';

const SettingsScreen = (props: any) => {
  const theme = useTheme().colors;
  const [positionPressed, setPositionPressed] = useState({x: 0, y: 0});
  const [display, setDisplay] = useState(false);

  const onDisplayHandler = (value: boolean) => {
    setDisplay(value);
  };

  const handleLongPress = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;

    setPositionPressed({x: pageX, y: pageY});

    setDisplay(true);
  };

  return (
    <View style={styles.containerSettings}>
      <View style={[styles.versionContent, {backgroundColor: theme.primary}]}>
        <Text style={[styles.titleSettingContent, {color: theme.text}]}>Version</Text>
        <Text style={[styles.infoSettingContent, {color: theme.subtext}]}>{version}</Text>
      </View>

      <Pressable onPress={handleLongPress}>
        <View style={[styles.versionContent, {backgroundColor: theme.primary}]}>
          <View style={styles.selectLanguage}>
            <Text style={[styles.titleSettingContent, {color: theme.text}]}>Select app theme</Text>
          </View>
        </View>
      </Pressable>

      {display && (
        <ContextMenu
          position={positionPressed}
          onDisplay={onDisplayHandler}
          contextProp={['Gray theme', 'Light blue', 'Chocolate', 'Black theme']}
          colour={theme.primary}
          textColor={theme.text}
        />
      )}
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    // elevation: 5,
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
