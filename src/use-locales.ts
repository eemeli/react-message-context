import { useContext } from 'react'
import { MessageContext } from './message-context'

export function useLocales() {
  const { locales } = useContext(MessageContext)
  return locales.slice()
}
