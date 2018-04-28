import PropTypes from 'prop-types'
import React from 'react'
import getMessage from './get-message'
import { Consumer } from './message-context'
import { PathType } from './prop-types'

const Message = ({ children, id, locale, onError, params, ...msgParams }) => (
  <Consumer>
    {({ locales, messages, pathSep }) => {
      const lc = Array.isArray(locale) ? locale : locale ? [locale] : locales
      const msg = getMessage(messages, lc, id, pathSep)
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
          if (!res) res = pathSep && Array.isArray(id) ? id.join(pathSep) : String(id)
          return res
      }
    }}
  </Consumer>
)

Message.propTypes = {
  children: PropTypes.func,
  id: PathType,
  locale: PathType,
  onError: PropTypes.func,
  params: PropTypes.object
}

export default Message
