import { useContext } from 'react'

import { getMessage } from './get-message'
import MessageContext from './message-context'

export default function useMessage(id, params, locale) {
  const context = useContext(MessageContext)
  const msg = getMessage(context, id, locale)
  if (typeof msg === 'function') return msg(params == null ? {} : params)
  else if (params != null)
    context.debug(`Params given for non-function message: ${id}`)
  return msg
}
