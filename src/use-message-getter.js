import { useContext } from 'react'

import { getMessageGetter } from './get-message'
import MessageContext from './message-context'

export default function useMessageGetter(rootId, opt) {
  const context = useContext(MessageContext)
  return getMessageGetter(context, rootId, opt)
}
