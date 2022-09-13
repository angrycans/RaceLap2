import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import { WebRouteName } from '@race-lap/app-helper';
import { WebView } from '@/components';
import { RouteName } from '@/constants';
import { useRoute } from '@/hooks';

const ReviewAnalysis = () => {
  const {
    params: { id },
  } = useRoute<RouteName.RECORD_DETAIL>();
  const [modeIdx, setModeIdx] = useState(0);

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
        page={`${WebRouteName.RECORD_DETAIL_REVIEW_ANALYSIS}/${id}/${modeIdx}`}
      />
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
});

export default ReviewAnalysis;
