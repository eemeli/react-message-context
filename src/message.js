import { useContext } from 'react'
import { getMessage, getPath } from './get-message.js'
import { MessageContext } from './message-context.js'

export function Message({ children, id, locale, params, ...msgParams }) {
  let context = useContext(MessageContext)
  let fallback = false
  if (children && typeof children !== 'function')
    context = Object.assign({}, context, { onError: () => (fallback = true) })
  const msg = getMessage(context, id, locale)
  if (fallback) return children
  if (typeof children === 'function') return children(msg)
  switch (typeof msg) {
    case 'function':
      return msg(Object.assign(msgParams, params))
    case 'boolean':
      return String(msg)
    case 'object':
      if (msg && !Array.isArray(msg))
        return context.onError(getPath(id), 'EBADMSG')
  }
  return msg
}
