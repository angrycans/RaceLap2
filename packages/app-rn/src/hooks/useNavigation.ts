// import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation as useNavigationBase } from '@react-navigation/native';
// import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@/types';

// type ProfileScreenNavigationProp = CompositeNavigationProp<
//   // BottomTabNavigationProp<TabParamList, 'Profile'>,
//   StackNavigationProp<StackParamList>
// >;

export function useNavigation() {
  // @ts-ignore
  return useNavigationBase<StackNavigationProp<RootStackParamList>>();
}

export default useNavigation;
