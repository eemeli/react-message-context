import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'
import MessageContext, { defaultValue } from './message-context'
import { ContextType } from './prop-types'

const PATH_SEP = '.'

function getPathSep(context, pathSep) {
  if (context.pathSep !== undefined) return context.pathSep
  if (pathSep) return typeof pathSep === 'string' ? pathSep : PATH_SEP
  return pathSep === undefined ? PATH_SEP : null
}

function getLocales({ locales }, locale) {
  const fallback = locales.filter(fb => fb !== locale)
  return [locale].concat(fallback)
}

function getMessages({ merge, messages: ctxMessages }, locale, lcMessages) {
  const messages = Object.assign({}, ctxMessages)
  const prev = messages[locale]
  messages[locale] = prev ? merge({}, prev, lcMessages) : lcMessages
  return messages
}

function MessageProvider({
  children,
  context: parent,
  locale,
  merge,
  messages,
  pathSep
}) {
  if (parent === undefined) parent = useContext(MessageContext)
  else if (parent === null) parent = defaultValue
  const context = useMemo(
    () => ({
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
  context: ContextType,
  locale: PropTypes.string,
  merge: PropTypes.func,
  messages: PropTypes.object.isRequired,
  pathSep: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}

MessageProvider.defaultProps = {
  locale: '',
  pathSep: PATH_SEP
}

export default MessageProvider
