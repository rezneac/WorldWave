interface iProps {
  imageUri: string;
  stationName: string | null;
}

const initialState: iProps = {
  imageUri: "",
  stationName: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_STATION_INFO':
      return {
        imageUri: action.stationUri,
        stationName: action.stationName,
      };
    default:
      return state;
  }
};

export default reducer;
