import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const TrackEndLine = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3h1.5v2.5h15V3H21v18h-1.5v-5.5h-15V21H3V3Zm16.5 9V9h-3V6h-3v3h-3V6h-3v3h-3v3h3v3h3v-3h3v3h3v-3h3Zm-3 0h-3V9h3v3Zm-6 0h-3V9h3v3Z"
      fill="currentColor"
    />
  </Svg>
);

export default TrackEndLine;
