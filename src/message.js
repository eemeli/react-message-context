import PropTypes from 'prop-types'
import React from 'react'
import getMessage from './get-message'
import { Consumer } from './message-context'
import { PathType } from './prop-types'

const Message = ({ id, locale, onError, props, ...msgProps }) => (
  <Consumer>
    {({ data, locales }) => {
      const msg = getMessage(data, locale ? [locale] : locales, id)
      switch (typeof msg) {
        case 'function':
          return msg(Object.assign(msgProps, props))
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
  locale: PropTypes.string,
  onError: PropTypes.func,
  props: PropTypes.object
}

export default Message
