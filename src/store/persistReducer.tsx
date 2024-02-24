import { ExtendedTheme } from '@react-navigation/native';
import getThemePallete from '../components/UI/Theme/ThemePicker';

// Define the types for the state and actions
interface Station {
  imageUri: string;
  stationName: string;
}

interface AppState {
  stations: Station[];
  appTheme: ExtendedTheme;
}

// Define action types
interface AddStationAction {
  type: 'ADD_NEW_STATION';
  stationUri: string;
  stationName: string;
}

interface ExcludeStationAction {
  type: 'EXCLUDE_STATION';
  stationIndex: number;
}

interface UpdateThemeAction {
  type: 'UPDATE_THEME';
  newTheme: ExtendedTheme;
}

// Union type for all possible actions
type AppAction = AddStationAction | ExcludeStationAction | UpdateThemeAction;

//Get default light theme
const lightTheme = getThemePallete('lightTheme');

// Set the initial state
const initialState: AppState = {
  stations: [],
  appTheme: lightTheme,
};

// Define the reducer with types
const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_NEW_STATION':
      const newStation: Station = {
        imageUri: action.stationUri,
        stationName: action.stationName,
      };
      return {
        ...state,
        stations: [...state.stations, newStation],
      };

    case 'EXCLUDE_STATION':
      const updatedListStations = [...state.stations];
      if (action.stationIndex >= 0 && action.stationIndex < updatedListStations.length) {
        updatedListStations.splice(action.stationIndex, 1);
      }

      return {
        ...state,
        stations: updatedListStations,
      };
    case 'UPDATE_THEME':
      return {
        ...state,
        appTheme: action.newTheme,
      };
    default:
      return state;
  }
};

export default reducer;
