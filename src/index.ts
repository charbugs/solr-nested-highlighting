import requestSolr from './request'
import config from '../config.json'

const response = requestSolr(config)

if (!config.out) {
  response.then(console.log)
}