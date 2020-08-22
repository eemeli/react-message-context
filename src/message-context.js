import { createContext } from 'react'

export const defaultValue = {
  locales: [],
  merge: Object.assign,
  messages: {},
  onError: undefined,
  pathSep: '.'
}
export const MessageContext = createContext(defaultValue)
