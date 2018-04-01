import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defaultValue, Provider } from './message-context'
import { PathType } from './prop-types'

export default class MessageProvider extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    fallback: PathType,
    locale: PropTypes.string
  }

  static getDerivedStateFromProps ({ data, fallback, locale }, prev) {
    const locales = fallback
      ? [locale].concat(fallback)
      : locale ? [locale] : []
    return (
      data !== prev.data ||
      locales.length !== prev.locales.length ||
      prev.locales.some((lc, i) => lc !== locales[i])
    ) ? { data, locales } : null
  }

  state = defaultValue

  render () {
    return <Provider value={this.state}>
      {this.props.children}
    </Provider>
  }
}

