# react-message-context

An efficient React front-end for message formatting libraries. Designed in particular for use with [messageformat], but will work with any messages. Provides the best possible API for a front-end developer, without making the back end any more difficult than it needs to be either. Should add at most about 1kB to your compiled & minified bundle size.

[messageformat]: https://messageformat.github.io

## Installation

```
npm install react-message-context
```

The library has **React 16.8** or later as a peer dependency. It is published as an **ES module** only, which should work directly with almost all tools and environments that support modern development targeting browser environments. For tools such as Jest that define their own import methods, you may need to add something like `transformIgnorePatterns: ['node_modules/(?!(react-message-context)/)']` to your configuration.

## [API Documentation](API.md)

- [`getMessage(context, id, [locale])`](API.md#get-message)
- [`getMessageGetter(context, rootId, [{ baseParams, locale }])`](API.md#get-message-getter)
- [`MessageContext`](API.md#message-context)
- [`<MessageProvider messages [debug] [locale] [pathSep]>`](API.md#message-provider)
- [`<Message id [locale] [onError] [props] [...msgProps]>`](API.md#message)
- [`useLocales()`](API.md#use-locales)
- [`useMessage(id, [params], [locale])`](API.md#use-message)
- [`useMessageGetter(rootId, [{ baseParams, locale }])`](API.md#use-message-getter)

The changelog is [available on GitHub](https://github.com/eemeli/react-message-context/releases).

## Usage Examples

In addition to the examples included below and in the [API documentation], see [react-message-context-example] for a simple, but fully functional example of using this library along with [messageformat] and [messageformat-loader] to handle localized messages, with dynamic loading of non-default locales.

[react-message-context-example]: https://github.com/eemeli/react-message-context/tree/master/example#react-message-context-example
[react-message-context]: https://www.npmjs.com/package/react-message-context
[messageformat]: https://www.npmjs.com/package/messageformat
[messageformat-loader]: https://www.npmjs.com/package/messageformat-loader

---

Within a `MessageProvider`, access to the messages is possible using either the `Message` component, or via custom hooks such as `useMessageGetter`:

```js
import React from 'react'
import {
  Message,
  MessageProvider,
  useMessageGetter
} from 'react-message-context'

const messages = {
  message: 'Your message is important',
  answers: {
    sixByNine: ({ base }) => (6 * 9).toString(base),
    universe: 42
  }
}

function Equality() {
  const getAnswer = useMessageGetter('answers')
  const foo = getAnswer('sixByNine', { base: 13 })
  const bar = getAnswer('universe')
  return `${foo} and ${bar} are equal`
}

export const Example = () => (
  <MessageProvider messages={messages}>
    <ul>
      <li>
        <Message id="message" />
      </li>
      <li>
        <Equality />
      </li>
    </ul>
  </MessageProvider>
)

// Will render as:
//   - Your message is important
//   - 42 and 42 are equal
```

---

Using MessageProviders within each other allows for multiple locales and namespaces:

```jsx
import React from 'react'
import { Message, MessageProvider } from 'react-message-context'

export const Example = () => (
  <MessageProvider locale="en" messages={{ foo: 'FOO', qux: 'QUX' }}>
    <MessageProvider locale="fi" messages={{ foo: 'FÖÖ', bar: 'BÄR' }}>
      <ul>
        <li>
          <Message id="foo" />
        </li>
        <li>
          <Message id="foo" locale="en" />
        </li>
        <li>
          <Message id="bar" />
        </li>
        <li>
          <Message id="bar" locale="en" />
        </li>
        <li>
          <Message id="qux" />
        </li>
        <li>
          <Message id="quux">xyzzy</Message>
        </li>
      </ul>
    </MessageProvider>
  </MessageProvider>
)

// Will render as:
// - FÖÖ
// - FOO
// - BÄR
// - bar  (uses fallback to key)
// - QUX  (uses fallback to "en" locale)
// - xyzzy  (uses fallback to child node)
```
