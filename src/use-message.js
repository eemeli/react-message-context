import { useContext } from 'react'

import { getMessage } from './get-message'
import MessageContext from './message-context'

export default function useMessage(id, params, locale) {
  const context = useContext(MessageContext)
  const msg = getMessage(context, id, locale)
  return typeof msg === 'function' && params != null ? msg(params) : msg
}
