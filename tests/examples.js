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

  const Equality = ({ messages }) => {
    const foo = messages('sixByNine', { base: 13 })
    const bar = messages('universe')
    return `${foo} and ${bar} are equal`
  }
  const WrappedEquality = withMessages('answers')(Equality)

  const App = () => (
    <ul>
      <li>
        <Message id="message" /> is important
      </li>
      <li>
        The answer is <Message id="answers.sixByNine" base={13} />
      </li>
      <li>
        <WrappedEquality />
      </li>
    </ul>
  )

  const component = renderer.create(
    <MessageProvider messages={messages}>
      <App />
    </MessageProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

describe('Example 2', () => {
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

  test('With plain object', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={en}>
        <MessageProvider locale="fi" messages={fi}>
          <Errors />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('With immutable Map', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={fromJS(en)}>
        <MessageProvider locale="fi" messages={fromJS(fi)}>
          <Errors />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('Example 3', () => {
  test('With plain object', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={{ foo: 'FOO', qux: 'QUX' }}>
        <MessageProvider locale="fi" messages={{ foo: 'FÖÖ', bar: 'BÄR' }}>
          <Message id="foo" />
          <Message id="foo" locale="en" />
          <Message id="bar" />
          <Message id="bar" locale="en" />
          <Message id="qux" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('With immutable Map', () => {
    const en = fromJS({ foo: 'FOO', qux: 'QUX' })
    const fi = fromJS({ foo: 'FÖÖ', bar: 'BÄR' })
    const component = renderer.create(
      <MessageProvider locale="en" messages={en}>
        <MessageProvider locale="fi" messages={fi}>
          <Message id="foo" />
          <Message id="foo" locale="en" />
          <Message id="bar" />
          <Message id="bar" locale="en" />
          <Message id="qux" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
