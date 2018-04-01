import React from 'react'

export const defaultValue = {
  data: {},
  locales: []
}

export const { Consumer, Provider } = React.createContext(defaultValue)
