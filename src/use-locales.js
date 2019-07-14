import { useContext } from 'react'

import MessageContext from './message-context'

export default function useLocales() {
  const { locales } = useContext(MessageContext)
  return locales.slice()
}

