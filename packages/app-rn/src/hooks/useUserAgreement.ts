import { useMount } from 'ahooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '@/constants';
import { useNavigation } from '@/hooks';
import { RouteName } from '@/constants';

export function useUserAgreement() {
  const navigation = useNavigation();
  useMount(async () => {
    const isAgree = await AsyncStorage.getItem(
      AsyncStorageKey.IS_AGRESS_USER_AGREEMENT,
    );
    if (!isAgree) {
      navigation.navigate(RouteName.STARTUP);
    }
  });
}

export default useUserAgreement;
