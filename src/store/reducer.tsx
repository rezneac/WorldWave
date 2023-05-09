interface iProps {
  imageUri: string;
  stationName: string | null;
  isPlaying: boolean;
}

const initialState: iProps = {
  imageUri: '',
  stationName: null,
  isPlaying: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_STATION_INFO':
      return {
        ...state,
        imageUri: action.stationUri,
        stationName: action.stationName,
      };

    case 'UPDATE_ON_PLAY':
      return {
        ...state,
        isPlaying: action.updatePlayState,
      };

    default:
      return state;
  }
};

export default reducer;
