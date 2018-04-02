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


## Example

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Message, MessageProvider, withMessages } from 'react-message-context'

const messages = {
  message: 'Your message',
  answers: {
    sixByNine: ({ base }) => (6*9).toString(base)
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
  <MessageProvider data={messages}>
    <App />
  </MessageProvider>,
  document.getElementById('root')
)
```
