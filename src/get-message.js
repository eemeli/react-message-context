function getIn(messages, path) {
  if (!messages) return undefined
  let msg = messages
  for (let i = 0; i < path.length; ++i) {
    msg = msg[path[i]]
    if (msg === undefined) return undefined
  }
  return msg
}

function getPath(id, pathSep) {
  if (!id) return []
  if (Array.isArray(id)) return id
  return pathSep ? id.split(pathSep) : [id]
}

export function getMessage({ locales, messages, pathSep }, id, locale) {
  if (locale != null) locales = Array.isArray(locale) ? locale : [locale]
  const path = getPath(id, pathSep)
  for (let i = 0; i < locales.length; ++i) {
    const lc = locales[i]
    const msg = getIn(messages[lc], path)
    if (msg !== undefined) return msg
  }
  return undefined
}

export function getMessageGetter(context, rootId, { baseParams, locale } = {}) {
  const { pathSep } = context
  const pathPrefix = getPath(rootId, pathSep)
  return function message(id, params) {
    const path = pathPrefix.concat(getPath(id, pathSep))
    const msg = getMessage(context, path, locale)
    if (typeof msg !== 'function') return msg
    const msgParams = baseParams
      ? Object.assign({}, baseParams, params)
      : params
    return msg(msgParams)
  }
}
