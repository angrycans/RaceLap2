import {
  useRoute as useRouteBase,
  type RouteProp,
} from '@react-navigation/native';
import { RootStackParamList, RouteName } from '@/types';

export function useRoute<Name extends RouteName>(_: Name) {
  return useRouteBase<RouteProp<RootStackParamList, Name>>();
}

export default useRoute;
