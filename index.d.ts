import React from 'react'

type MergeMessages = (target: object, ...sources: any[]) => object

interface IMessageContext {
  locales: string[]
  merge: MergeMessages
  messages: object
  pathSep?: string
}
export const MessageContext = React.createContext({} as IMessageContext)

interface MessageProviderProps {
  context?: IMessageContext
  locale?: string | string[]
  merge?: MergeMessages
  messages?: object
  pathSep?: string
}
export const MessageProvider: React.FunctionComponent<MessageProviderProps>

interface MessageProps {
  children?: any
  id: string | string[]
  locale?: string | string[]
  params?: any
}
export const Message: React.FunctionComponent<MessageProps>

export function useLocales(): string[]

export function getMessage(
  context: IMessageContext,
  id: string | string[],
  locale?: string | string[]
): any

export function useMessage(
  id: string | string[],
  locale?: string | string[]
): any

type MessageGetter = (id: string | string[], params?: any) => any

export function getMessageGetter(
  context: IMessageContext,
  rootId: string | string[],
  options?: { baseParams?: any; locale?: string | string[] }
): MessageGetter

export function useMessageGetter(
  rootId: string | string[],
  options?: { baseParams?: any; locale?: string | string[] }
): MessageGetter
