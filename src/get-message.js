const getIn = (data, path) => {
  if (typeof data.getIn === 'function') {
    return data.getIn(path)
  } else {
    let msg = data
    for (let i = 0; i < path.length; ++i) {
      msg = msg[path[i]]
      if (typeof msg === 'undefined') return undefined
    }
    return msg
  }
}

/**
 * @private
 * @param {object} data
 * @param {string[]} locales
 * @param {string|string[]} [id]
 * @returns {any}
 */
export default (data, locales, id) => {
  if (!data) return undefined
  if (locales.length === 0) {
    const path = Array.isArray(id) ? id : id ? [id] : []
    return getIn(data, path)
  }
  const path = id ? [''].concat(id) : ['']
  for (let i = 0; i < locales.length; ++i) {
    path[0] = locales[i]
    const msg = getIn(data, path)
    if (typeof msg !== 'undefined') return msg
  }
  return undefined
}

