import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

export const HeartSVG = (props: any) => {
  const {fill, width, height} = props;

  return (
    <Svg width={width} height={height} viewBox="0 0 16 16">
      <Path
        fill={fill}
        d="M12 2c0 0-3 0-4 3-1-3-4-3-4-3-2.2 0-4 1.8-4 4 0 4.1 8 9 8 9s8-5 8-9c0-2.2-1.8-4-4-4z"></Path>
    </Svg>
  );
};
