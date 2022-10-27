# app-rn

## Install

```bash
# install deps
npm install
```

## Dev

### Install Native Container

Before you exec `npm run ios/android`, ensure that you already build both [app-helper](../app-helper) and [app-web](../app-web/).

#### IOS

```bash
# Install in simulator
npm run ios

# install in device
npm run ios -- -device "xxxxx"
```

#### Android

```bash
# Install in simulator
npm run android

# install in device
npm run android -- --deviceId "xxxxx"
```

#### Start metro server

```bash
# start metro
npm run start
```

## Build & Publish

To understand the whole of CI/CD process，see [Github Actions: Android Build](../../android_build.yml) & [Github Actions: Android Build](../../ios_build.yml) & [Github Actions: React Native Bundle Build](../../codepush.yml).

Using [Github Actions CI Manually](https://docs.github.com/cn/actions/managing-workflow-runs/manually-running-a-workflow).

+ [IOS Native](https://github.com/angrycans/RaceLap2/actions/workflows/ios_build.yml)
+ [Android Native](https://github.com/angrycans/RaceLap2/actions/workflows/android_build.yml)
+ [React Native Bundle](https://github.com/angrycans/RaceLap2/actions/workflows/codepush.yml)
