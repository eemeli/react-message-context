import React from 'react'
import getMessage, { getPath } from './get-message'
import MessageContext from './message-context'

function getMessagesFunction({ locales, messages, pathSep }, id, argLocales) {
  if (argLocales !== undefined) {
    locales = Array.isArray(argLocales) ? argLocales : [argLocales]
  }
  const path = getPath(id, pathSep)
  const msg = getMessage(messages, locales, path)
  return (msgId, msgParams) => {
    let res
    if (typeof msg === 'object') {
      const msgPath = path.concat(getPath(msgId, pathSep))
      res = getMessage(messages, locales, msgPath)
    } else {
      if (msgId && !msgParams) msgParams = msgId
      res = msg
    }
    switch (typeof res) {
      case 'function':
        return res(msgParams)
      case 'boolean':
      case 'number':
        return String(res)
      default:
        return res
    }
  }
}

/**
 * Returns a HOC providing the wrapped component with a `messages` prop
 *
 * @param {string|string[]} [id]
 * @param {string|string[]} [locales]
 *
 * @example
 * const MessageList = ({ messages }) => (
 *   <ul>
 *     {Object.entries(messages).map(([key, msg]) => (
 *       <li key={key}>`${key}: ${msg()}`</li>
 *     )}
 *   </ul>
 * )
 *
 * const WrappedList = withMessages(['path', 'to', 'object'])(MessageList)
 *
 * <WrappedList />
 */
const withMessages = (id, argLocales) => Component => {
  const render = (props, ref) => (
    <MessageContext.Consumer>
      {context => (
        <Component
          {...props}
          messages={getMessagesFunction(context, id, argLocales)}
          ref={ref}
        />
      )}
    </MessageContext.Consumer>
  )
  const name = Component.displayName || Component.name
  render.displayName = `withMessages()(${name})`
  return React.forwardRef(render)
}

export default withMessages
