import { useContext } from 'react'

import getMessage from './get-message'
import MessageContext from './message-context'

export default function useMessage(id, locale) {
  const context = useContext(MessageContext)
  return getMessage(context, id, locale)
}
