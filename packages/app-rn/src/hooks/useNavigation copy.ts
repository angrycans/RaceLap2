import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation as useNavigationBase } from '@react-navigation/native';
import { RootStackParamList } from '@/types';

export function useNavigation() {
  // @ts-ignore
  return useNavigationBase<StackNavigationProp<RootStackParamList>>();
}

export default useNavigation;
