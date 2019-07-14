import React from 'react'

const defaultValue = {
  locales: [],
  messages: {},
  pathSep: undefined
}
const context = React.createContext(defaultValue)

export { context as default, defaultValue }
