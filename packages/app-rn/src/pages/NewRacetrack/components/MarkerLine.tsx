import React, {
  useMemo,
  type FC,
  type ReactElement,
  isValidElement,
} from 'react';
import { Marker, Polyline, type LatLng } from 'react-native-amap3d';
import { produce } from 'immer';

interface Props {
  /** 是否可编辑 */
  editable?: boolean;
  /** 端点图标 */
  icon: ReactElement | Record<'start' | 'end', ReactElement>;
  /** 标记点坐标 */
  points: [LatLng | null, LatLng | null];
  /** change 回调 */
  onChange?(points: [LatLng | null, LatLng | null]): void;
}

const MarkerLine: FC<Props> = ({
  editable = false,
  icon,
  points,
  onChange,
}) => {
  const { hasLine, start, end } = useMemo(
    () => ({
      hasLine: points.every(Boolean),
      start: points[0],
      end: points[1],
    }),
    [points],
  );
  const { startIcon, endIcon } = useMemo(
    () =>
      isValidElement(icon)
        ? {
            startIcon: icon,
            endIcon: icon,
          }
        : {
            startIcon: icon.start,
            endIcon: icon.end,
          },
    [icon],
  );

  return (
    <>
      {start && (
        <Marker
          position={start}
          onPress={() => {
            if (editable) {
              const nextPoints = produce(points, draft => {
                draft[0] = null;
              });
              onChange?.(nextPoints);
            }
          }}>
          {startIcon}
        </Marker>
      )}
      {hasLine && (
        <Polyline width={3} color="#FF3B30" points={points as LatLng[]} />
      )}
      {end && (
        <Marker
          position={end}
          onPress={() => {
            if (editable) {
              const nextPoints = produce(points, draft => {
                draft[1] = null;
              });
              onChange?.(nextPoints);
            }
          }}>
          {endIcon}
        </Marker>
      )}
    </>
  );
};

export default MarkerLine;
