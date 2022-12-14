import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const PlayCircleFill = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 21a8.64 8.64 0 0 0 3.477-.708 8.986 8.986 0 0 0 2.865-1.942 9.24 9.24 0 0 0 1.95-2.867A8.672 8.672 0 0 0 21 11.996a8.589 8.589 0 0 0-.708-3.47 9.212 9.212 0 0 0-1.95-2.876 8.96 8.96 0 0 0-2.873-1.942A8.638 8.638 0 0 0 11.99 3c-1.23 0-2.39.236-3.477.708A9.087 9.087 0 0 0 5.64 5.65 9.287 9.287 0 0 0 3.7 8.525a8.68 8.68 0 0 0-.7 3.47c0 1.238.233 2.4.699 3.489a9.24 9.24 0 0 0 1.95 2.866 9.087 9.087 0 0 0 2.874 1.942A8.64 8.64 0 0 0 12 21Zm-1.709-5.43c-.212.126-.42.144-.62.052a.477.477 0 0 1-.303-.467v-6.31c0-.225.104-.38.31-.467a.66.66 0 0 1 .613.044l5.238 3.082a.542.542 0 0 1 .276.5.553.553 0 0 1-.276.51l-5.238 3.056Z"
      fill="currentColor"
    />
  </Svg>
);

export default PlayCircleFill;
