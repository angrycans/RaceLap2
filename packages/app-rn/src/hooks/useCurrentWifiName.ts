import { useEffect, useState } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import WifiManager from 'react-native-wifi-reborn';

/**
 * 获取当前 Wifi 名称
 */
export function useCurrentWifiName() {
  const [currentWifiName, setCurrentWifiName] = useState('');
  useEffect(() => {
    return addEventListener(state => {
      if (state.type === 'wifi') {
        WifiManager.getCurrentWifiSSID().then(setCurrentWifiName, err => {
          console.log(err);
          setCurrentWifiName('');
        });
      } else {
        setCurrentWifiName('');
      }
    });
  }, []);

  return currentWifiName;
}

export default useCurrentWifiName;
