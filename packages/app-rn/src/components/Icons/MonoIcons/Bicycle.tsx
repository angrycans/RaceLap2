import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Bicycle = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 4.25a.75.75 0 0 0-.708.998l.806 2.302h-6.36l-.453-.8H9a.75.75 0 0 0 0-1.5H6a.75.75 0 0 0 0 1.5h.562l.896 1.585L6.38 10.67a4.4 4.4 0 1 0 3.33 4.879h2.59a.75.75 0 0 0 .66-.394l2.91-5.402.5 1.432a4.4 4.4 0 1 0 1.398-.547l-1.71-4.889H17a.75.75 0 0 0 0-1.5h-2Zm1.883 8.4.91 2.598a.75.75 0 0 0 1.415-.496l-.937-2.677a2.9 2.9 0 1 1-1.388.576Zm-11.533-.6c.13 0 .257.008.382.025l-1.113 2.41A.75.75 0 0 0 5.3 15.55h2.888a2.901 2.901 0 1 1-2.838-3.5Zm1.122 2h1.636a2.906 2.906 0 0 0-.99-1.399l-.646 1.399Zm1.285-2.784a4.404 4.404 0 0 1 1.9 2.784h1.3L8.396 9.885l-.638 1.381Zm4.5 2.033 2.287-4.249H9.642l2.615 4.248Z"
      fill="currentColor"
    />
  </Svg>
);

export default Bicycle;
