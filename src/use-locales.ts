import { useContext } from 'react'
import { MessageContext } from './message-context'

/**
 * A custom React hook providing the current locales as an array of string identifiers, with earlier entries taking precedence over latter ones.
 * Undefined locales are identified by an empty string `''`.
 *
 * @public
 */
export function useLocales() {
  const { locales } = useContext(MessageContext)
  return locales.slice()
}
