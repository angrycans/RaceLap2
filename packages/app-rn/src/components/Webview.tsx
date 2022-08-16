import React, { type FC, useMemo } from 'react';
import type { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { WebView, WebViewProps } from 'react-native-webview';
// import { Text } from '@/components';
import { WebRouteName } from '@/constants';

declare const WEBVIEW_BASE_URL: string;

interface Props extends WebViewProps {
  /** 页面名称 */
  page: WebRouteName;
}

const ORIGIN_WHITELIST = ['file://', 'http://'];
// const BASE_URL = './web.bundle/index.html';
// const BASE_URL = 'http://172.19.8.120:12345';

export const Webview: FC<Props> = props => {
  const { page, source: sourceFromProps, ...rest } = props;
  const source = useMemo<WebViewSource>(
    () => sourceFromProps || { uri: `${WEBVIEW_BASE_URL}#/${page}` },
    [page, sourceFromProps],
  );

  return (
    <>
      <WebView
        useWebKit
        bounces={false}
        allowFileAccess
        javaScriptEnabled
        allowingReadAccessToURL="*"
        originWhitelist={ORIGIN_WHITELIST}
        source={source}
        mixedContentMode="compatibility"
        mediaPlaybackRequiresUserAction
        {...rest}
      />
      {/* <Text>{`${WEBVIEW_BASE_URL}#/${page}`}</Text> */}
    </>
  );
};

export default Webview;
