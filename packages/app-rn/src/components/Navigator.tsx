import { type FC, useRef, useEffect } from 'react';
import { type StackNavigationOptions } from '@react-navigation/stack';
import { useNavigation } from '@/hooks';
import { omitUndefinedKeys } from '@/utils';

type SupportOptions = 'title' | 'headerLeft' | 'headerRight';

interface Props extends Pick<StackNavigationOptions, SupportOptions> {}

/**
 * 自定义导航条
 */
export const Navigator: FC<Props> = props => {
  const { title = '', headerLeft, headerRight } = props;
  const navigationRef = useRef(useNavigation());

  useEffect(() => {
    const navigation = navigationRef.current;
    navigation.setOptions(
      omitUndefinedKeys({
        title,
        headerLeft,
        headerRight,
      }),
    );
  }, [title, headerLeft, headerRight]);

  return null;
};

export default Navigator;
