import microtime from 'microtime'

export default function(fn) {
  const start = microtime.now()
  const result = fn()
  const stop = microtime.now()
  console.log((stop - start) / 1000)
  return result
}