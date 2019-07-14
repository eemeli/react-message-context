import React from 'react'

const defaultValue = {
  locales: [],
  merge: Object.assign,
  messages: {},
  pathSep: '.'
}
const context = React.createContext(defaultValue)

export { context as default, defaultValue }
