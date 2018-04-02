import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defaultValue, Provider } from './message-context'
import { PathType } from './prop-types'

export default class MessageProvider extends Component {
  static propTypes = {
    fallback: PathType,
    locale: PropTypes.string,
    messages: PropTypes.object.isRequired
  }

  static getDerivedStateFromProps ({ fallback, locale, messages }, prev) {
    const locales = fallback
      ? [locale].concat(fallback)
      : locale ? [locale] : []
    return (
      messages !== prev.messages ||
      locales.length !== prev.locales.length ||
      prev.locales.some((lc, i) => lc !== locales[i])
    ) ? { locales, messages } : null
  }

  state = defaultValue

  render () {
    return <Provider value={this.state}>
      {this.props.children}
    </Provider>
  }
}

