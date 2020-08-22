import { useContext } from 'react'
import { getMessage } from './get-message'
import { MessageContext } from './message-context'
import { Id } from './types'

export function useMessage(id: Id, params?: any, locale?: Id) {
  const context = useContext(MessageContext)
  const msg = getMessage(context, id, locale)
  return typeof msg === 'function' ? msg(params == null ? {} : params) : msg
}
