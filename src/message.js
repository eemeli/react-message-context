import { useContext } from 'react'
import { getMessage } from './get-message.js'
import { MessageContext } from './message-context.js'

export function Message({
  children,
  id,
  locale,
  onError,
  params,
  ...msgParams
}) {
  const context = useContext(MessageContext)
  const msg = getMessage(context, id, locale)
  if (typeof children === 'function') return children(msg)
  switch (typeof msg) {
    case 'function':
      return msg(Object.assign(msgParams, params))
    case 'boolean':
    case 'number':
    case 'string':
      return String(msg)
    default:
      let res = onError && onError(id, typeof msg)
      if (!res) {
        if (children) return children
        const { pathSep } = context
        res = pathSep && Array.isArray(id) ? id.join(pathSep) : String(id)
      }
      return res
  }
}
