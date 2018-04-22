
// Model benchmark run (with warn method call commented out)
//
// Lodash#get x 1,354,752 ops/sec ±2.06% (82 runs sampled)
// Hypefactors#js-get x 1,636,082 ops/sec ±0.89% (86 runs sampled)

const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const lodashGet = require('lodash/get')
const hypefactorsGet = require('../../dist/get.common')

const profile = {
  age: 15,
  name: {
    first: 'John'
  },
  activities: ['sports', { name: 'fishing', frequency: 'weekly' }]
}

suite
  .add('Lodash#get', function () {
    lodashGet(profile, 'age')
    lodashGet(profile, 'name.first')
    lodashGet(profile, 'activities.0')
    lodashGet(profile, 'activities.1.frequency')
    lodashGet(profile, 'activities.1.frequency')
    lodashGet(profile, 'foobar')
  })
  .add('Hypefactors#js-get', function () {
    hypefactorsGet(profile, 'age')
    hypefactorsGet(profile, 'name.first')
    hypefactorsGet(profile, 'activities.0')
    hypefactorsGet(profile, 'activities.1.frequency')
    hypefactorsGet(profile, 'foobar')
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Done!')
  })
  .run({ async: true })
