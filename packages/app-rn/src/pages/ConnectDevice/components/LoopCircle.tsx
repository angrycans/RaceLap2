import React, { type FC, useRef, useEffect, useMemo } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const MAGIC_CYCLE_NUM = 4;
const START = 0.2;
const END = 1;

export const LoopCircle: FC = () => {
  const anims = useMemo(
    () =>
      Array.from({ length: MAGIC_CYCLE_NUM }, () => new Animated.Value(START)),
    [],
  );

  const animsRef = useRef(anims);

  useEffect(() => {
    const animates = animsRef.current;
    const start = async () => {
      const batchTask = Promise.all(
        animates.map((anim, idx) => {
          return new Promise(resolve => {
            Animated.timing(anim, {
              toValue: END,
              duration: 500,
              useNativeDriver: true,
              delay: 100 * idx,
            }).start(() => {
              Animated.timing(anim, {
                toValue: START,
                duration: 500,
                useNativeDriver: true,
                delay: 100,
              }).start(resolve);
            });
          });
        }),
      );
      await batchTask;
      start();
    };
    start();
    return () => {
      animates.forEach(anim => anim.stopAnimation());
    };
  });

  return (
    <View style={styles.wrapper}>
      {anims.map((anim, idx) => (
        <Animated.View
          key={idx}
          style={[styles.circleWrapper, { transform: [{ scale: anim }] }]}>
          <View
            style={[styles.circle, { transform: [{ scale: 1 - idx * 0.2 }] }]}
          />
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 312,
    height: 312,
    // backgroundColor: '#f0f',
  },
  circleWrapper: {
    opacity: 0.1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 312,
    backgroundColor: '#FFFFFF',
  },
});

export default LoopCircle;
