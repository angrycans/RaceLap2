# RaceLap

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Install

```bash
# install root deps
npm install

# install packages deps
npx lerna bootstrap
```

## Dev

```bash
npx lerna run start --stream
```

## Publish

Using [Github Actions CI Manually](https://docs.github.com/cn/actions/managing-workflow-runs/manually-running-a-workflow).

+ [IOS Native](https://github.com/angrycans/RaceLap2/actions/workflows/ios_build.yml)
+ [Android Native](https://github.com/angrycans/RaceLap2/actions/workflows/android_build.yml)
+ [React Native Bundle](https://github.com/angrycans/RaceLap2/actions/workflows/codepush.yml)
+ [Web](https://github.com/angrycans/RaceLap2/actions/workflows/web_build.yml)

## Packages Tree

+ [app-rn](./packages/app-rn/README.MD)
+ [app-web](./packages/app-web/README.MD)

