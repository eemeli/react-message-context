const getIn = (messages, path) => {
  if (typeof messages.getIn === 'function') {
    return messages.getIn(path)
  } else {
    let msg = messages
    for (let i = 0; i < path.length; ++i) {
      msg = msg[path[i]]
      if (typeof msg === 'undefined') return undefined
    }
    return msg
  }
}

const getPath = (id, pathSep) => {
  if (!id) return []
  if (Array.isArray(id)) return id
  return pathSep ? id.split(pathSep) : [id]
}

/**
 * @private
 * @param {object} messages
 * @param {string[]} locales
 * @param {string|string[]} [id]
 * @param {string} [pathSep]
 * @returns {any}
 */
export default (messages, locales, id, pathSep) => {
  if (!messages) return undefined
  let path = getPath(id, pathSep)
  if (locales.length === 0) return getIn(messages, path)
  path = [null].concat(path)
  for (let i = 0; i < locales.length; ++i) {
    path[0] = locales[i]
    const msg = getIn(messages, path)
    if (typeof msg !== 'undefined') return msg
  }
  return undefined
}

