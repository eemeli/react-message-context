import { fromJS } from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import { Message, MessageProvider, useMessageGetter } from '../src/index'

// actually precompiled with messageformat-cli
import en from './fixtures/messages_en'
import fi from './fixtures/messages_fi'

test('Example 1', () => {
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

  const Example = () => (
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

  const component = renderer.create(
    <MessageProvider messages={messages}>
      <Example />
    </MessageProvider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})

describe('Example 2', () => {
  const ComponentErrors = () => (
    <ul>
      <li>
        <Message id="errors.wrong_length" length={42} />
      </li>
      <li>
        <Message id="errors.equal_to" count={13} />
      </li>
    </ul>
  )

  function HookErrors() {
    const getErrorMsg = useMessageGetter('errors')
    return (
      <ul>
        <li>{getErrorMsg('wrong_length', { length: 42 })}</li>
        <li>{getErrorMsg('equal_to', { count: 13 })}</li>
      </ul>
    )
  }

  test('ComponentErrors with plain object', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={en}>
        <MessageProvider locale="fi" messages={fi}>
          <ComponentErrors />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('ComponentErrors wWith immutable Map', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={fromJS(en)}>
        <MessageProvider locale="fi" messages={fromJS(fi)}>
          <ComponentErrors />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('HookErrors with plain object', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={en}>
        <MessageProvider locale="fi" messages={fi}>
          <HookErrors />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  test('HookErrors wWith immutable Map', () => {
    const component = renderer.create(
      <MessageProvider locale="en" messages={fromJS(en)}>
        <MessageProvider locale="fi" messages={fromJS(fi)}>
          <HookErrors />
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
