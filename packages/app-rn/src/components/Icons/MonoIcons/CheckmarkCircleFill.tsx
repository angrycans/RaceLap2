import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CheckmarkCircleFill = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 21.078c4.965 0 9.078-4.104 9.078-9.079 0-4.966-4.113-9.079-9.088-9.079-4.966 0-9.07 4.113-9.07 9.08 0 4.974 4.113 9.078 9.08 9.078Zm-.976-4.737c-.334 0-.607-.15-.853-.466l-2.153-2.62a.973.973 0 0 1-.238-.623c0-.448.352-.817.809-.817.272 0 .483.105.703.386l1.696 2.154 3.639-5.819c.185-.307.43-.457.712-.457.44 0 .835.308.835.765 0 .202-.106.422-.229.615l-4.113 6.416c-.202.299-.483.466-.809.466Z"
      fill="currentColor"
    />
  </Svg>
);

export default CheckmarkCircleFill;
