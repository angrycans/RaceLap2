import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const PlusCircle = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M11.996 21.078c1.241 0 2.41-.237 3.505-.712a9.283 9.283 0 0 0 4.867-4.86 8.73 8.73 0 0 0 .712-3.507 8.73 8.73 0 0 0-.712-3.507A9.178 9.178 0 0 0 18.4 5.601a9.277 9.277 0 0 0-2.899-1.97 8.743 8.743 0 0 0-3.514-.711 8.72 8.72 0 0 0-3.506.712 9.306 9.306 0 0 0-4.85 4.86A8.73 8.73 0 0 0 2.92 12a8.73 8.73 0 0 0 .712 3.507 9.356 9.356 0 0 0 1.959 2.9 9.154 9.154 0 0 0 2.9 1.96 8.721 8.721 0 0 0 3.505.712Zm0-1.793a7.194 7.194 0 0 1-5.158-2.127 7.375 7.375 0 0 1-1.555-2.32 7.16 7.16 0 0 1-.562-2.839c0-1.008.188-1.951.562-2.83a7.348 7.348 0 0 1 1.555-2.33A7.197 7.197 0 0 1 9.15 5.276a7.194 7.194 0 0 1 2.838-.562c1.013 0 1.959.187 2.838.562a7.299 7.299 0 0 1 2.319 1.565A7.206 7.206 0 0 1 19.279 12a7.16 7.16 0 0 1-.562 2.838 7.304 7.304 0 0 1-1.564 2.32 7.172 7.172 0 0 1-2.32 1.565 7.152 7.152 0 0 1-2.837.562ZM7.936 12c0 .234.077.428.23.58.157.152.36.229.605.229h2.408v2.417c0 .24.076.44.228.597a.785.785 0 0 0 .58.229.808.808 0 0 0 .597-.229.81.81 0 0 0 .238-.597v-2.417h2.407a.808.808 0 0 0 .597-.229.786.786 0 0 0 .229-.58.809.809 0 0 0-.229-.598.792.792 0 0 0-.597-.237h-2.407V8.756a.792.792 0 0 0-.238-.598.808.808 0 0 0-.597-.228.797.797 0 0 0-.808.826v2.408H8.77a.806.806 0 0 0-.606.237.809.809 0 0 0-.228.598Z"
      fill="currentColor"
    />
  </Svg>
);

export default PlusCircle;
