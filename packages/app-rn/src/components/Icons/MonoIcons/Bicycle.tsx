import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Bicycle = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M4.84 19.411c.634 0 1.229-.12 1.784-.362a4.54 4.54 0 0 0 1.463-.991 4.54 4.54 0 0 0 .99-1.462c.242-.56.363-1.157.363-1.79 0-.638-.119-1.235-.356-1.79a4.618 4.618 0 0 0-.99-1.47 4.52 4.52 0 0 0-1.47-.99 4.5 4.5 0 0 0-1.783-.356c-.642 0-1.244.118-1.804.355a4.619 4.619 0 0 0-1.47.991 4.777 4.777 0 0 0-.99 1.47 4.518 4.518 0 0 0-.355 1.79c0 .637.118 1.234.355 1.79.241.555.574 1.043.998 1.462.423.424.913.754 1.469.99.56.242 1.16.363 1.797.363Zm0-1.456a3.18 3.18 0 0 1-2.24-.915 3.173 3.173 0 0 1-.676-1.004 3.165 3.165 0 0 1-.239-1.23 3.106 3.106 0 0 1 .916-2.227 3.104 3.104 0 0 1 1.01-.677 3.089 3.089 0 0 1 1.23-.246c.434 0 .839.082 1.217.246.383.16.718.385 1.005.677a3.119 3.119 0 0 1 .929 2.228 3.12 3.12 0 0 1-.93 2.228 3.03 3.03 0 0 1-1.004.675 3.023 3.023 0 0 1-1.216.247Zm14.323 1.456c.633 0 1.228-.12 1.783-.362a4.62 4.62 0 0 0 1.47-.991 4.519 4.519 0 0 0 1.346-3.252 4.52 4.52 0 0 0-1.346-3.253 4.542 4.542 0 0 0-1.463-.99 4.445 4.445 0 0 0-1.79-.363 4.48 4.48 0 0 0-1.797.362 4.62 4.62 0 0 0-1.47.99c-.423.42-.755.907-.997 1.463a4.518 4.518 0 0 0-.355 1.79c0 .638.118 1.235.355 1.79.242.556.574 1.046.998 1.47a4.569 4.569 0 0 0 3.266 1.346Zm0-1.456a3.073 3.073 0 0 1-1.592-.423 3.132 3.132 0 0 1-1.141-1.134 3.072 3.072 0 0 1-.424-1.592c0-.438.082-.846.246-1.224a3.174 3.174 0 0 1 1.681-1.68 3.089 3.089 0 0 1 1.23-.247 3.12 3.12 0 0 1 2.22.93c.292.287.52.62.684.997.164.378.246.786.246 1.223a3.12 3.12 0 0 1-.93 2.228 3.03 3.03 0 0 1-1.004.676 3.023 3.023 0 0 1-1.216.247ZM12.159 5.308a.71.71 0 0 0 .724.717h1.866a.12.12 0 0 1 .116.07l3.662 9.142 1.354-.458-3.882-9.607c-.16-.387-.471-.581-.936-.581h-2.18c-.2 0-.37.07-.512.212a.676.676 0 0 0-.212.505Zm4.831 4.9V8.86L9.31 9.872v1.353l7.68-1.018Zm-5.972 5.418v-1.352H4.964v1.352h6.054Zm.854.84c.3 0 .574-.072.82-.218.25-.15.449-.348.595-.594.15-.246.225-.52.225-.82a1.634 1.634 0 0 0-.82-1.414 1.541 1.541 0 0 0-.82-.226c-.305 0-.58.073-.827.219a1.707 1.707 0 0 0-.594.587c-.15.246-.226.522-.226.827-.009.3.06.576.205.827.15.246.351.444.602.594.25.146.53.219.84.219Zm.007-1.154a.495.495 0 0 1-.355-.136.451.451 0 0 1-.144-.329c0-.136.048-.252.144-.348a.497.497 0 0 1 .355-.143c.132 0 .244.047.335.143a.46.46 0 0 1 .143.349.448.448 0 0 1-.136.328.464.464 0 0 1-.342.136Zm-7.038.58c.3 0 .558-.104.772-.313.214-.214.321-.472.321-.772 0-.31-.107-.57-.321-.78a1.05 1.05 0 0 0-.772-.314c-.31 0-.57.105-.78.315a1.036 1.036 0 0 0-.313.772c-.005.305.097.565.307.779.214.21.476.314.786.314Zm14.322.008c.3 0 .556-.107.765-.321.214-.214.322-.472.322-.772 0-.31-.105-.57-.315-.78a1.05 1.05 0 0 0-.772-.314c-.305 0-.565.105-.779.315-.21.205-.317.462-.321.772-.005.305.1.565.314.779.214.214.476.32.786.32Zm-7.667-2.187 1.217.684 4.64-4.94-1.73-.021-4.127 4.277Zm-7.284.78 1.196.676 4.25-4.517-1.189-.745-4.257 4.585Zm6.54 0 1.188-.862-3.259-6.013-1.4.308 3.47 6.566Zm-4.975-7.06c0 .196.07.365.212.506a.698.698 0 0 0 .512.212h3.267c.2 0 .37-.07.512-.212a.69.69 0 0 0 .212-.505c0-.2-.07-.372-.212-.513a.698.698 0 0 0-.512-.212H6.5c-.2 0-.371.07-.512.212a.698.698 0 0 0-.212.513Z"
      fill="currentColor"
    />
  </Svg>
);

export default Bicycle;
