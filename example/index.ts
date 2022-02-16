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
