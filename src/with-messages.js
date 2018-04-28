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
const withMessages = (id, locales) => (Component) => {
  const render = (props, ref) => (
    <Consumer>
      {({ locales: lc0, messages, pathSep }) => {
        const lc = Array.isArray(locales) ? locales : locales ? [locales] : lc0
        const msg = getMessage(messages, lc, id, pathSep)
        return <Component {...props} messages={msg} ref={ref} />
      }}
    </Consumer>
  )
  let args = `[${id}]`
  if (locales) args += `, [${locales}]`
  const name = Component.displayName || Component.name
  render.displayName = `withMessages(${args})(${name})`
  return React.forwardRef(render)
}

export default withMessages
