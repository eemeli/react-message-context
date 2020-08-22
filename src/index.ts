/**
 * An efficient React front-end for message formatting libraries.
 * Designed in particular for use with {@link https://messageformat.github.io | messageformat}, but will work with any messages.
 * Provides the best possible API for a front-end developer, without making the back end any more difficult than it needs to be either.
 * Should add at most about 1kB to your compiled & minified bundle size.
 *
 * @example
 * ```js
 * import {
 *   getMessage,
 *   getMessageGetter,
 *   MessageContext,
 *   MessageProvider,
 *   Message,
 *   useLocales,
 *   useMessage,
 *   useMessageGetter
 * } from 'react-message-context'
 * ```
 *
 * @packageDocumentation
 */
export { getMessage, getMessageGetter } from './get-message'
export { Message, MessageProps } from './message'
export { MessageContext } from './message-context'
export { MessageError } from './message-error'
export { MessageProvider, MessageProviderProps } from './message-provider'
export { Id, MessageObject, MessageValue } from './types'
export { useLocales } from './use-locales'
export { useMessage } from './use-message'
export { useMessageGetter } from './use-message-getter'
