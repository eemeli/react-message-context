import { useContext } from 'react'

import getMessage, { getPath } from './get-message'
import MessageContext from './message-context'

/**
 * @param {(null|string|string[])} rootId
 * @param {Object} [opt]
 * @param {Object} [opt.baseParams]
 * @param {(string|string[])} [opt.locale]
 */
export default function useMessageGetter(rootId, { baseParams, locale } = {}) {
  const context = useContext(MessageContext)
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
