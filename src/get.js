const inDebug = ['development', 'local', 'debug'].includes(process.env.NODE_ENV)

function warn (message) {
  inDebug && console.warn(`[@hypefactors/get]: ${message}`)
}

/**
 * Deeply fetch dot notated strings from object.
 * Has fallback if value does not exist
 * @param {String|Array} path - Dot notated string or an array of keys
 * @param {Object} source - Object to traverse
 * @param {*} fallback - Fallback value
 * @return {*}
 */
export default function get (source, path, fallback = '') {
  if (typeof source !== 'object') {
    warn(`Expected an Object/Array in the second argument, got ${typeof source}`)

    return fallback
  }

  try {
    const keys = Array.isArray(path) ? path : path.split('.')

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]

      if (!source || !source.hasOwnProperty(key)) {
        warn(`The "${path}" could not be resolved at key "${key}"`)
        return fallback
      }
      source = source[key]
    }

    return source
  } catch (_) {
    return fallback
  }
}
