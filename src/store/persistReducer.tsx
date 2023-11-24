// Define the types for the state and actions
interface Station {
  imageUri: string;
  stationName: string;
}

interface AppState {
  stations: Station[];
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
  updatePlayState: boolean;
}

// Union type for all possible actions
type AppAction = AddStationAction | ExcludeStationAction;

// Set the initial state
const initialState: AppState = {
  stations: [],
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
      return {
        ...state,
        stations: state.stations.map((station, index) => {
          if (index === action.stationIndex) {
            return {
              ...station,
              isPlaying: action.updatePlayState,
            };
          }
          return station;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
