import React, { type FC, useMemo, useRef, useEffect } from 'react';
import type { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { WebView, WebViewProps } from 'react-native-webview';
// import RNFS from 'react-native-fs';
import { WebRouteName } from '@/constants';
import { getStorageRootPath } from '@/utils';
import { enableWebview } from '@race-lap/app-helper/dist/native';
// import { Text } from '@/components';

declare const WEBVIEW_BASE_URL: string;

interface Props extends WebViewProps {
  style: object;
  /** 页面名称 */
  page: `${WebRouteName}${string}`;
}

const ORIGIN_WHITELIST = ['http://', 'https://', 'file://'];
const storageRootPath = getStorageRootPath();

export const Webview: FC<Props> = props => {
  const { page, source: sourceFromProps, ...rest } = props;
  const webviewInstanceRef = useRef<WebView>(null);
  const webviewBridgeRef = useRef<ReturnType<typeof enableWebview> | null>(
    null,
  );
  const source = useMemo<WebViewSource>(
    () =>
      sourceFromProps || {
        uri: `${
          !WEBVIEW_BASE_URL.startsWith('http://')
            ? `file://${storageRootPath}`
            : ''
        }${WEBVIEW_BASE_URL}#/${page}`,
      },
    [page, sourceFromProps],
  );

  useEffect(() => {
    if (webviewInstanceRef.current) {
      webviewBridgeRef.current = enableWebview(webviewInstanceRef.current);
    }
    return () => webviewBridgeRef.current?.disbale();
  }, []);

  return (
    <>
      <WebView
        // @ts-ignore
        useWebKit
        ref={webviewInstanceRef}
        bounces={false}
        allowFileAccess
        javaScriptEnabled
        allowFileAccessFromFileURLs
        allowingReadAccessToURL={storageRootPath}
        allowUniversalAccessFromFileURLs
        originWhitelist={ORIGIN_WHITELIST}
        source={source}
        mixedContentMode="always"
        mediaPlaybackRequiresUserAction
        onMessage={event => {
          webviewBridgeRef.current?.onMessage?.(event.nativeEvent.data);
        }}
        {...rest}
      />
      {/* <Text>{source.uri}</Text> */}
      {/* <Text selectable>{storageRootPath}</Text> */}
    </>
  );
};

export default Webview;
