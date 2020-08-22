import { createElement, useContext, useMemo } from 'react'
import { MessageContext, defaultValue } from './message-context'
import { MessageError, ErrorCode, errorMessages } from './message-error'
import { MessageObject, MergeMessages } from './types'

export interface MessageProviderProps {
  children: any
  messages: MessageObject
  context?: MessageContext
  debug?: 'error' | 'warn' | ((msg: string) => any)
  locale?: string
  merge?: MergeMessages
  onError?: 'error' | 'silent' | 'warn' | ((error: MessageError) => any)
  pathSep?: string
}

function getOnError(
  parent: MessageContext,
  pathSep: string | null,
  onError: MessageProviderProps['onError'],
  debug: MessageProviderProps['debug']
) {
  const asId = (path: string[]) => path.join(pathSep || ',')
  function msgError(path: string[], code: ErrorCode) {
    throw new MessageError(path, code, asId)
  }
  function msgWarning(path: string[], code: ErrorCode) {
    console.warn(errorMessages[code], path)
    return asId(path)
  }

  if (onError === undefined) {
    // debug is deprecated, will be removed later
    if (typeof debug === 'function')
      return (path: string[], code: ErrorCode) =>
        debug(`${errorMessages[code]}: ${asId(path)}`)
    onError = debug
  }

  switch (onError) {
    case 'silent':
      return asId
    case 'error':
      return msgError
    case 'warn':
      return msgWarning
    default:
      if (typeof onError === 'function') {
        const _onError = onError
        return (path: string[], code: ErrorCode) =>
          _onError(new MessageError(path, code, asId))
      }
      return parent.onError || msgWarning
  }
}

function getLocales({ locales }: MessageContext, locale: string) {
  const fallback = locales.filter(fb => fb !== locale)
  return [locale].concat(fallback)
}

function getMessages(
  { merge, messages }: MessageContext,
  locale: string,
  lcMessages: MessageObject
) {
  const res = Object.assign({}, messages)
  const prev = res[locale]
  res[locale] = prev ? merge({}, prev, lcMessages) : lcMessages
  return res
}

function getPathSep(context: MessageContext, pathSep?: string | null) {
  return pathSep === null || typeof pathSep === 'string'
    ? pathSep
    : context.pathSep
}

export function MessageProvider({
  children,
  context: propContext,
  debug,
  locale = '',
  merge,
  messages,
  onError,
  pathSep
}: MessageProviderProps) {
  let parent = useContext(MessageContext)
  if (propContext) parent = propContext
  else if (propContext === null) parent = defaultValue
  const value = useMemo(() => {
    const ps = getPathSep(parent, pathSep)
    return {
      locales: getLocales(parent, locale),
      merge: merge || parent.merge,
      messages: getMessages(parent, locale, messages),
      onError: getOnError(parent, ps, onError, debug),
      pathSep: ps
    }
  }, [parent, locale, merge, messages, pathSep])
  return createElement(MessageContext.Provider, { value }, children)
}
