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

/**
 * @private
 * @param {object} messages
 * @param {string[]} locales
 * @param {string|string[]} [id]
 * @returns {any}
 */
export default (messages, locales, id) => {
  if (!messages) return undefined
  if (locales.length === 0) {
    const path = Array.isArray(id) ? id : id ? [id] : []
    return getIn(messages, path)
  }
  const path = id ? [''].concat(id) : ['']
  for (let i = 0; i < locales.length; ++i) {
    path[0] = locales[i]
    const msg = getIn(messages, path)
    if (typeof msg !== 'undefined') return msg
  }
  return undefined
}

