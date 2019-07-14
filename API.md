# API

The public API is available as named exports of the package:

```js
import {
  getMessage,
  MessageContext,
  MessageProvider,
  Message,
  useLocales,
  useMessage,
  useMessageGetter
} from 'react-message-context'
```

<a id="get-message"></a>
<br/>

### `getMessage(context, id, [locale])`

Given a MessageContext instance, fetches an entry from the messages object of
the current or given locale. The returned value will be `undefined` if not
found, or otherwise exactly as set in the MessageProvider props.

#### Arguments

- `context` (_MessageContext_): The MessageContext instance
- `id` (_string_ or _string[]_): The key or key path of the message or message
  object. If empty or `[]`, matches the root of the messages object
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.

#### Example

```js
import React, { Component } from 'react'
import {
  getMessage,
  MessageContext,
  MessageProvider
} from 'react-message-context'

const messages = {
  example: {
    key: 'Your message here'
  }
}

class Example extends Component {
  render() {
    const message = getMessage(this.context, 'example.key')
    return <span>{message}</span>
  }
}
Example.contextType = MessageContext

export const App = () => (
  <MessageProvider messages={messages}>
    <Example />
  </MessageProvider>
)
```

<a id="message-context"></a>
<br/>

### `MessageContext`

The context object used internally by the library. Probably only useful with
[`Class.contextType`] or for building your own hooks.

[`class.contexttype`]: https://reactjs.org/docs/context.html#classcontexttype

<a id="message-provider"></a>
<br/>

### `<MessageProvider messages [locale] [pathSep]>`

Makes the messages available for its descendants. Internally uses a Context API
[Provider]. To support multiple locales and/or namespaces, MessageProviders may
be used within each other, merging each provider's messages with those of its
parents. The locale preference order is also set similarly, from nearest to
furthest.

#### Props

- `messages` (_object_): An object containing the messages as boolean, number,
  string or function values. Functions will be called with an object parameter.
  `messages` may be hierarchical, and if it does not use `[]` bracket notation
  to access child values, it should provide a `getIn()` accessor as used by
  [Immutable collections].
- [`locale`](_string_): A key for the locale of the given messages. If uset,
  will inherit the locale from the parent context, or ultimately use en empty
  string.
- [`pathSep`] (_bool_ or _string_): By default, `.` in a `<Message id>` splits
  the path into parts, such that e.g. `'a.b'` is equivalent to `['a', 'b']`.
  Use this option to customize or disable this behaviour. Only valid in an
  outermost MessageProvider.
- `children` (_ReactElement_): The root of your component hierarchy.

[provider]: https://reactjs.org/docs/context.html#provider
[immutable collections]: https://facebook.github.io/immutable-js/docs/#/Collection/getIn

<a id="message"></a>
<br/>

### `<Message id [locale] [onError] [params] [...msgParams]>`

The string value of a message. Internally uses a Context API [Consumer]. May
also be used with a render prop: `<Message id={id}>{msg => {...}}</Message>`.

#### Props

- `id` (_string_ or _string[]_): The key or key path of the message.
- [`locale`] (_string_ or _string[]_): If set, overrides the `locale` of the
  nearest MessageProvider.
- [`onError(id, type): string`](_function_): If set, called if `id` does not
  resolve to a message value (after checking fallback locales, if set). `type`
  is the type of the value at `id`, most likely either `'object'` or `'unknown'`.
  A non-empty return value will replace the default `String(id)` fallback value.
- [`params`] and [`msgParams`](_object_): Parameters to pass to function
  messages as their first and only argument. `params` will override `msgParams`,
  to allow for data keys such as `key` and `locale`.
- [`children`](_function_): If set, will be called with the found message. In
  this case, `onError` and `params` will be ignored and `id` is optional.

[consumer]: https://reactjs.org/docs/context.html#consumer

<a id="use-locales"></a>
<br/>

### `useLocales()`

A custom [React hook] providing the current locales as an array of string
identifiers, with earlier entries taking precedence over latter ones. Undefined
locales are identified by an empty string `''`.

[react hook]: https://reactjs.org/docs/hooks-intro.html

<a id="use-message"></a>
<br/>

### `useMessage(id, [locale])`

A custom [React hook] providing an entry from the messages object of the
current or given locale. The returned value will be `undefined` if not found, or
otherwise exactly as set in the MessageProvider props.

#### Arguments

- [`id`] (_string_ or _string[]_): The key or key path of the message or
  message object. If empty or `[]`, matches the root of the messages object
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.

<a id="use-message-getter"></a>
<br/>

### `useMessageGetter(rootId, [{ baseParams, locale }])`

A custom [React hook] providing a message getter function, which may have a
preset root id path, locale, and/or base parameters for message functions.

The returned function takes two parameters `(msgId, msgParams)`, which will
extend any values set by the hook's arguments.

#### Arguments

- [`rootId`] (_string_ or _string[]_): The key or key path of the message or
  message object. If empty or `[]`, matches the root of the messages object
- [`baseParams`](_Object_): If set, message function parameters will be assumed
  to always be an object, with these values initially set.
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.
