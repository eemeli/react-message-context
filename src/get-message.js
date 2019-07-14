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

export function getLocales(ctxLocales, argLocale) {
  return Array.isArray(argLocale)
    ? argLocale
    : argLocale != null
    ? [argLocale]
    : ctxLocales
}

export function getPath(id, pathSep) {
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
export default function getMessage(messages, locales, id, pathSep) {
  const path = getPath(id, pathSep)
  for (const lc of locales) {
    const msg = getIn(messages[lc], path)
    if (typeof msg !== 'undefined') return msg
  }
  return undefined
}
