import React, { FC } from 'react';
import { StatusBar, type StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface Props extends StatusBarProps {}

export const FocusAwareStatusBar: FC<Props> = props => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
