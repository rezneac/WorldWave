import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SearchSVG} from '../../../icons/search-solid';
import {useTheme} from '@react-navigation/native';
import {useRef, useState} from 'react';

interface iProps {
  onPress: (text: string) => void;
}

const SearchBar = ({onPress}: iProps) => {
  const theme = useTheme().colors;
  const textInputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState<string>('');

  const handleSearch = (text: string) => {
    setQuery(text);
    onPress(text);
  };

  const handleInputPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <Pressable style={[styles.searchBar, {backgroundColor: theme.primary}]} onPress={handleInputPress}>
      <View style={styles.content}>
        <TextInput
          ref={textInputRef}
          style={[styles.textInput, {color: theme.text}]}
          placeholder="Search stations"
          placeholderTextColor={theme.text}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          cursorColor={theme.text}
          value={query}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.searchIcon}>
        <SearchSVG height={30} width={30} fill={theme.text} />
      </View>
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 15,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 26,
    flexDirection: 'row',
    paddingLeft: 26,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  content: {
    flex: 1,
  },
  searchIcon: {
    flexDirection: 'row-reverse',
    marginLeft: 16,
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 20,
  },
});
