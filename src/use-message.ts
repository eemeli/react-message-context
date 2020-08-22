import { useContext } from 'react'
import { getMessage } from './get-message'
import { MessageContext } from './message-context'
import { Id } from './types'

/**
 * A custom React hook providing an entry from the messages object of the current or given locale.
 * The returned value will be `undefined` if not found.
 *
 * If the identified message value is a function, the returned value will be the result of calling it with a single argument `params`, or `{}` if empty.
 * Otherwise the value set in the `MessageProvider` props will be returned directly.
 *
 * @public
 * @param id - The key or key path of the message or message object.
 *   If empty or `[]`, matches the root of the messages object
 * @param params - Argument to use if the identified message is a function
 * @param locale - If set, overrides the current locale precedence as set by parent MessageProviders.
 */
export function useMessage(id: Id, params?: any, locale?: Id) {
  const context = useContext(MessageContext)
  const msg = getMessage(context, id, locale)
  return typeof msg === 'function' ? msg(params == null ? {} : params) : msg
}
