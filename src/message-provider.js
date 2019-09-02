import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'
import MessageContext, { defaultValue } from './message-context'

function debugError(msg) {
  throw new Error(msg)
}
function debugWarn(msg) {
  console.warn(msg)
}
function getDebug(context, debug) {
  switch (debug) {
    case 'error':
      return debugError
    case 'warn':
      return debugWarn
    case null:
      return defaultValue.debug
    default:
      return typeof debug === 'function' ? debug : context.debug
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
  pathSep
}) {
  if (parent === undefined) parent = useContext(MessageContext)
  else if (parent === null) parent = defaultValue
  const context = useMemo(
    () => ({
      debug: getDebug(parent, debug),
      locales: getLocales(parent, locale),
      merge: merge || parent.merge,
      messages: getMessages(parent, locale, messages),
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
    debug: PropTypes.func.isRequired,
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    merge: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired,
    pathSep: PropTypes.string
  }),
  debug: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf(['error', 'warn'])
  ]),
  locale: PropTypes.string,
  merge: PropTypes.func,
  messages: PropTypes.object,
  pathSep: PropTypes.string
}

MessageProvider.defaultProps = {
  locale: ''
}

export default MessageProvider
