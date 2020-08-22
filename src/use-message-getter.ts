import { useContext } from 'react'
import { getMessageGetter, MessageGetterOptions } from './get-message'
import { MessageContext } from './message-context'
import { Id } from './types'

/**
 * A custom [React hook] providing a message getter function, which may have a preset root id path, locale, and/or base parameters for message functions.
 *
 * The returned function takes two parameters `(msgId, msgParams)`, which will extend any values set by the hook's arguments.
 *
 * @public
 * @param rootId - The key or key path of the message or message object.
 *   If empty or `[]`, matches the root of the messages object
 * @param options - If `baseParams` is set, message function parameters will be assumed to always be an object, with these values initially set.
 *   `locale` overrides the current locale precedence as set by parent MessageProviders.
 */
export function useMessageGetter(rootId: Id, opt?: MessageGetterOptions) {
  const context = useContext(MessageContext)
  return getMessageGetter(context, rootId, opt)
}
