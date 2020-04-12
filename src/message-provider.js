import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'
import MessageContext, { defaultValue } from './message-context'

function getOnError(context, onError, debug) {
  if (onError === undefined) {
    // debug is deprecated, will be removed later
    if (typeof debug === 'function') return (msg, id) => debug(msg + ': ' + id)
    onError = debug
  }
  switch (onError) {
    case 'error':
      return function msgError(msg, id) {
        throw new Error(msg + ': ' + id)
      }
    case 'warn':
      return function msgWarning(msg, id) {
        console.warn(msg, { id })
      }
    case null:
      return defaultValue.onError
    default:
      return typeof onError === 'function' ? onError : context.onError
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

function MessageProvider({
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
  const context = useMemo(
    () => ({
      locales: getLocales(parent, locale),
      merge: merge || parent.merge,
      messages: getMessages(parent, locale, messages),
      onError: getOnError(parent, onError, debug),
      pathSep: getPathSep(parent, pathSep)
    }),
    [parent, locale, merge, messages, pathSep]
  )
  return (
    <MessageContext.Provider value={context}>
      {children}
    </MessageContext.Provider>
  )
}

MessageProvider.propTypes = {
  context: PropTypes.shape({
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    merge: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    pathSep: PropTypes.string
  }),
  locale: PropTypes.string,
  merge: PropTypes.func,
  messages: PropTypes.object,
  onError: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['error', 'warn'])
  ]),
  pathSep: PropTypes.string
}

MessageProvider.defaultProps = {
  locale: ''
}

export default MessageProvider
