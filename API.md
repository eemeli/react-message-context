# API

The public API is available as named exports of the package:

```js
import {
  getMessage,
  getMessageGetter,
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

Given a `MessageContext` instance, fetches an entry from the messages object of
the current or given locale. The returned value will be `undefined` if not
found, or otherwise exactly as set in the `MessageProvider` props.

#### Arguments

- `context` (_MessageContext_): The `MessageContext` instance
- `id` (_string_ or _string[]_): The key or key path of the message or message
  object. If empty or `[]`, matches the root of the messages object
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.

See `MessageContext` for example usage.

<a id="get-message-getter"></a>
<br/>

### `getMessageGetter(context, rootId, [{ baseParams, locale }])`

Given a `MessageContext` instance, returns a message getter function, which may
have a preset root id path, locale, and/or base parameters for message
functions.

The returned function takes two parameters `(msgId, msgParams)`, which will
extend any values set by the hook's arguments.

#### Arguments

- `context` (_MessageContext_): The `MessageContext` instance
- `rootId` (_string_ or _string[]_): The key or key path of the message or
  message object. If empty or `[]`, matches the root of the messages object
- [`baseParams`](_Object_): If set, message function parameters will be assumed
  to always be an object, with these values initially set.
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.

See `MessageContext` for example usage.

<a id="message-context"></a>
<br/>

### `MessageContext`

The context object used internally by the library. Probably only useful with
[`Class.contextType`] or for building your own hooks.

[`class.contexttype`]: https://reactjs.org/docs/context.html#classcontexttype

#### Example

```js
import React, { Component } from 'react'
import {
  getMessage,
  getMessageGetter,
  MessageContext,
  MessageProvider
} from 'react-message-context'

const messages = {
  example: { key: 'Your message here' },
  other: { key: 'Another message' }
}

class Example extends Component {
  render() {
    const message = getMessage(this.context, 'example.key')
    const otherMsg = getMessageGetter(this.context, 'other')
    return (
      <span>
        {message} | {otherMsg('key')}
      </span>
    ) // 'Your message here | Another message'
  }
}
Example.contextType = MessageContext

export const App = () => (
  <MessageProvider messages={messages}>
    <Example />
  </MessageProvider>
)
```

<a id="message-provider"></a>
<br/>

### `<MessageProvider messages [locale] [merge] [pathSep]>`

Makes the messages available for its descendants. Internally uses a Context API
[Provider]. To support multiple locales and/or namespaces, MessageProviders may
be used within each other, merging each provider's messages with those of its
parents. The locale preference order is also set similarly, from nearest to
furthest.

#### Props

- `messages` (_object_): A hierarchical object containing the messages as
  boolean, number, string or function values.
- [`locale`](_string_): A key for the locale of the given messages. If uset,
  will inherit the locale from the parent context, or ultimately use en empty
  string.
- [`merge`](_Function_): By default, top-level namespaces defined in a child
  `MessageProvider` overwrite those defined in a parent. Set this to [`_.merge`]
  or some other function with the same arguments as [Object.assign] to allow for
  deep merges.
- [`pathSep`](_string_): By default, `.` in a `<Message id>` splits the path
  into parts, such that e.g. `'a.b'` is equivalent to `['a', 'b']`. Use this
  option to customize or disable this behaviour (by setting it to `null`).
- `children` (_ReactElement_): The root of your component hierarchy.

[provider]: https://reactjs.org/docs/context.html#provider
[`_.merge`]: https://lodash.com/docs/#merge
[object.assign]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

#### Example

```js
import React from 'react'
import { Message, MessageProvider } from 'react-message-context'

const messages = { example: { key: 'Your message here' } }
const extended = { other: { key: 'Another message' } }

const Example = () => (
  <span>
    <Message id={['example', 'key']} />
    {' | '}
    <Message id="other/key" />
  </span>
) // 'Your message here | Another message'

export const App = () => (
  <MessageProvider messages={messages} pathSep="/">
    <MessageProvider messages={extended}>
      <Example />
    </MessageProvider>
  </MessageProvider>
)
```

Also see `Message` and other components for example usage.

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

#### Example

```js
import React from 'react'
import { Message, MessageProvider } from 'react-message-context'

const messages = { example: { key: ({ thing }) => `Your ${thing} here` } }

const Example = () => (
  <span>
    <Message id="example.key" thing="message" />
  </span>
) // 'Your message here'

export const App = () => (
  <MessageProvider messages={messages}>
    <Example />
  </MessageProvider>
)
```

Also see `MessageProvider` for example usage.

<a id="use-locales"></a>
<br/>

### `useLocales()`

A custom [React hook] providing the current locales as an array of string
identifiers, with earlier entries taking precedence over latter ones. Undefined
locales are identified by an empty string `''`.

[react hook]: https://reactjs.org/docs/hooks-intro.html

See `useMessage()` for example usage.

<a id="use-message"></a>
<br/>

### `useMessage(id, [locale])`

A custom [React hook] providing an entry from the messages object of the
current or given locale. The returned value will be `undefined` if not found, or
otherwise exactly as set in the `MessageProvider` props.

#### Arguments

- `id` (_string_ or _string[]_): The key or key path of the message or message
  object. If empty or `[]`, matches the root of the messages object
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.

#### Example

```js
import React from 'react'
import { MessageProvider, useLocales, useMessage } from 'react-message-context'

const en = { example: { key: 'Your message here' } }
const fi = { example: { key: 'Lisää viestisi tähän' } }

// Intl.ListFormat may require a polyfill, such as intl-list-format
function Example() {
  const locales = useLocales() // ['fi', 'en']
  const lfOpt = { style: 'long', type: 'conjunction' }
  const lf = new Intl.ListFormat(locales, lfOpt)
  const lcMsg = lf.format(locales.map(JSON.stringify)) // '"fi" ja "en"'
  const keyMsg = useMessage('example.key') // 'Lisää viestisi tähän'
  return (
    <article>
      <h1>{lcMsg}</h1>
      <p>{keyMsg}</p>
    </article>
  )
}

export const App = () => (
  <MessageProvider locale="en" messages={en}>
    <MessageProvider locale="fi" messages={fi}>
      <Example />
    </MessageProvider>
  </MessageProvider>
)
```

<a id="use-message-getter"></a>
<br/>

### `useMessageGetter(rootId, [{ baseParams, locale }])`

A custom [React hook] providing a message getter function, which may have a
preset root id path, locale, and/or base parameters for message functions.

The returned function takes two parameters `(msgId, msgParams)`, which will
extend any values set by the hook's arguments.

#### Arguments

- `rootId` (_string_ or _string[]_): The key or key path of the message or
  message object. If empty or `[]`, matches the root of the messages object
- [`baseParams`](_Object_): If set, message function parameters will be assumed
  to always be an object, with these values initially set.
- [`locale`] (_string_ or _string[]_): If set, overrides the current locale
  precedence as set by parent MessageProviders.

#### Example

```js
import React from 'react'
import { MessageProvider, useMessageGetter } from 'react-message-context'

const messages = {
  example: {
    funMsg: ({ thing }) => `Your ${thing} here`,
    thing: 'message'
  }
}

function Example() {
  const getMsg = useMessageGetter('example')
  const thing = getMsg('thing')
  return getMsg('funMsg', { thing }) // 'Your message here'
}

export const App = () => (
  <MessageProvider messages={messages}>
    <Example />
  </MessageProvider>
)
```
