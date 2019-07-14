function getIn(messages, path) {
  if (!messages) return undefined
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

export function getPath(id, pathSep) {
  if (!id) return []
  if (Array.isArray(id)) return id
  return pathSep ? id.split(pathSep) : [id]
}

/**
 * @private
 * @param {Context} context
 * @param {string|string[]} id
 * @param {string|string[]} [locale]
 * @returns {any}
 */
export default function getMessage({ locales, messages, pathSep }, id, locale) {
  if (locale != null) locales = Array.isArray(locale) ? locale : [locale]
  const path = getPath(id, pathSep)
  for (const lc of locales) {
    const msg = getIn(messages[lc], path)
    if (msg !== undefined) return msg
  }
  return undefined
}
