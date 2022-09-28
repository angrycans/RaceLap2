import type { HeaderBackButtonProps } from '@react-navigation/elements';
import React, { type FC, useState, useRef, useMemo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { CarrierType } from '@race-lap/app-helper';
import { apis } from '@race-lap/app-helper/dist/native';
import { useNavigation, useAuth } from '@/hooks';
import { Navigator, FocusAwareStatusBar } from '@/components';
import {
  QuestionmarkCircle,
  RollerSkating,
  Bicycle,
  Scooter,
  Kart,
  DirtBike,
  RaceCar,
} from '@/components/Icons/MonoIcons';

const carrierTypeSelections = [
  {
    type: CarrierType.UNKNOWN,
    icon: QuestionmarkCircle,
  },
  {
    type: CarrierType.ROLLER_SKATING,
    icon: RollerSkating,
  },
  {
    type: CarrierType.BICYCLE,
    icon: Bicycle,
  },
  {
    type: CarrierType.SCOOTER,
    icon: Scooter,
  },
  {
    type: CarrierType.KART,
    icon: Kart,
  },
  {
    type: CarrierType.DIRT_BIKE,
    icon: DirtBike,
  },
  {
    type: CarrierType.RACE_CAR,
    icon: RaceCar,
  },
];

export const SetDriverName: FC = () => {
  const [carrierName, setCarrierName] = useState('');
  const [currentCarrierType, setCurrentCarrierType] = useState(
    CarrierType.UNKNOWN,
  );
  const { auth, refresh } = useAuth();
  const navigationRef = useRef(useNavigation());
  const { HeaderLeft, HeaderRight } = useMemo(
    () => ({
      HeaderLeft() {
        return (
          <Button
            type="clear"
            title="取消"
            onPress={() => navigationRef.current.goBack()}
          />
        );
      },
      HeaderRight(_: HeaderBackButtonProps) {
        return (
          <Button
            type="clear"
            disabled={!carrierName.length}
            title="完成"
            onPress={async () => {
              try {
                const { errCode, data } = await apis.carrier.save({
                  type: currentCarrierType,
                  name: carrierName,
                });

                console.log(auth, data);

                if (auth) {
                  const { errCode: updateAuthFailed } = await apis.user.save({
                    carrierId: data!,
                    id: auth.id,
                  });
                  if (updateAuthFailed) {
                    throw new Error('Update User Carrier Failed !');
                  } else {
                    await refresh();
                  }
                }
                if (!errCode) {
                  navigationRef.current.goBack();
                }
              } catch (err) {
                console.error(err);
              }
            }}
          />
        );
      },
    }),
    [auth, refresh, carrierName, currentCarrierType],
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" />
      <Navigator
        title="载具"
        headerLeft={HeaderLeft}
        headerRight={HeaderRight}
      />
      <View style={styles.wrapper}>
        <TextInput
          placeholder="请输入载具型号/品牌"
          placeholderTextColor="#C7C7CC"
          style={styles.input}
          value={carrierName}
          onChangeText={setCarrierName}
        />
      </View>
      <View style={styles.carrierTypeSelectionsWrapper}>
        {carrierTypeSelections.map(({ type, icon: Icon }) => (
          <Button
            key={type}
            buttonStyle={styles.carrierTypeSelection}
            onPress={() => setCurrentCarrierType(type)}
            icon={
              <Icon
                width={30}
                height={30}
                color={currentCarrierType !== type ? '#C4C4C4' : void 0}
              />
            }
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  carrierTypeSelectionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  carrierTypeSelection: {
    backgroundColor: '#fff',
    width: 62,
    height: 62,
    marginLeft: 12,
    marginTop: 12,
    borderRadius: 12,
  },
});

export default SetDriverName;
