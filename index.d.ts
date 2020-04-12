import * as React from 'react'

type MergeMessages = (target: object, ...sources: any[]) => object

interface IMessageContext {
  locales: string[]
  merge: MergeMessages
  messages: object
  pathSep?: string
}

/**
 * The context object used internally by the library. Probably only useful with
 * [`Class.contextType`](https://reactjs.org/docs/context.html#classcontexttype)
 * or for building your own hooks.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#messagecontext)
 */
export const MessageContext: React.Context<IMessageContext>

interface MessageProviderProps {
  context?: IMessageContext

  /**
   * A key for the locale of the given messages. If uset, will inherit the locale
   * from the parent context, or ultimately use en empty string.
   */
  locale?: string | string[]

  /**
   * By default, top-level namespaces defined in a child `MessageProvider` overwrite
   * those defined in a parent. Set this to [`_.merge`] or some other function with
   * the same arguments as [Object.assign] to allow for deep merges.
   *
   * [`_.merge`]: https://lodash.com/docs/#merge
   * [object.assign]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   */
  merge?: MergeMessages

  /**
   * A hierarchical object containing the messages as boolean, number, string or
   * function values.
   */
  messages?: object

  /**
   * What to do if a message is not found, or a non-function message is given
   * parameters: `"error"` will throw, `"warn"` will print a warning in the
   * console, and a custom function will be called with the message string and
   * identifier as arguments. If unset, nothing will be done.
   */
  onError?: 'error' | 'warn' | ((msg: string, id: string | string[]) => void)

  /**
   * By default, `.` in a `<Message id>` splits the path into parts, such that e.g.
   * `'a.b'` is equivalent to `['a', 'b']`. Use this option to customize or disable
   * this behaviour (by setting it to `null`).
   */
  pathSep?: string
}

/**
 * `<MessageProvider messages [locale] [merge] [onError] [pathSep]>`
 *
 * Makes the messages available for its descendants. Internally uses a Context API
 * [Provider]. To support multiple locales and/or namespaces, MessageProviders may
 * be used within each other, merging each provider's messages with those of its
 * parents. The locale preference order is also set similarly, from nearest to
 * furthest.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#messageprovider-messages-locale-merge-onerror-pathsep)
 *
 * [provider]: https://reactjs.org/docs/context.html#provider
 */
export const MessageProvider: React.FunctionComponent<MessageProviderProps>

interface MessageProps {
  /**
   * If a function, will be called with the found message. In this case,
   * `onError` and `params` will be ignored and `id` is optional. If some other
   * type of non-empty renderable node, it will be used as a fallback value if
   * the message is not found.
   */
  children?: (msg: any) => React.ReactNode

  /** The key or key path of the message. */
  id: string | string[]

  /** If set, overrides the `locale` of the nearest MessageProvider. */
  locale?: string | string[]

  /**
   * If set, called if `id` does not resolve to a message value (after checking
   * fallback locales, if set). `type` is the type of the value at `id`, most
   * likely either `'object'` or `'unknown'`. A non-empty return value will
   * replace the default `String(id)` fallback value.
   */
  onError?: (id: string | string[], type: string) => string

  /**
   * Parameters to pass to function messages as their first and only argument.
   * `params` will override `msgParams`, to allow for data keys such as `key`
   * and `locale`.
   */
  params?: any

  /**
   * Parameters to pass to function messages as their first and only argument.
   * Overriden by `params`, to allow for data keys such as `key` and `locale`.
   */
  [key: string]: any
}

/**
 * `<Message id [locale] [onError] [params] [...msgParams]>`
 *
 * The string value of a message. Internally uses a Context API [Consumer]. May
 * also be used with a render prop: `<Message id={id}>{msg => {...}}</Message>`.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#message-id-locale-onerror-params-msgparams)
 *
 * [consumer]: https://reactjs.org/docs/context.html#consumer
 */
export const Message: React.FunctionComponent<MessageProps>

/**
 * A custom [React hook] providing the current locales as an array of string
 * identifiers, with earlier entries taking precedence over latter ones. Undefined
 * locales are identified by an empty string `''`.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#uselocales)
 *
 * [react hook]: https://reactjs.org/docs/hooks-intro.html
 */
export function useLocales(): string[]

/**
 * Given a `MessageContext` instance, fetches an entry from the messages object
 * of the current or given locale. The returned value will be `undefined` if not
 * found, or otherwise exactly as set in the `MessageProvider` props.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#getmessagecontext-id-locale)
 *
 * @param context The `MessageContext` instance
 * @param id The key or key path of the message or message object. If empty or
 *   `[]`, matches the root of the messages object
 * @param locale If set, overrides the current locale precedence as set by
 *   parent MessageProviders.
 */
export function getMessage(
  context: IMessageContext,
  id: string | string[],
  locale?: string | string[]
): any

/**
 * A custom [React hook] providing an entry from the messages object of the
 * current or given locale. The returned value will be `undefined` if not found.
 *
 * If the identified message value is a function, the returned value will be the
 * result of calling it with a single argument `params`, or `{}` if empty.
 * Otherwise the value set in the `MessageProvider` props will be returned
 * directly.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#usemessageid-params-locale)
 *
 * [react hook]: https://reactjs.org/docs/hooks-intro.html
 *
 * @param id The key or key path of the message or message object. If empty or
 *   `[]`, matches the root of the messages object
 * @param params Argument to use if the identified message is a function
 * @param locale If set, overrides the current locale precedence as set by
 *   parent MessageProviders.
 */
export function useMessage(
  id: string | string[],
  params?: any,
  locale?: string | string[]
): any

/**
 * @param id Message identifier; extends the path set by `rootId`
 * @param params Parameters for a function message
 */
type MessageGetter = (id: string | string[], params?: any) => any

/**
 * Given a `MessageContext` instance, returns a message getter function, which
 * may have a preset root id path, locale, and/or base parameters for message
 * functions.
 *
 * The returned function takes two parameters `(msgId, msgParams)`, which will
 * extend any values set by the hook's arguments.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#getmessagegettercontext-rootid--baseparams-locale-)
 *
 * @param context The `MessageContext` instance
 * @param rootId The key or key path of the message or message object. If empty
 *   or `[]`, matches the root of the messages object
 * @param options If `baseParams` is set, message function parameters will be
 *   assumed to always be an object, with these values initially set. `locale`
 *   overrides the current locale precedence as set by parent MessageProviders.
 */
export function getMessageGetter(
  context: IMessageContext,
  rootId: string | string[],
  options?: { baseParams?: any; locale?: string | string[] }
): MessageGetter

/**
 * A custom [React hook] providing a message getter function, which may have a
 * preset root id path, locale, and/or base parameters for message functions.
 *
 * The returned function takes two parameters `(msgId, msgParams)`, which will
 * extend any values set by the hook's arguments.
 *
 * [API Documentation](https://github.com/eemeli/react-message-context/blob/master/API.md#usemessagegetterrootid--baseparams-locale-)
 *
 * @param rootId The key or key path of the message or message object. If empty
 *   or `[]`, matches the root of the messages object
 * @param options If `baseParams` is set, message function parameters will be
 *   assumed to always be an object, with these values initially set. `locale`
 *   overrides the current locale precedence as set by parent MessageProviders.
 */
export function useMessageGetter(
  rootId: string | string[],
  options?: { baseParams?: any; locale?: string | string[] }
): MessageGetter
