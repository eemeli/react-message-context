import { useContext } from 'react'
import { getMessageGetter, MessageGetterOptions } from './get-message'
import { MessageContext } from './message-context'
import { Id } from './types'

export function useMessageGetter(rootId: Id, opt?: MessageGetterOptions) {
  const context = useContext(MessageContext)
  return getMessageGetter(context, rootId, opt)
}
