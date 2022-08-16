import React, {
  type FC,
  PropsWithChildren,
  Children,
  useMemo,
  isValidElement,
  cloneElement,
} from 'react';
import { type ViewStyle, View, StyleSheet, StyleProp } from 'react-native';

interface RowProps {
  style?: ViewStyle;
}

interface RowEx extends FC<PropsWithChildren<RowProps>> {
  Col: FC<PropsWithChildren<ColProps>>;
}

export const Row: RowEx = ({ children, style }) => {
  const colChildren = useMemo(() => {
    return Children.toArray(children).reduce(
      (acc: React.ReactNode[], child, idx) => {
        if (idx) {
          acc.push(
            <View key={`separator-${idx}`} style={rowStyles.separator} />,
          );
        }
        acc.push(
          isValidElement(child)
            ? cloneElement(child, { key: child.key ?? idx, ...child.props })
            : child,
        );
        return acc;
      },
      [],
    );
  }, [children]);

  return <View style={[rowStyles.container, style]}>{colChildren}</View>;
};

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: 46,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
});

interface ColProps {
  style?: StyleProp<ViewStyle>;
}

export const Col: FC<PropsWithChildren<ColProps>> = ({ children, style }) => {
  const containerStyle = useMemo(
    () => [colStyles.container].concat(style!).filter(Boolean),
    [style],
  );
  return <View style={containerStyle}>{children}</View>;
};

const colStyles = StyleSheet.create({
  container: {},
});

Row.Col = Col;

export default Row;
