import merge from 'lodash.merge'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MessageContext, { defaultValue } from './message-context'
import { ContextType } from './prop-types'

const PATH_SEP = '.'

function getPathSep(context, pathSep) {
  if (context && context.pathSep !== undefined) return context.pathSep
  if (pathSep) return typeof pathSep === 'string' ? pathSep : PATH_SEP
  if (pathSep === false || pathSep === null) return null
  return context ? context.pathSep : PATH_SEP
}

function getLocales(context, locale) {
  if (!context) return [locale]
  const fallback = context.locales.filter(fb => fb !== locale)
  return [locale].concat(fallback)
}

function getMessages(context, locale, lcMessages) {
  const messages = context ? Object.assign({}, context.messages) : {}
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
    const pathSep = getPathSep(props.context, props.pathSep)
    const changed =
      props.context !== state.prevProps.context ||
      props.messages !== state.prevProps.messages ||
      props.locale !== state.context.locales[0] ||
      pathSep !== state.context.pathSep
    if (!changed) return null
    const locales = getLocales(props.context, props.locale)
    const messages = getMessages(props.context, props.locale, props.messages)
    const context = { locales, messages, pathSep }
    return { context, prevProps: props }
  }

  state = {
    context: defaultValue,
    prevProps: { context: {}, messages: {} }
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
