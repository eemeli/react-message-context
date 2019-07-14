import { useContext } from 'react'

import MessageContext from './message-context'
import getMessage, { getPath } from './get-message'

/**
 *
 * @param {Object} [opt]
 * @param {(string|string[])} [opt.id]
 * @param {Object} [opt.params]
 * @param {(string|string[])} [opt.locales]
 */
export default function useMessageGetter({
  id: rootId,
  params: baseParams,
  locales
} = {}) {
  const { locales: lc0, messages, pathSep } = useContext(MessageContext)
  if (locales == null) locales = lc0
  else if (!Array.isArray(locales)) locales = [locales]
  const pathPrefix = getPath(rootId, pathSep)
  return function message(id, params) {
    const path = pathPrefix.concat(getPath(id, pathSep))
    const msg = getMessage(messages, locales, path)
    if (typeof msg !== 'function') return msg
    const msgParams = baseParams
      ? Object.assign({}, baseParams, params)
      : params
    return msg(msgParams)
  }
}
