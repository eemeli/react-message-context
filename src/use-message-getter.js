import { useContext } from 'react'
import { getMessageGetter } from './get-message.js'
import { MessageContext } from './message-context.js'

export function useMessageGetter(rootId, opt) {
  const context = useContext(MessageContext)
  return getMessageGetter(context, rootId, opt)
}
