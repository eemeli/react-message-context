import React from 'react'
import MessageContext from './message-context'

/** HOC providing the wrapped component with a `locale` prop */
const withLocale = (Component) => {
  const render = (props, ref) => (
    <MessageContext.Consumer>
      {({ locales }) => <Component {...props} locale={locales[0]} ref={ref} />}
    </MessageContext.Consumer>
  )
  const name = Component.displayName || Component.name
  render.displayName = `withLocale(${name})`
  return React.forwardRef(render)
}

export default withLocale

