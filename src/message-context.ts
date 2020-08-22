import { Context /* used in d.ts */, createContext } from 'react'
import { ErrorCode } from './message-error'
import { MessageObject, MergeMessages } from './types'

/** @internal */
export interface MessageContext {
  locales: string[]
  merge: MergeMessages
  messages: MessageObject
  onError?: (path: string[], code: ErrorCode) => any
  pathSep: string | null
}

export const defaultValue: MessageContext = {
  locales: [],
  merge: Object.assign,
  messages: {},
  pathSep: '.'
}

/**
 * The context object used internally by the library.
 * Probably only useful with `Class.contextType` or for building your own hooks.
 *
 * @internal
 */
export const MessageContext = createContext(defaultValue)
