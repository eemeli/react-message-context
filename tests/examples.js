import { fromJS } from 'immutable'
import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import { Message, MessageProvider, withMessages } from '../src/index'

// actually precompiled with messageformat-cli
import en from './fixtures/messages_en'
import fi from './fixtures/messages_fi'

test('Example 1', () => {
  const messages = {
    message: 'Your message',
    answers: {
      sixByNine: ({ base }) => (6 * 9).toString(base),
      universe: 42
    }
  }

  const Equality = ({ messages: { sixByNine, universe } }) => (
    `${sixByNine({ base: 13 })} and ${universe} are equal`
  )
  const WrappedEquality = withMessages('answers')(Equality)

  const App = () => <ul>
    <li><Message id='message' /> is important</li>
    <li>The answer is <Message id='answers.sixByNine' base={13} /></li>
    <li><WrappedEquality /></li>
  </ul>

  const component = renderer.create(
    <MessageProvider messages={messages}>
      <App />
    </MessageProvider>,
  )
  expect(component.toJSON()).toMatchSnapshot()
})

describe('Example 2', () => {
  const Errors = () => <ul>
    <li>
      <Message id='errors.wrong_length' length={42} />
    </li>
    <li>
      <Message id='errors.equal_to' count={13} />
    </li>
  </ul>

  test('With plain object', () => {
    const messages = { en, fi }
    const component = renderer.create(
      <MessageProvider locale='fi' fallback='en' messages={messages}>
        <Errors />
      </MessageProvider>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('With immutable Map', () => {
    const messages = fromJS({ en, fi })
    const component = renderer.create(
      <MessageProvider locale='fi' fallback='en' messages={messages}>
        <Errors />
      </MessageProvider>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
