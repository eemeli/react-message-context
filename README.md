# react-message-context

React message provider, using the React [Context API]. Works well with just one
or many locales, and with messages stored as strings or functions. Designed in
particular for use with [messageformat].

[context api]: https://reactjs.org/docs/context.html
[messageformat]: https://messageformat.github.io

## Installation

```
npm install react-message-context react prop-types
```

React and prop-types are peer dependencies. **React 16.8** or later is required.

## Documentation

#### [API](API.md)

- [`getMessage(context, id, [locale])`](API.md#get-message)
- [`MessageContext`](API.md#message-context)
- [`<MessageProvider messages [locale] [pathSep]>`](API.md#message-provider)
- [`<Message id [locale] [onError] [props] [...msgProps]>`](API.md#message)
- [`useLocales()`](API.md#use-locales)
- [`useMessage(id, [locale])`](API.md#use-message)
- [`useMessageGetter(rootId, [{ baseParams, locale }])`](API.md#use-message-getter)

## Examples

Within a `MessageProvider`, access to the messages is possible using either the
`Message` component, or via custom hooks such as `useMessage`:

```js
import React from 'react'
import { Message, MessageProvider, useMessage } from 'react-message-context'

const messages = {
  message: 'Your message is important',
  answers: {
    sixByNine: ({ base }) => (6 * 9).toString(base),
    universe: 42
  }
}

function Equality() {
  const foo = useMessage('answers.sixByNine')
  const bar = useMessage('answers.universe')
  return `${foo({ base: 13 })} and ${bar} are equal`
}

export const Example = () => (
  <MessageProvider messages={messages}>
    <ul>
      <li>
        <Message id="message" />
      </li>
      <li>
        The answer is <Message id="answers.sixByNine" base={13} />
      </li>
      <li>
        <Equality />
      </li>
    </ul>
  </MessageProvider>
)

// Will render as:
//   - Your message is important
//   - The answer is 42
//   - 42 and 42 are equal
```

---

Using MessageProviders within each other allows for multiple locales and
namespaces:

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
```

---

For a more complete experience, use [messageformat] and [messageformat-loader],
which allows for importing your messages from multiple sources. As a
demonstration of locale fallback, both of the following will render as:

```
- Viestisi on väärän pituinen (pitäisi olla 42 merkkiä)
- The value must be equal to 13
```

[messageformat-loader]: https://www.npmjs.com/package/messageformat-loader

#### messages_en.yaml

```yaml
confirm: Are you sure?
errors:
  wrong_length: |
    Your message is the wrong length (should be {length, plural,
      one {1 character}
      other {# characters}
    })
  equal_to: The value must be equal to {count}
```

#### messages_fi.yaml

```yaml
confirm: Oletko varma?
errors:
  wrong_length: |
    Viestisi on väärän pituinen (pitäisi olla {length, plural,
      one {1 merkki}
      other {# merkkiä}
    })
```

#### component-errors.js

```jsx
import React from 'react'
import { Message } from 'react-message-context'

export const ComponentErrors = () => (
  <ul>
    <li>
      <Message id="errors.wrong_length" length={42} />
    </li>
    <li>
      <Message id="errors.equal_to" count={13} />
    </li>
  </ul>
)
```

#### hook-errors.js

```jsx
import React from 'react'
import { useMessageGetter } from 'react-message-context'

export function HookErrors() {
  const getErrorMsg = useMessageGetter('errors')
  return (
    <ul>
      <li>{getErrorMsg('wrong_length', { length: 42 })}</li>
      <li>{getErrorMsg('equal_to', { count: 13 })}</li>
    </ul>
  )
}
```

#### example.js

```jsx
import React from 'react'
import { MessageProvider } from 'react-message-context'

import { ComponentErrors } from './component-errors'
import { HookErrors } from './hook-errors'
import en from './messages_en.yaml'
import fi from './messages_fi.yaml'

export const Example = () => (
  <MessageProvider locale="en" messages={en}>
    <MessageProvider locale="fi" messages={fi}>
      <ComponentErrors />
      <HookErrors />
    </MessageProvider>
  </MessageProvider>
)
```
