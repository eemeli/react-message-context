# react-message-context

React message provider, using the [Context API] introduced in React 16.3. Works
well with just one or many locales, and with messages stored as strings or
functions. Designed in particular for use with [messageformat].

[context api]: https://reactjs.org/docs/context.html
[messageformat]: https://messageformat.github.io

## Installation

```
npm install react-message-context react prop-types
```

React and prop-types are peer dependencies. **React 16.3** or later is required.

## Documentation

#### [API](API.md)

- [`<MessageProvider messages [locale] [pathSep]>`](API.md#message-provider)
- [`<Message id [locale] [onError] [props] [...msgProps]>`](API.md#message)
- [`withLocale(Component)`](API.md#with-locale)
- [`withMessages([id], [lc])(Component)`](API.md#with-messages)

## Examples

With no locale, using both `Message` and `withMessages`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Message, MessageProvider, withMessages } from 'react-message-context'

const messages = {
  message: 'Your message',
  answers: {
    sixByNine: ({ base }) => (6 * 9).toString(base),
    universe: 42
  }
}

const Equality = ({ messages }) => (
  const foo = messages('sixByNine', { base: 13 })
  const bar = messages('universe')
  return `${foo} and ${bar} are equal`
)
const WrappedEquality = withMessages('answers')(Equality)

const App = () => <ul>
  <li><Message id='message' /> is important</li>
  <li>The answer is <Message id='answers.sixByNine' base={13} /></li>
  <li><WrappedEquality /></li>
</ul>

ReactDOM.render(
  <MessageProvider messages={messages}>
    <App />
  </MessageProvider>,
  document.getElementById('root')
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

export Example = () => (
  <MessageProvider locale="en" messages={{ foo: 'FOO', qux: 'QUX' }}>
    <MessageProvider locale="fi" messages={{ foo: 'FÖÖ', bar: 'BÄR' }}>
      <ul>
      <li><Message id="foo" /></li>
      <li><Message id="foo" locale="en" /></li>
      <li><Message id="bar" /></li>
      <li><Message id="bar" locale="en" /></li>
      <li><Message id="qux" /></li>
      </ul>
    </MessageProvider>
  </MessageProvider>
)

// Will render as:
// - FÖÖ
// - FOO
// - BÄR
// - bar  // uses fallback to key
// - QUX  // uses fallback to "en" locale
```

---

Using [messageformat] and [messageformat-properties-loader], defaulting to
Finnish but using English as a fallback locale:

[messageformat-properties-loader]: https://www.npmjs.com/package/messageformat-properties-loader

#### messages_en.properties

```
confirm: Are you sure?
errors.wrong_length: Your message is the wrong length (should be \
  {length, plural, one{1 character} other{# characters}})
errors.equal_to: The value must be equal to {count}
```

#### messages_fi.properties

```
confirm: Oletko varma?
errors.wrong_length: Viestisi on väärän pituinen (pitäisi olla \
  {length, plural, one{1 merkki} other{# merkkiä}})
```

#### example.js

```jsx
import React from 'react'
import { Message, MessageProvider } from 'react-message-context'

import en from './messages_en.properties'
import fi from './messages_fi.properties'

const Errors = () => (
  <ul>
    <li>
      <Message id="errors.wrong_length" length={42} />
    </li>
    <li>
      <Message id="errors.equal_to" count={13} />
    </li>
  </ul>
)

export Example = () => (
  <MessageProvider locale="en" messages={en}>
    <MessageProvider locale="fi" messages={fi}>
      <Errors />
    </MessageProvider>
  </MessageProvider>
)

// Will render as:
//   - Viestisi on väärän pituinen (pitäisi olla 42 merkkiä)
//   - The value must be equal to 13
```

Note that in the preceding, `en` and `fi` could also be [immutable] Maps defined
with `fromJS()` with no other changes needed in the code.

[immutable]: https://facebook.github.io/immutable-js/
