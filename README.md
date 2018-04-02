# react-message-context

React message provider, using the [Context API] introduced in React 16.3. Works
well with just one or many locales, and with messages stored as strings or
functions. Designed in particular for use with [messageformat].

[Context API]: https://reactjs.org/docs/context.html
[messageformat]: https://messageformat.github.io


## Installation

```
npm install react-message-context react prop-types
```

React and prop-types are peer dependencies. **React 16.3** or later is required.


## Documentation

#### [API](API.md)
- [`<MessageProvider messages [fallback] [locale]>`](API.md#message-provider)
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
    sixByNine: ({ base }) => (6 * 9).toString(base)
    universe: 42
  }
}

const Equality = ({ messages: { sixByNine, universe } }) => (
  `${sixByNine(13)} and ${universe} are equal`
)

const WrappedEquality = withMessages('answers')(Equality)

const App = () => <ul>
  <li><Message id='message' /> is important</li>
  <li>The answer is <Message id={['answers', 'sixByNine']} base={13} /></li>
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

----

Using [messageformat] and [messageformat-properties-loader], defaulting to
Finnish but using English as a fallback locale:

[messageformat-properties-loader]: https://www.npmjs.com/package/messageformat-properties-loader

#### messages_en.properties
```
message: Your message
value: The value
errors.accepted: must be accepted
errors.wrong_length: is the wrong length (should be {count, plural, one{1 character} other{# characters}})
errors.equal_to: must be equal to {count}
```

#### messages_fi.properties
```
message: Viestisi
errors.accepted: pitää hyväksyä
errors.wrong_length: on väärän pituinen (pitäisi olla {count, plural, one{1 merkki} other{# merkkiä}})
```

#### example.js
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Message, MessageProvider } from 'react-message-context'

import en from './messages_en.properties'
import fi from './messages_fi.properties'
const messages = { en, fi }

const Errors = () => <ul>
  <li>
    <Message id='message' />{' '}
    <Message id={['errors', 'wrong_length']} count={42} />
  </li>
  <li>
    <Message id='value' />{' '}
    <Message id={['errors', 'equal_to']} count={13} />
  </li>
</ul>

ReactDOM.render(
  <MessageProvider locale='fi' fallback='en' messages={messages}>
    <Errors />
  </MessageProvider>,
  document.getElementById('root')
)

// Will render as:
//   - Viestisi on väärän pituinen (pitäisi olla 42 merkkiä)
//   - The value must be equal to 13
```
