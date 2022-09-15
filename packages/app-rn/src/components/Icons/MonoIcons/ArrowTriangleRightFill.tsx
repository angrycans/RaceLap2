import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowTriangleRightFill = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M6.208 18.703c.182 0 .354-.035.519-.105.17-.065.357-.15.562-.255l11.092-5.362c.392-.193.668-.392.826-.597.164-.211.246-.451.246-.72 0-.27-.082-.508-.246-.713-.158-.21-.434-.413-.826-.606L7.289 4.983c-.205-.1-.393-.184-.562-.254a1.366 1.366 0 0 0-.528-.106c-.351 0-.641.126-.87.378-.223.252-.334.592-.334 1.02l.009 11.285c0 .427.111.767.334 1.02.228.251.518.377.87.377Z"
      fill="currentColor"
    />
  </Svg>
);

export default ArrowTriangleRightFill;
