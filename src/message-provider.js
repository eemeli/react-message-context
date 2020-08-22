import React, { useContext, useMemo } from 'react'
import { MessageContext, defaultValue } from './message-context.js'
import { MessageError, errorMessages } from './message-error.js'

function getOnError(parent, pathSep, onError, debug) {
  const asId = path => path.join(pathSep || ',')
  function msgError(path, code) {
    throw new MessageError(path, code, asId)
  }
  function msgWarning(path, code) {
    console.warn(errorMessages[code], path)
    return asId(path)
  }

  if (onError === undefined) {
    // debug is deprecated, will be removed later
    if (typeof debug === 'function')
      return (path, code) => debug(`${errorMessages[code]}: ${asId(path)}`)
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
      return typeof onError === 'function'
        ? (path, code) => onError(new MessageError(path, code, asId))
        : parent.onError || msgWarning
  }
}

function getLocales({ locales }, locale) {
  const fallback = locales.filter(fb => fb !== locale)
  return [locale].concat(fallback)
}

function getMessages({ merge, messages }, locale, lcMessages) {
  const res = Object.assign({}, messages)
  const prev = res[locale]
  res[locale] = prev ? merge({}, prev, lcMessages) : lcMessages
  return res
}

function getPathSep(context, pathSep) {
  return pathSep === null || typeof pathSep === 'string'
    ? pathSep
    : context.pathSep
}

export function MessageProvider({
  children,
  context: parent,
  debug,
  locale,
  merge,
  messages,
  onError,
  pathSep
}) {
  if (parent === undefined) parent = useContext(MessageContext)
  else if (parent === null) parent = defaultValue
  const context = useMemo(() => {
    const ps = getPathSep(parent, pathSep)
    return {
      locales: getLocales(parent, locale),
      merge: merge || parent.merge,
      messages: getMessages(parent, locale, messages),
      onError: getOnError(parent, ps, onError, debug),
      pathSep: ps
    }
  }, [parent, locale, merge, messages, pathSep])
  return (
    <MessageContext.Provider value={context}>
      {children}
    </MessageContext.Provider>
  )
}

MessageProvider.defaultProps = {
  locale: ''
}
