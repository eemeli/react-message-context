import { createContext } from 'react'

const defaultValue = {
  locales: [],
  merge: Object.assign,
  messages: {},
  onError: () => {},
  pathSep: '.'
}
const context = createContext(defaultValue)

export { context as default, defaultValue }
