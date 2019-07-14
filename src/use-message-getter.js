import { useContext } from 'react'

import MessageContext from './message-context'
import getMessage, { getPath } from './get-message'

/**
 * @param {(null|string|string[])} rootId
 * @param {Object} [opt]
 * @param {Object} [opt.baseParams]
 * @param {(string|string[])} [opt.locale]
 */
export default function useMessageGetter(rootId, { baseParams, locale } = {}) {
  const { locales, messages, pathSep } = useContext(MessageContext)
  const lc = Array.isArray(locale)
    ? locale
    : locale != null
    ? [locale]
    : locales
  const pathPrefix = getPath(rootId, pathSep)
  return function message(id, params) {
    const path = pathPrefix.concat(getPath(id, pathSep))
    const msg = getMessage(messages, lc, path)
    if (typeof msg !== 'function') return msg
    const msgParams = baseParams
      ? Object.assign({}, baseParams, params)
      : params
    return msg(msgParams)
  }
}
