import PropTypes from 'prop-types'
import React, { Component } from 'react'
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

class InnerMessageProvider extends Component {
  static propTypes = {
    context: ContextType,
    locale: PropTypes.string,
    messages: PropTypes.object.isRequired,
    pathSep: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  }

  static defaultProps = {
    locale: '',
    pathSep: PATH_SEP
  }

  static getDerivedStateFromProps(props, state) {
    const propContext = props.context || defaultValue
    const pathSep = getPathSep(propContext, props.pathSep)
    const changed =
      propContext !== state.prevProps.context ||
      props.merge !== state.prevProps.merge ||
      props.messages !== state.prevProps.messages ||
      props.locale !== state.context.locales[0] ||
      pathSep !== state.context.pathSep
    if (!changed) return null
    const locales = getLocales(propContext, props.locale)
    const merge = props.merge || propContext.merge
    const messages = getMessages(propContext, props.locale, props.messages)
    const context = { locales, merge, messages, pathSep }
    return { context, prevProps: { context: propContext, merge, messages } }
  }

  state = {
    context: defaultValue,
    prevProps: { context: defaultValue, messages: {} }
  }

  render() {
    return (
      <MessageContext.Provider value={this.state.context}>
        {this.props.children}
      </MessageContext.Provider>
    )
  }
}

const MessageProvider = props => (
  <MessageContext.Consumer>
    {context => <InnerMessageProvider context={context} {...props} />}
  </MessageContext.Consumer>
)
MessageProvider.displayName = 'MessageProvider'
export default MessageProvider
