import React from 'react'
import { Consumer } from './message-context'

/** HOC providing the wrapped component with a `locale` prop */
const withLocale = (Component) => (props) => (
  <Consumer>
    {({ locales }) => <Component {...props} locale={locales[0]} />}
  </Consumer>
)

export default withLocale

