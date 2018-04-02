import PropTypes from 'prop-types'
import React from 'react'
import getMessage from './get-message'
import { Consumer } from './message-context'
import { PathType } from './prop-types'

const Message = ({ id, locale, onError, params, ...msgParams }) => (
  <Consumer>
    {({ locales, messages }) => {
      const lc = Array.isArray(locale) ? locale : locale ? [locale] : locales
      const msg = getMessage(messages, lc, id)
      switch (typeof msg) {
        case 'function':
          return msg(Object.assign(msgParams, params))
        case 'boolean':
        case 'number':
        case 'string':
          return String(msg)
        default:
          return onError && onError(id, typeof msg) || String(id)
      }
    }}
  </Consumer>
)

Message.propTypes = {
  id: PathType.isRequired,
  locale: PathType,
  onError: PropTypes.func,
  params: PropTypes.object
}

export default Message
