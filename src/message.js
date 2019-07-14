import PropTypes from 'prop-types'
import React from 'react'
import getMessage from './get-message'
import MessageContext from './message-context'
import { PathType } from './prop-types'

const Message = ({ children, id, locale, onError, params, ...msgParams }) => (
  <MessageContext.Consumer>
    {context => {
      const msg = getMessage(context, id, locale)
      if (children) return children(msg)
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
  children: PropTypes.func,
  id: PathType,
  locale: PathType,
  onError: PropTypes.func,
  params: PropTypes.object
}

export default Message
