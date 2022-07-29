import { type TextStyle, type StyleProp } from 'react-native';
import { type TextProps } from '@rneui/themed/dist/Text';
import { Text as TextBase, type Colors, useTheme } from '@rneui/themed';
import { useMemo } from 'react';
import React, { type FC } from 'react';
import { bodyTextStyle } from '@/theme';

interface Props extends TextProps {
  /** 是否加粗字体 */
  bold?: boolean;
  /** 通用文本 */
  body?: boolean;
  bodyStyle?: StyleProp<TextStyle>;
  /** 颜色 */
  color?: keyof Colors | `#${string}`;
}

export const Text: FC<Props> = ({
  bold,
  body,
  bodyStyle,
  style,
  color,
  ...rest
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styleOverwrite = useMemo(() => {
    const fontWeight = bold ? '600' : '400';
    const baseStyle: StyleProp<TextStyle> = {
      fontWeight,
      // @ts-ignore
      color: colors[color] || color || '#000',
    };
    if (body) {
      Object.assign(baseStyle, bodyTextStyle);
    }
    return Object.assign(baseStyle, style || {}, bodyStyle || {});
  }, [bold, body, bodyStyle, style, colors, color]);
  return <TextBase style={styleOverwrite} {...rest} />;
};

Text.defaultProps = {
  body: true,
  bold: false,
};

export default Text;
