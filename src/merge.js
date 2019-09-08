import isArray from 'lodash/fp/isArray'
import isObject from 'lodash/fp/isObject'
import config from '../config.json'


function walk(value, update) {
  const updated = update(value)
  if (updated instanceof Array) {
    return updated.map(item => walk(item, update))
  } else if (typeof updated === 'object') {
    return Object.keys(updated).reduce((acc, key) => {
      return { ...acc, [key]: walk(updated[key], update)}
    }, {})
  }
  return value
}

function mergeHighlighting(value, highlighting) {
  if (isObject(value) && highlighting[value.id]) {
    return Object.keys(highlighting[value.id]).reduce((acc, key) => {
      return { ...acc, [key]: highlighting[value.id][key][0] }
    }, value)
  }
  return value
}

function filterParentDocs(groups) {
  return groups.map((group) => {
    return group.doclist.docs.find((doc) => {
      return doc[config.parentHint.field] === config.parentHint.value
    })
  })
}

export default function(solrGroupResponse) {
  const { groups } = solrGroupResponse.grouped._root_
  const { highlighting } = solrGroupResponse
  return filterParentDocs(groups).map(doc => {
    return walk(doc, value => mergeHighlighting(value, highlighting))  
  })
}