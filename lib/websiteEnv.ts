import { Manladag } from "@manladag/core"

export const url:string = 'http://lelscan.net'

export interface mangaLelscan extends Manladag.LibManga {
  keyName: string
}

export const website = 'LelScan'

export const mangas = {
  'one-piece':{
      name : 'One Piece',
      keyName: 'one-piece',
  },
  'dr-stone':{
      name: 'Dr Stone',
      keyName: 'dr-stone'
  },
  'the-seven-deadly-sins':{
      name: 'The Seven Deadly Sins',
      keyName: 'the-seven-deadly-sins'
  },
  'one-punch-man': {
      name: 'One Punch Man',
      keyName: 'one-punch-man'
  },
  'my-hero-academia': {
      name: 'My Hero Academia',
      keyName: 'my-hero-academia'
  },
  'black-clover': {
      name: 'Black Clover',
      keyName: 'black-clover'
  },
  'hajime-no-ippo': {
      name: 'Hajime No Ippo',
      keyName: 'hajime-no-ippo'
  },
  'dragon-ball-super': {
      name: 'Dragon Ball Super',
      keyName: 'dragon-ball-super'
  },
  'd-gray-man': {
      name: 'D Gray Man',
      keyName: 'd-gray-man'
  },
  'shingeki-no-kyojin': {
      name: 'Shingeki No Kyojin',
      keyName: 'shingeki-no-kyojin'
  },
  'tokyo-shinobi-squad': {
      name: 'Tokyo Shinobi Squad',
      keyName: 'tokyo-shinobi-squad'
  },
  'boruto': {
      name: 'Boruto',
      keyName: 'boruto'
  },
  'hunter-x-hunter': {
      name: 'Hunter X Hunter',
      keyName: 'hunter-x-hunter'
  },
  'gintama': {
      name: 'Gintama',
      keyName: 'gintama'
  },
  'tokyo-ghoul-re': {
      name: 'Tokyo Ghoul Re',
      keyName: 'tokyo-ghoul-re'
  },
  'magi': {
      name: 'Magi',
      keyName: 'magi'
  },
  'fairy-tail': {
      name: 'Fairy Tail',
      keyName: 'fairy-tail'
  },
  'gantz': {
      name: 'Gantz',
      keyName: 'gantz'
  },
  'toriko': {
      name: 'Toriko',
      keyName: 'toriko'
  },
  'bleach': {
      name: 'Bleach',
      keyName: 'bleach'
  },
  'assassination-classroom': {
      name: 'Assassination Classroom',
      keyName: 'assassination-classroom'
  },
  'naruto': {
      name: 'Naruto',
      keyName: 'naruto'
  },
  'the-breaker-new-waves': {
      name: 'The Breaker New Waves',
      keyName: 'the-breaker-new-waves'
  },
  'naruto-gaiden': {
      name: 'Naruto Gaiden',
      keyName: 'naruto-gaiden'
  },
  'soul-eater': {
      name: 'Soul Eater',
      keyName: 'soul-eater'
  },
  'beelzebub': {
      name: 'Beelzebub',
      keyName: 'beelzebub'
  },
  'solo-leveling': {
      name: 'Solo Leveling',
      keyName: 'solo-leveling'
  },
  'tokyo-revengers': {
      name: 'Tokyo Revengers',
      keyName: 'tokyo-revengers'
  },
  "fire-force": {
      "name": "Fire Force",
      "keyName": "fire-force"
  },
  "four-knights-of-the-apocalypse": {
      "name": "Four Knights Of The Apocalypse",
      "keyName": "four-knights-of-the-apocalypse"
  },
  "kingdom": {
      "name": "Kingdom",
      "keyName": "kingdom"
  },
  "blue-lock": {
      "name": "Blue Lock",
      "keyName": "blue-lock"
  },
  "kaiju-no-8": {
      "name": "Kaiju No 8",
      "keyName": "kaiju-no-8"
  },
  "juujika-no-rokunin": {
      "name": "Juujika No Rokunin",
      "keyName": "juujika-no-rokunin"
  },
} as const

export type LelscanMangaKeys = keyof typeof mangas