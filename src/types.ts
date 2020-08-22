export type Id = string | string[]

export type MessageValue = string | number | boolean | ((props: any) => any)

export interface MessageObject {
  [key: string]: MessageValue | MessageObject
}

export type MergeMessages = (
  target: MessageObject,
  ...sources: Array<MessageValue | MessageObject>
) => MessageObject
