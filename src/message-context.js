import React from 'react'

export const defaultValue = {
  locales: [],
  messages: {}
}

export const { Consumer, Provider } = React.createContext(defaultValue)
