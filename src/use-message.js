import { useContext } from 'react'

import getMessage, { getLocales } from './get-message'
import MessageContext from './message-context'

export default function useMessage(id, locale) {
  const { locales, messages, pathSep } = useContext(MessageContext)
  const lc = getLocales(locales, locale)
  return getMessage(messages, lc, id, pathSep)
}
