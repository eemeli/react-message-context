import React from 'react'
import getMessage from './get-message'
import { Consumer } from './message-context'

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
const withMessages = (id, locales) => (Component) => (props) => (
  <Consumer>
    {({ locales: lc0, messages }) => {
      const lc = Array.isArray(locales) ? locales : locales ? [locales] : lc0
      const msg = getMessage(messages, lc, id)
      return <Component {...props} messages={msg} />
    }}
  </Consumer>
)

export default withMessages
