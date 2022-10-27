# `@race-lap/app-helper`

> Common Utils/Tools both for [app-rn](../app-rn) and [app-web](../app-web).

## Install

```bash
npm i
```

## Dev

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Directory Trees

```tree
src
 ├── constants.ts
 ├── index.ts           # Common Utils Entry
 ├── native             # Utils Entry For Native
 ├── types.ts           # Common Types File
 ├── utils
 └── web                # Utils Entry For Web
```

## Usage

### Common

```ts
import { utils } from '@race-lap/app-helper';

// ...
```

### Native

Native Apis has to be inited brefore to keep dep clean.

```ts
import RNFS from 'react-native-fs';
import { initDBTask, commonPermissionsRequestReady } from './tasks';

initialize({ commonPermissionsRequestReady, initDBTask, fs: RNFS });
```

Then you can use it as common.

```ts
import { apis } from '@race-lap/app-helper/dist/native';
```

### Web

Native Apis can be used by Webview Components with Message Bridge.

So you have to init message bridge in native side first.

```tsx
import React, { type FC, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';

export const MyWebview: FC = () => {
  const webviewBridgeRef = useRef(null);
  const webviewInstanceRef = useRef(null);

  useEffect(() => {
    if (webviewInstanceRef.current) {
      webviewBridgeRef.current = enableWebview(webviewInstanceRef.current);
    }
    return () => webviewBridgeRef.current?.disbale();
  }, [allowingReadAccessToURL]);

  return (
    <>
      <WebView
        ref={webviewInstanceRef}
        {/* ... your custom props here */}
        onMessage={event => {
          webviewBridgeRef.current?.onMessage?.(event.nativeEvent.data);
        }}
      />
    </>
  )
}
```

Then you can use it as common.

```ts
// This apis equals the apis in 'dist/native'
import { apis } from '@race-lap/app-helper/dist/web';
```
