import React, { type FC, useMemo, useRef, useEffect, useState } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import type { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { WebView, WebViewProps } from 'react-native-webview';
import { WebRouteName } from '@/constants';
import { enableWebview, apis } from '@race-lap/app-helper/dist/native';
// import { Text } from '@/components';

declare const WEBVIEW_BASE_URL: string;

interface Props extends WebViewProps {
  style?: StyleProp<ViewStyle>;
  /** 页面名称 */
  page: `${WebRouteName}${string}`;
}

const ORIGIN_WHITELIST = ['http://', 'https://', 'file://'];

export const Webview: FC<Props> = props => {
  const { page, source: sourceFromProps, ...rest } = props;
  const [allowingReadAccessToURL, setAllowingReadAccessToURL] = useState('');
  const webviewInstanceRef = useRef<WebView>(null);
  const webviewBridgeRef = useRef<ReturnType<typeof enableWebview> | null>(
    null,
  );
  const source = useMemo<WebViewSource>(
    () =>
      sourceFromProps || {
        uri: `${
          !WEBVIEW_BASE_URL.startsWith('http://')
            ? `file://${allowingReadAccessToURL}`
            : ''
        }${WEBVIEW_BASE_URL}#/${page}`,
      },
    [allowingReadAccessToURL, page, sourceFromProps],
  );

  useEffect(() => {
    if (!allowingReadAccessToURL) {
      apis.path.getInfo().then(res => {
        setAllowingReadAccessToURL(res.data!.root);
      });
    }
    if (webviewInstanceRef.current) {
      webviewBridgeRef.current = enableWebview(webviewInstanceRef.current);
    }
    return () => webviewBridgeRef.current?.disbale();
  }, [allowingReadAccessToURL]);

  return (
    <>
      {allowingReadAccessToURL ? (
        <WebView
          // @ts-ignore
          useWebKit
          ref={webviewInstanceRef}
          bounces={false}
          allowFileAccess
          javaScriptEnabled
          allowFileAccessFromFileURLs
          allowingReadAccessToURL={allowingReadAccessToURL}
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
      ) : (
        <View style={props.style} />
      )}
      {/* <Text>{source.uri}</Text>
      <Text>{allowingReadAccessToURL}</Text> */}
      {/* <Text selectable>{storageRootPath}</Text> */}
    </>
  );
};

export default Webview;
