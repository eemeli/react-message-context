import React from 'react'
import getMessage, { getPath } from './get-message'
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
const withMessages = (id, locales) => Component => {
  const render = (props, ref) => (
    <Consumer>
      {({ locales: lc0, messages, pathSep }) => {
        const lc = Array.isArray(locales) ? locales : locales ? [locales] : lc0
        const path = getPath(id, pathSep)
        const msg = getMessage(messages, lc, path)
        const msgFn = (msgId, msgParams) => {
          let res
          if (typeof msg === 'object') {
            const msgPath = path.concat(getPath(msgId, pathSep))
            res = getMessage(messages, lc, msgPath)
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
        return <Component {...props} messages={msgFn} ref={ref} />
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
