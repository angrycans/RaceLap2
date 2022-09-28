import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CheckmarkCircleFill = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 21c4.923 0 9-4.069 9-9 0-4.923-4.077-9-9.009-9C7.07 3 3 7.077 3 12c0 4.931 4.077 9 9 9Zm-.967-4.696c-.331 0-.601-.148-.845-.462l-2.135-2.596a.965.965 0 0 1-.235-.619c0-.444.349-.81.802-.81.27 0 .479.105.697.383l1.681 2.135 3.607-5.768c.183-.305.427-.453.706-.453.435 0 .827.305.827.758 0 .2-.104.418-.226.61l-4.078 6.36c-.2.296-.479.462-.801.462Z"
      fill="currentColor"
    />
  </Svg>
);

export default CheckmarkCircleFill;
