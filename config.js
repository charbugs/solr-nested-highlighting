module.exports = {
  queryTerm: 'Augustinus',
  start: 0,
  rows: 10,
  endpoint: 'http://b-dev1054.pk.de:8983/solr/hsp/select',
  out: '',
  logQueryUrl: true,
  parentHint: {
    field: 'contentTyp',
    value: 'Kulturobjektdokument'
  },
  queryFields: [
    'titel'
  ],
}