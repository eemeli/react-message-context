import { createContext } from 'react'

export const defaultValue = {
  locales: [],
  merge: Object.assign,
  messages: {},
  onError: () => {},
  pathSep: '.'
}
export const MessageContext = createContext(defaultValue)
