import React from 'react'
import { Consumer } from './message-context'

/** HOC providing the wrapped component with a `locale` prop */
const withLocale = (Component) => {
  const render = (props, ref) => (
    <Consumer>
      {({ locales }) => <Component {...props} locale={locales[0]} ref={ref} />}
    </Consumer>
  )
  const name = Component.displayName || Component.name
  render.displayName = `withLocale(${name})`
  return React.forwardRef(render)
}

export default withLocale

