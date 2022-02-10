'use strict'
import chai from 'chai'
import {Lib} from '../lib'
import fetch from './fetchAllmangas'
import {requestTimeout} from './env'
var expect = chai.expect


describe('Lelscan interface test', function() {
  it('Should return 17',async function() {
      this.timeout(requestTimeout)
      const result = await Lib.getNumberPageChapter(Lib.mangas["one-piece"],990)
      expect(result).to.equal(17)
  })
  it('should return tab of 17 url',async function() {
      this.timeout(requestTimeout)
      const result = await Lib.getUrlPages(Lib.mangas["one-piece"],990)
      expect(result).to.be.an('array').lengthOf(17)
  })
  it('Should return true',async function() {
      this.timeout(requestTimeout)
      const result = await Lib.chapterIsAvailable(Lib.mangas["one-piece"],990)
      expect(result).to.equal(true)
  })
  it('Should return a last chapter >990',async function() {
      this.timeout(requestTimeout)
      const result = await Lib.getLastChapter(Lib.mangas["one-piece"])
      expect(result).to.be.greaterThan(990)
  })

  it('Chapter available betweesn chap n°1000 - 1035',async function() {
    this.timeout(requestTimeout)
    const tab = await Lib.getChaptersAvailable(Lib.mangas["one-piece"],1000,1035);
    expect(tab.length).eq(37)
  })
  describe('check mangas',fetch.bind(this))
})