import React, { type FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup, Button } from '@rneui/themed';
import { WebRouteName, Record } from '@race-lap/app-helper';
import { WebView, Text } from '@/components';
import {
  PersonCropCircle,
  ArrowTriangleBackwardFill,
  ArrowTriangleRightFill,
} from '@/components/Icons/MonoIcons';
import { RouteName } from '@/constants';
import { useRoute } from '@/hooks';

interface Props extends Pick<Record, 'username'> {
  /** 最大圈数 */
  maxCycleNum: number;
}

const ReviewAnalysis: FC<Props> = props => {
  const { username, maxCycleNum } = props;
  const {
    params: { id },
  } = useRoute<RouteName.RECORD_DETAIL>();
  const [modeIdx, setModeIdx] = useState(0);
  const [cycleNo, setCycleNo] = useState(1);

  return (
    <>
      <ButtonGroup
        containerStyle={styles.modePickerWrapper}
        innerBorderStyle={styles.modePickerInnerBorder}
        selectedButtonStyle={styles.modePickerSelectedBtn}
        selectedTextStyle={styles.modePickerBtnText}
        textStyle={styles.modePickerBtnText}
        selectedIndex={modeIdx}
        buttons={['路径', '速度', '刹车', '混合']}
        onPress={setModeIdx}
      />
      <WebView
        style={styles.webView}
        page={`${WebRouteName.RECORD_DETAIL_REVIEW_ANALYSIS}/${id}/${modeIdx}/${cycleNo}`}
      />
      <View style={styles.actionsSheetWrapper}>
        <View style={styles.usernameWrapper}>
          <PersonCropCircle color="#000" fontSize={18} />
          <Text style={styles.usernameText}>{username || '-'}</Text>
        </View>
        <Text>第{cycleNo || '-'}圈</Text>
        <View style={styles.cycleNoBtnWrapper}>
          <Button
            type="clear"
            icon={<ArrowTriangleBackwardFill fontSize={20} />}
            buttonStyle={styles.leftArrowBtn}
            onPress={() => {
              setCycleNo(cycleNo <= 1 ? maxCycleNum : cycleNo - 1);
            }}
          />
          <Button
            type="clear"
            icon={<ArrowTriangleRightFill fontSize={20} />}
            buttonStyle={styles.rightArrowBtn}
            onPress={() => {
              setCycleNo(cycleNo >= maxCycleNum ? 1 : cycleNo + 1);
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modePickerWrapper: {
    backgroundColor: '#e3e3e8',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 12,
    marginBottom: 0,
    padding: 2,
    borderRadius: 8,
  },
  modePickerInnerBorder: {
    width: 0,
  },
  modePickerBtnText: {
    fontWeight: '600',
    color: '#000',
  },
  modePickerSelectedBtn: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  webView: {
    borderRadius: 12,
    height: 358,
    marginTop: 12,
  },
  actionsSheetWrapper: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3e3e8',
    borderRadius: 8,
    justifyContent: 'center',
    height: 40,
  },
  usernameWrapper: {
    position: 'absolute',
    left: 14,
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  usernameText: {
    marginLeft: 8,
  },
  cycleNoBtnWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  leftArrowBtn: {
    paddingRight: 4,
  },
  rightArrowBtn: {
    paddingLeft: 4,
    paddingRight: 12,
  },
});

export default ReviewAnalysis;
