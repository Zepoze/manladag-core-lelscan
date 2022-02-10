import chai from 'chai'
import jsdom from 'jsdom'
import {Lib} from '../lib/index'
import path from 'path'
import fs from 'fs'
var expect = chai.expect
const helperPath = path.join(__dirname,'..','mangas-helper.json')

export default function fetch(this:Mocha.Suite) {
  let i = 1;
  let li;
  const obj:{[k:string]:boolean}= {}
  before(function mangaAdded() {
    this.timeout(15000)
    return jsdom.JSDOM.fromURL(Lib.url).then((dom) => {
      describe('Manga correctly added',function() {
        if(fs.existsSync(helperPath)) fs.unlinkSync(helperPath)
        fs.appendFileSync(helperPath,'{')
        do {
          li = dom.window.document.querySelector(`#main_hot_ul li:nth-child(${i})`);
          if(!li) {
            describe('Mangas installed still available online',function() {
              Object.keys(Lib.mangas).forEach((s,id) => {
                it(s,function(){
                  if(id==0) fs.appendFileSync(helperPath,'\n}')
                  expect(obj[s]).to.equal(true,`${Lib.mangas[s as keyof typeof Lib.mangas].name?? s} does not seem to be available anymore `)
                })
              })
            })
            
            break
          }
          const a = li.children[0];
          
          
          const keyName = new RegExp(/^https:\/\/lelscans.net\/lecture-en-ligne-(.+)\.php$/,'i').exec(a.getAttribute('href')!)![1];
          const title = new RegExp(/^(.+) scan/,'i').exec(a.getAttribute('title')!)![1];
          const ins = i
          obj[keyName]=true
          it(title,function() {
            fs.appendFileSync(helperPath,`${ins != 1 ? ',': ''}\n\t"${keyName}": {\n\t\t"name": "${title}",\n\t\t"keyName": "${keyName}"\n\t}`)
            expect(Lib.mangas[keyName as keyof typeof Lib.mangas]).to.not.equal(undefined, `${title} not added`)
            expect(Lib.mangas[keyName as keyof typeof Lib.mangas]).to.eql({keyName,name:title})
            
          })
          i+=1
        } while(true)
      })
    })
  })
}