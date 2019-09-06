const requestSolr = require('./request')
const config = require('../config')

const response = requestSolr(config)

if (!config.out) {
  response.then(console.log)
}