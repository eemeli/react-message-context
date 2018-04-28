# API

The public API is available as named exports of the package:

```js
import {
  MessageProvider, Message, withLocale, withMessages
} from 'react-message-context'
```

<a id="message-provider"></a>
<br/>

### `<MessageProvider messages [locale] [fallback] [pathSep]>`

Makes the messages available for its descendants. Internally uses a Context API
[Provider]. Supports both single- and multi-locale use.

#### Props
- `messages` (_object_): An object containing the messages as boolean, number,
  string or function values. Functions will be called with an object parameter.
  `messages` may be hierarchical, and if it does not use `[]` bracket notation
  to access child values, it should provide a `getIn()` accessor as used by
  [Immutable collections].
- [`locale`] (_string_): The key of the current locale. If `fallback` or
  `locale` is set, the top level of `messages` should consist of locale keys,
  e.g. `{ en: {...}, fr: {...} }`.
- [`fallback`] (_string_ or _string[]_): The key or keys of locales to use as
  fallback options if no match is found in the primary locale. If given as an
  array, locales are checked in index order.
- [`pathSep`] (_bool_ or _string_): By default, `.` in a `<Message id>` splits
  the path into parts, such that e.g. `'a.b'` is equivalent to `['a', 'b']`.
  Use this option to customize or disable this behaviour.
- `children` (_ReactElement_): The root of your component hierarchy.

[Provider]: https://reactjs.org/docs/context.html#provider
[Immutable collections]: https://facebook.github.io/immutable-js/docs/#/Collection/getIn

<a id="message"></a>
<br/>

### `<Message id [locale] [onError] [params] [...msgParams]>`

The string value of a message. Internally uses a Context API [Consumer]. May
also be used with a render prop: `<Message id={id}>{msg => {...}}</Message>`.

#### Props
- `id` (_string_ or _string[]_): The key or key path of the message.
- [`locale`] (_string_ or _string[]_): If set, overrides the `locale` and
  `fallback` of the ancestral MessageProvider.
- [`onError(id, type): string`] (_function_): If set, called if `id` does not
  resolve to a message value (after checking fallback locales, if set). `type`
  is the type of the value at `id`, most likely either `'object'` or `'unknown'`.
  A non-empty return value will replace the default `String(id)` fallback value.
- [`params`] and [`msgParams`] (_object_): Parameters to pass to function
  messages as their first and only argument. `params` will override `msgParams`,
  to allow for data keys such as `key` and `locale`.
- [`children`] (_function_): If set, will be called with the found message. In
  this case, `onError` and `params` will be ignored and `id` is optional.

[Consumer]: https://reactjs.org/docs/context.html#consumer

<a id="with-locale"></a>
<br/>

### `withLocale(Component)`

A [higher-order component] providing the wrapped `Component` with a `locale`
prop matching the current `locale` prop of the ancestor `MessageProvider`
component. The HOC [forwards] its `ref` to `Component`.

[higher-order component]: https://reactjs.org/docs/higher-order-components.html
[forwards]: https://reactjs.org/docs/forwarding-refs.html

<a id="with-messages"></a>
<br/>

### `withMessages([id], [locale])(Component)`

A [higher-order component] providing the wrapped `Component` with a `messages`
prop. `messages` may be a single message, an object of messages, or `undefined`
if `id` is not found in the messages. Messages are not resolved, i.e. their
values are as set in the MessageProvider props. The HOC [forwards] its `ref` to
`Component`.

#### Arguments
- [`id`] (_string_ or _string[]_): The key or key path of the message or message
  object. If empty or `[]`, matches the root of the messages object or the
  current locale, if set.
- [`locale`] (_string_ or _string[]_): If set, overrides the `locale` and
  `fallback` of the ancestral MessageProvider.
