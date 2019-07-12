import React from 'react'

const defaultValue = {
  locales: [],
  messages: {}
}
const context = React.createContext(defaultValue)
const { Consumer, Provider } = context

export { context as default, Consumer, Provider, defaultValue }
