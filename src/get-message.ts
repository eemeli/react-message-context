import { MessageContext } from './message-context'
import { Id, MessageObject, MessageValue } from './types'

function getIn(messages: MessageValue | MessageObject, path: string[]) {
  if (messages) {
    for (let i = 0; i < path.length; ++i) {
      if (typeof messages !== 'object') return undefined
      messages = messages[path[i]]
      if (messages === undefined) return undefined
    }
  }
  return messages
}

export function getPath(id: Id, pathSep?: string | null) {
  if (!id) return []
  if (Array.isArray(id)) return id
  return pathSep ? id.split(pathSep) : [id]
}

export function getMessage(
  { locales, messages, onError, pathSep }: MessageContext,
  id: Id,
  locale?: Id
) {
  if (locale != null) locales = Array.isArray(locale) ? locale : [locale]
  const path = getPath(id, pathSep)
  for (let i = 0; i < locales.length; ++i) {
    const lc = locales[i]
    const msg = getIn(messages[lc], path)
    if (msg !== undefined) return msg
  }
  return onError ? onError(path, 'ENOMSG') : undefined
}

export interface MessageGetterOptions {
  baseParams?: any
  locale?: Id
}

export function getMessageGetter(
  context: MessageContext,
  rootId: Id,
  { baseParams, locale }: MessageGetterOptions = {}
) {
  const { pathSep } = context
  const pathPrefix = getPath(rootId, pathSep)
  return function message(id: Id, params: any) {
    const path = pathPrefix.concat(getPath(id, pathSep))
    const msg = getMessage(context, path, locale)
    if (typeof msg !== 'function') return msg
    const msgParams = baseParams
      ? Object.assign({}, baseParams, params)
      : params
    return msg(msgParams)
  }
}
