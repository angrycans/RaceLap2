import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const TrackSection1 = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3h1.5v2.5h15V3H21v18h-1.5v-5.5h-15V21H3V3Zm10.203 10H11.77V8.656h-.075l-1.36.918V8.34l1.434-.977h1.434V13Z"
      fill="currentColor"
    />
  </Svg>
);

export default TrackSection1;
