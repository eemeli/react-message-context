import PropTypes from 'prop-types'
import React from 'react'
import { getMessage } from './get-message'
import MessageContext from './message-context'

const Message = ({ children, id, locale, onError, params, ...msgParams }) => (
  <MessageContext.Consumer>
    {context => {
      const msg = getMessage(context, id, locale)
      if (typeof children === 'function') return children(msg)
      switch (typeof msg) {
        case 'function':
          return msg(Object.assign(msgParams, params))
        case 'boolean':
        case 'number':
        case 'string':
          return String(msg)
        default:
          let res = onError && onError(id, typeof msg)
          if (!res) {
            if (children) return children
            const { pathSep } = context
            res = pathSep && Array.isArray(id) ? id.join(pathSep) : String(id)
          }
          return res
      }
    }}
  </MessageContext.Consumer>
)

Message.displayName = 'Message'

Message.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  locale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onError: PropTypes.func,
  params: PropTypes.object
}

export default Message
