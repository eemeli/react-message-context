import { useContext } from 'react'
import { getMessage, getPath } from './get-message'
import { MessageContext } from './message-context'
import { Id } from './types'

export interface MessageProps {
  children: any
  id: Id
  locale?: Id
  params?: any
  [msgParamKey: string]: any
}

// Just using { foo, ...bar } adds a polyfill with a boilerplate copyright
// statement that would add 50% to the minified size of the whole library.
function rest(props: { [key: string]: any }, exclude: string[]) {
  const t: typeof props = {}
  for (const k of Object.keys(props)) if (!exclude.includes(k)) t[k] = props[k]
  return t
}

export function Message(props: MessageProps) {
  const { children, id, locale, params } = props
  const msgParams = rest(props, ['children', 'id', 'locale', 'params'])
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
        return context.onError ? context.onError(getPath(id), 'EBADMSG') : null
  }
  return msg || null
}
