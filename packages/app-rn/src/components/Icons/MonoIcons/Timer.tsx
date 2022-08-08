import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Timer = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M11.996 21.078a8.743 8.743 0 0 0 3.514-.712 9.051 9.051 0 0 0 2.89-1.96 9.178 9.178 0 0 0 1.968-2.891 8.752 8.752 0 0 0 .712-3.516c0-1.248-.237-2.42-.712-3.516a9.25 9.25 0 0 0-1.959-2.891 9.053 9.053 0 0 0-2.89-1.96 8.743 8.743 0 0 0-3.515-.712c-.269 0-.477.076-.623.229-.141.146-.211.351-.211.615v3.243c0 .223.07.41.21.562.141.153.32.229.536.229a.707.707 0 0 0 .545-.229.8.8 0 0 0 .211-.562V3.72l-.764.975a7.111 7.111 0 0 1 2.873.545 7.23 7.23 0 0 1 2.345 1.556A7.181 7.181 0 0 1 18.7 9.134c.38.89.571 1.846.571 2.865a7.202 7.202 0 0 1-.562 2.839 7.183 7.183 0 0 1-1.555 2.32 7.242 7.242 0 0 1-2.32 1.556 7.057 7.057 0 0 1-2.837.571 7.119 7.119 0 0 1-2.847-.571 7.372 7.372 0 0 1-2.32-1.556 7.375 7.375 0 0 1-1.554-2.32 7.201 7.201 0 0 1-.563-2.839 7.333 7.333 0 0 1 .44-2.487 7.357 7.357 0 0 1 1.212-2.118c.158-.223.243-.449.255-.677.017-.229-.068-.434-.255-.615a.8.8 0 0 0-.677-.246c-.263.023-.492.16-.685.413a9.49 9.49 0 0 0-1.528 2.645A8.623 8.623 0 0 0 2.92 12c0 1.248.234 2.42.703 3.516a9.248 9.248 0 0 0 4.858 4.851 8.743 8.743 0 0 0 3.515.712Zm1.414-7.734c.246-.258.393-.53.44-.818a1.387 1.387 0 0 0-.115-.852 1.726 1.726 0 0 0-.615-.712L8.648 7.877c-.175-.117-.34-.15-.492-.097a.448.448 0 0 0-.29.3c-.047.146-.014.307.097.483l3.075 4.473c.2.293.436.501.712.624.275.123.559.161.852.114.293-.046.562-.19.808-.43Z"
      fill="currentColor"
    />
  </Svg>
);

export default Timer;
