import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Kart = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.254 9.354a.5.5 0 0 1 0-.708l2.545-2.545a.5.5 0 0 1 .707 0l.354.353a.5.5 0 0 1 0 .708l-.778.777L16.142 10H17c1.144 0 2.912 1.108 3.5 1.5.588.392 1.8 1.56 1.8 2.5v.836c0 .035.028.064.064.064.351 0 .636.285.636.636v.114a.75.75 0 0 1-.75.75h-.095a2.65 2.65 0 0 1-4.91 0h-9.79a2.65 2.65 0 0 1-4.91 0H1.75a.75.75 0 0 1 0-1.5h.05V12c0-1.16 1.2-2 2.7-2h.729a.3.3 0 0 0 .272-.427l-.264-.565a.5.5 0 0 1 .295-.685l.571-.19a.5.5 0 0 1 .597.234l1.316 2.412a1 1 0 0 0 .878.521h5.265l.61-.694-1.677-1.677-.778.778a.5.5 0 0 1-.707 0l-.353-.353ZM19.7 14.25a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3ZM3.85 15.4a1.15 1.15 0 1 1 2.3 0 1.15 1.15 0 0 1-2.3 0Z"
      fill="currentColor"
    />
  </Svg>
);

export default Kart;
