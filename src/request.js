const fetch = require('node-fetch')
const queryString = require('query-string')


function buildQueryString(config) {
  const { queryFields, queryTerm, start, rows, parentHint } = config

  const q = queryFields.map(field => {
    return `({!parent which=${parentHint.field}:${parentHint.value}}${field}:${queryTerm} OR ${field}:${queryTerm})`
  }).join(' OR ')

  return {
    q: q,
    fl: '*,[child]',
    hl: 'on',
    'hl.fl': '*',
    start: start,
    rows: rows,
    group: true,
    'group.field': '_root_',
    'group.limit': 1000
  }
}

function createQueryUrl(endpoint, query) {
  return `${endpoint}/?${queryString.stringify(query)}`
}

module.exports = function(config) {
  const query = buildQueryString(config)
  const url = createQueryUrl(config.endpoint, query)
  if (config.logQueryUrl) {
    console.log(url)
  }
  return fetch(url).then(res => res.json())
}