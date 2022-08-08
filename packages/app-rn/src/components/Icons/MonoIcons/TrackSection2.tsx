import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const TrackSection2 = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3h1.5v2.5h15V3H21v18h-1.5v-5.5h-15V21H3V3Zm11.168 10H9.883v-.957l1.77-1.648c.275-.253.489-.46.64-.622.154-.164.26-.303.316-.418a.76.76 0 0 0 .09-.347v-.016c0-.14-.03-.263-.09-.367a.606.606 0 0 0-.261-.242.899.899 0 0 0-.407-.086.896.896 0 0 0-.433.101.773.773 0 0 0-.394.688v.031L9.8 9.113V9.09c0-.375.09-.703.273-.985.185-.28.442-.5.77-.656.33-.159.715-.238 1.152-.238.42 0 .785.07 1.098.21.315.139.56.333.734.583.177.25.266.542.266.875v.02c0 .21-.044.42-.133.628a2.645 2.645 0 0 1-.438.668 8.212 8.212 0 0 1-.824.801l-.91.798v.089h2.379V13Z"
      fill="currentColor"
    />
  </Svg>
);

export default TrackSection2;
