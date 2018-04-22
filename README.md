# JS-Get
> A simple and lightweight dot-notation based property resolver.

[![Build Status](https://travis-ci.org/hypefactors/js-get.svg?branch=master)](https://travis-ci.org/hypefactors/js-get)
[![GitHub release](https://img.shields.io/github/release/hypefactors/js-get.svg)](https://github.com/hypefactors/js-get)
[![npm](https://img.shields.io/npm/dt/@hypefactors/js-get.svg)](https://www.npmjs.com/package/@hypefactors/js-get)


## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Why JS-Get

- Fast
- Lightweight, well-documented source code bundled as CJS, EM and UMD
- 100% test coverage
- Supports objects and arrays

## Installation
To install JS-Get, just run the following:

```console
$ npm install @hypefactors/js-get
```

> Note: This package was only tested on Node.js versions 9 and 8 or higher.

## Usage

Import the module via `import get from '@hypefactors/js-get'` or if you're not using a bundler use require instead (Node environment).

Given that there is an object with the following structure:
```javascript
const profile = {
  age: 15,
  name: {
    first: 'John'
  },
  activities: [
    'sports',
    {
      name: 'fishing',
      frequency: 'weekly'
    }
  ]
}
```

The properties can be accessed using dot notation:
```javascript
get(profile, 'age') // 15
get(profile, 'name.first') // 'John'
get(profile, 'activities.0') // 'sports'
get(profile, 'activities.1.frequency') // 'weekly'
get(profile, 'foobar', 'not-found') // 'not-found'
```

Or using array syntax:
```javascript
get(profile, ['age']) // 15
get(profile, ['name', 'first']) // 'John'
get(profile, ['activities', '0']) // 'sports'
get(profile, ['activities', '1', 'frequency']) // 'weekly'
get(profile, ['foobar'], 'not-found') // 'not-found'
```

## Contributing

Thanks for your interest in JS-Get! If you'd like to contribute, please read our [contribution guide](contribution.md).

## License

JS-Get is open-sourced software licensed under the ISC license. If you'd like to read the license agreement, click [here](LICENSE).
