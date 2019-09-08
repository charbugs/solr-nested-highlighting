import path from 'path'
import fs from 'fs'
import requestSolr from './query'
import merge from './merge'
import config from '../config.json'
import benchmark from './benchmark';


async function writeToOutDir(data: any, fname: string) {
  await fs.promises.mkdir(config.outDir, { recursive: true })
  return await fs.promises.writeFile(
    path.join(config.outDir, fname),
    JSON.stringify(data, null, 2),
  )
}

requestSolr(config)
  .then(solrResponse => {
    writeToOutDir(solrResponse, 'response.json')
    writeToOutDir(merge(solrResponse), 'merged.json')
  })