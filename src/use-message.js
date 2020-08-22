import { useContext } from 'react'
import { getMessage } from './get-message.js'
import { MessageContext } from './message-context.js'

export function useMessage(id, params, locale) {
  const context = useContext(MessageContext)
  const msg = getMessage(context, id, locale)
  return typeof msg === 'function' ? msg(params == null ? {} : params) : msg
}
