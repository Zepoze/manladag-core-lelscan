import { JSDOM } from 'jsdom'
import { mangaLelscan, mangas, url } from './websiteEnv'


export async function getUrlPages(manga:mangaLelscan,chapter:number):Promise<string[]> {
  const { numberPage, dom } = await _getNumberPage(manga,chapter)
  const tabURL:Promise<string>[] = []
  for(let i =1;i<=numberPage;i++) tabURL.push( _getUrlOfPage(i,manga,chapter, i==1 ? dom: undefined))
  return Promise.all(tabURL)
}

export async function _getNumberPage(manga:mangaLelscan,chapter:number): Promise<{numberPage:number,dom:JSDOM}> {
  const dom = await JSDOM.fromURL(url+'/scan-'+manga.keyName+'/'+chapter,{
      includeNodeLocations: true
  })

  const tabEl = new Array<Element>()
  dom.window.document.querySelectorAll('#navigation a').forEach(e => {
      tabEl.push(e)
  })

  const nb = tabEl.map(e=> e.innerHTML).filter(e => parseInt(e)>0).length

  return Promise.resolve({numberPage:nb,dom})
} 

export async function chapterIsAvailable(manga:mangaLelscan,chapter:number) :Promise<boolean> {
  const dom = await JSDOM.fromURL(url+'/scan-'+manga.keyName+'/'+chapter,{
      includeNodeLocations: true
  })
  
  const domChap = dom.window.document.querySelectorAll("#header-image h2 div a span")[2].innerHTML
  
  return Promise.resolve(chapter == parseInt(domChap))
}

export async function getLastChapter(manga:mangaLelscan):Promise<number> {
  try {
    const dom = await JSDOM.fromURL(url+'/lecture-en-ligne-'+manga.keyName,{
      includeNodeLocations: true
    })
    return Promise.resolve(parseInt(dom.window.document.querySelectorAll("#header-image h2 div a span")[2].innerHTML))
  } catch(e) {
    throw e
  }
}

async function _getUrlOfPage(page:number,manga:mangaLelscan,chapter:number ,dom?: JSDOM) {

  const DomPage = dom ? dom : await JSDOM.fromURL(url+'/scan-'+manga.keyName+'/'+chapter+'/'+page)

  const img = DomPage.window.document.querySelector('#image img')
  let pageUrl:string|undefined
  if(img) {
      const src = img.getAttribute('src')
      if(src) pageUrl = src.replace(/(.+\/(\d{1,})\.(png|jpg))(.+)/,'$1')
  }
  if(pageUrl == undefined) throw new Error(`Impossible to get page\'s url n°${page} of ${manga.name} n°${chapter}`)
  return DomPage.window._origin+pageUrl
}

export async function getChaptersAvailable(manga:mangaLelscan,fromChapter: number, toChapter: number): Promise<number[]>{
  try {
    const dom = await JSDOM.fromURL(url+'/lecture-en-ligne-'+manga.keyName,{
        includeNodeLocations: true
    })
    const sortTab = [fromChapter,toChapter].sort((a,b)=> a-b)
    return Promise.resolve(Array.from(dom.window.document.querySelectorAll("#header-image select option")).map((nl)=> parseFloat(nl.innerHTML)).filter(chap => chap >= sortTab[0] &&  chap <= sortTab[1]  ))
  } catch(e) {
    throw e
  }
}
