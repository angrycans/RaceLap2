import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowTriangleBackwardFill = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.8 4.623c-.187 0-.365.035-.535.106-.164.07-.349.155-.554.254L5.619 10.345c-.392.193-.67.395-.835.606a1.133 1.133 0 0 0-.237.712c0 .27.079.51.237.72.164.206.443.405.835.598l11.092 5.362c.205.105.393.19.562.255.17.07.346.105.528.105.351 0 .639-.126.861-.378.223-.252.334-.592.334-1.02V6.022c0-.428-.114-.768-.343-1.02a1.087 1.087 0 0 0-.852-.378Z"
      fill="currentColor"
    />
  </Svg>
);

export default ArrowTriangleBackwardFill;
