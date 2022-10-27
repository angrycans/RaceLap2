# app-web

## Install

```bash
npm install
```

## Dev

```bash
# start dev server on default port: 10086
npm run start
```

## Local Build

Before you exec `npm run ios/android`, ensure that you already build [app-helper](../app-helper).

```bash
npm run build
```

## Build & Publish

To understand the whole of CI/CD process，see [Github Actions: Web Build](../../web_build.yml).

+ Using [Github Actions CI Manually](https://docs.github.com/cn/actions/managing-workflow-runs/manually-running-a-workflow).

+ [Web Build](https://github.com/angrycans/RaceLap2/actions/workflows/web_build.yml)
