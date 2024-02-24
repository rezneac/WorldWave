import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

export const SearchSVG = (props: any) => {
  const {fill, width, height} = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill={fill}
        d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10"
      />
    </Svg>
  );
};
