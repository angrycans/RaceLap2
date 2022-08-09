import { type TextStyle, type StyleProp } from 'react-native';
import { type TextProps } from '@rneui/themed/dist/Text';
import { Text as TextBase, type Colors, useTheme } from '@rneui/themed';
import { useMemo } from 'react';
import React, { type FC } from 'react';
import { bodyTextStyle } from '@/theme';

interface Props extends TextProps {
  /** 是否加粗字体 */
  bold?: boolean;
  /** 文字横向对齐方式 */
  align?: TextStyle['textAlign'];
  /** 文字大小 */
  size?: TextStyle['fontSize'];
  /** 文字行高 */
  height?: TextStyle['lineHeight'];
  /** 通用文本 */
  body?: boolean;
  bodyStyle?: StyleProp<TextStyle>;
  /** 颜色 */
  color?: keyof Colors | string;
}

export const Text: FC<Props> = ({
  bold,
  align,
  body,
  bodyStyle,
  style,
  color,
  size,
  height,
  ...rest
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styleOverwrite = useMemo(() => {
    const fontWeight = bold ? '600' : undefined;
    const overwriteStyle: TextStyle = {
      fontWeight,
      // @ts-ignore
      color: colors[color] || color,
      textAlign: align,
      fontSize: size,
      lineHeight: height,
    };

    Object.keys(overwriteStyle).forEach(key => {
      if (typeof overwriteStyle[key as keyof TextStyle] === 'undefined') {
        delete overwriteStyle[key as keyof TextStyle];
      }
    });

    return [
      { color: '#000' },
      body && bodyTextStyle,
      style || {},
      bodyStyle || {},
      overwriteStyle,
    ];
  }, [bold, body, bodyStyle, style, colors, color, align, size, height]);
  return <TextBase style={styleOverwrite} {...rest} />;
};

Text.defaultProps = {
  body: true,
  bold: false,
};

export default Text;
