import PropTypes from 'prop-types'
import React, { useContext, useMemo } from 'react'
import MessageContext, { defaultValue } from './message-context'
import { ContextType } from './prop-types'

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
  messages: PropTypes.object,
  pathSep: PropTypes.string
}

MessageProvider.defaultProps = {
  locale: ''
}

export default MessageProvider
