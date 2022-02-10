import { Manladag } from '@manladag/core'
import { getUrlPages,getLastChapter,getChaptersAvailable,chapterIsAvailable,_getNumberPage} from './functions'
import { LelscanMangaKeys, mangaLelscan, mangas, url, website } from './websiteEnv'

export {mangaLelscan} from './websiteEnv'

export const Lib:Manladag.LibCoreExtended<"getChaptersAvailable",mangaLelscan, LelscanMangaKeys> = {
  mangas,
  website,
  url,
  getNumberPageChapter:async (manga:mangaLelscan,chapter) => (await _getNumberPage(manga,chapter)).numberPage,
  getUrlPages:getUrlPages,
  chapterIsAvailable:chapterIsAvailable,
  getLastChapter:getLastChapter,
  getChaptersAvailable: getChaptersAvailable
}

