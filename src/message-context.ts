import { createContext } from 'react'
import { ErrorCode } from './message-error'
import { MessageObject, MergeMessages } from './types'

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
export const MessageContext = createContext(defaultValue)
