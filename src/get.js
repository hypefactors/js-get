const idDev = process.env.NODE_ENV === 'development'

function warn (message) {
  idDev && console.warn(`[@hypefactors/get]: ${message}`)
}

/**
 * Deeply fetch dot notated strings from object.
 * Has fallback if value does not exist
 * @param {String} path - Dot notated string
 * @param {Object} source - Object to traverse
 * @param {*} fallback - Fallback value
 * @return {*}
 */
export default function get (source, path, fallback = '') {
  if (typeof path !== 'string') {
    warn(`Expected a string in the first argument, got ${typeof path}`)

    return fallback
  }

  if (typeof source !== 'object') {
    warn(`Expected an Object/Array in the second argument, got ${typeof source}`)
    return fallback
  }

  try {
    return path.trim().replace(/\[(\d+)]/g, '.$1').split('.').reduce((obj, current) => {
      if (!obj[current]) throw new Error(`The "${path}" could not be resolved in ${JSON.stringify(obj)} at key "${current}"`)
      return obj[current]
    }, source)
  } catch (err) {
    warn(err)
    return fallback
  }
}
