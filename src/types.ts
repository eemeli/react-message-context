/** @internal */
export type Id = string | string[]

/** @internal */
export type MessageValue = string | number | boolean | ((props: any) => any)

/** @internal */
export interface MessageObject {
  [key: string]: MessageValue | MessageObject
}

export type MergeMessages = (
  target: MessageObject,
  ...sources: Array<MessageValue | MessageObject>
) => MessageObject
