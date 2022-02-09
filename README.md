# @manladag/core-lelscan

[![npm version](https://badge.fury.io/js/@manladag%2Fcore-lelscan.svg)](https://www.npmjs.com/package/@manladag/core-lelscan)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@manladag/core-lelscan/peer/@manladag/core)

[![Build Status](https://app.travis-ci.com/Zepoze/manladag-core-lelscan.svg?branch=main)](https://app.travis-ci.com/Zepoze/manladag-core-lelscan)

# Lelscans's Manladag Core
Library for [Manladag Core](https://github.com/Zepoze/manladag-core#manladags-lib)

# Example 
simple use
~~~bash
$ mkdir my-app && cd my-app
$ npm init
$ npm install @manladag/core-lelscan @manladag/core
$ npm install --save-dev typescript @types/jsdom @types/adm-zip @manladag/core
$ touch tsconfig.json
~~~

tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["ES2015","DOM"],
    "declaration": true,
    "outDir": "./dist",    
}
```


lib/index.ts
~~~typescript
import {ChapterDownloaderFlags, ManladagCore} from '@manladag/core'
import { StartOptions } from '@manladag/core/dist/manladag-namespace'
import {Lib as LelScanLib} from '../lib/index'
import path from 'path'
import fs from 'fs'
const LelscanCore = new ManladagCore(LelScanLib)
const key = "one-piece"

const startOptions:StartOptions = {
  clearFiles: {
    onError:true,
    onFinish:true
  },
  mlag:{
    path:__dirname,
    writeOperation: 'override'
  }
}

LelscanCore.setOnDownloadChapterStartedListener(function({manga,chapter}) {
  console.log(`Download chapter n° ${chapter} ${manga} has started !`)
})
LelscanCore.setOnDownloadChapterFinishedListener(function({manga,chapter}) {
  console.log(`Download chapter n° ${chapter} ${manga} has finished !`)
  fs.rmdirSync(path.join(__dirname,'d'+chapter))
})

LelscanCore.getLastChapter(key).then((lastChap) => {
  LelscanCore.getChaptersAvailable(key,lastChap -1,lastChap).then((tab)=> {
    tab.forEach((chap)=> {
      const downloadDir = path.join(__dirname,'d'+chap)
      if(!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir)
      LelscanCore.createChapterDownloader(key,chap,downloadDir, ChapterDownloaderFlags.INIT.AUTO_START, startOptions)
    })
  })
})

~~~