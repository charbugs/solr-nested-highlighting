import fetch from 'node-fetch'
import queryString from 'query-string'


function buildQueryString(config: any) {
  const { queryFields, queryTerm, start, rows, parentHint } = config

  const q = queryFields.map((field: any) => {
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

function createQueryUrl(endpoint: any, query: any) {
  return `${endpoint}?${queryString.stringify(query)}`
}

export default async function(config: any) {
  const query = buildQueryString(config)
  const url = createQueryUrl(config.endpoint, query)
  if (config.logQueryUrl) {
    console.log(url)
  }
  const res = await fetch(url);
  return await res.json();
}