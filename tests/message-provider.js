import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import { MessageContext, MessageProvider } from '../src/index'

const TestConsumer = () => (
  <MessageContext.Consumer>
    {context => JSON.stringify(context)}
  </MessageContext.Consumer>
)

test('Minimal messages; no locale', () => {
  const component = renderer.create(
    <MessageProvider messages={{ x: {} }}>
      <TestConsumer />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe(
    '{"locales":[""],"messages":{"":{"x":{}}},"pathSep":"."}'
  )
})

test('Minimal messages with locale', () => {
  const component = renderer.create(
    <MessageProvider locale="aa" messages={{ x: {} }}>
      <TestConsumer />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe(
    '{"locales":["aa"],"messages":{"aa":{"x":{}}},"pathSep":"."}'
  )
})

describe('pathSep', () => {
  test('Set by string prop', () => {
    const component = renderer.create(
      <MessageProvider pathSep="/" messages={{}}>
        <TestConsumer />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":[""],"messages":{"":{}},"pathSep":"/"}'
    )
  })

  test('Disabled by false prop', () => {
    const component = renderer.create(
      <MessageProvider pathSep={false} messages={{}}>
        <TestConsumer />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":[""],"messages":{"":{}},"pathSep":null}'
    )
  })

  test('Ignore inner pathSep', () => {
    const component = renderer.create(
      <MessageProvider messages={{}} pathSep=":">
        <MessageProvider messages={{}} pathSep="/">
          <MessageProvider messages={{}} pathSep={true}>
            <TestConsumer />
          </MessageProvider>
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":[""],"messages":{"":{}},"pathSep":":"}'
    )
  })
})

test('Changed values', () => {
  class TestState extends Component {
    constructor(props) {
      super(props)
      this.state = {
        locale: props.locale,
        messages: props.messages
      }
    }
    render() {
      const { locale, messages } = this.state
      return (
        <MessageProvider locale={locale} messages={messages}>
          <TestConsumer />
        </MessageProvider>
      )
    }
  }

  const component = renderer.create(
    <TestState locale="aa" messages={{ bb: {}, cc: {} }} />
  )
  expect(component.toJSON()).toBe(
    '{"locales":["aa"],"messages":{"aa":{"bb":{},"cc":{}}},"pathSep":"."}'
  )
  component.root.instance.setState({
    messages: { bb: {} },
    locale: 'dd'
  })
  expect(component.toJSON()).toBe(
    '{"locales":["dd"],"messages":{"dd":{"bb":{}}},"pathSep":"."}'
  )
})

describe('Inheritance', () => {
  test('No locales', () => {
    const component = renderer.create(
      <MessageProvider messages={{ bb: {}, cc: {} }}>
        <MessageProvider messages={{ dd: {} }}>
          <TestConsumer />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":[""],"messages":{"":{"bb":{},"cc":{},"dd":{}}},"pathSep":"."}'
    )
  })

  test('Different locale', () => {
    const component = renderer.create(
      <MessageProvider locale="aa" messages={{ bb: {}, cc: {} }}>
        <MessageProvider locale="xx" messages={{ dd: {} }}>
          <TestConsumer />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":["xx","aa"],"messages":{"aa":{"bb":{},"cc":{}},"xx":{"dd":{}}},"pathSep":"."}'
    )
  })

  test('Same locale, different keys', () => {
    const component = renderer.create(
      <MessageProvider locale="aa" messages={{ bb: {}, cc: {} }}>
        <MessageProvider locale="aa" messages={{ dd: {} }}>
          <TestConsumer />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":["aa"],"messages":{"aa":{"bb":{},"cc":{},"dd":{}}},"pathSep":"."}'
    )
  })

  test('Same locale, overlapping keys', () => {
    const component = renderer.create(
      <MessageProvider locale="aa" messages={{ bb: {}, cc: {} }}>
        <MessageProvider locale="aa" messages={{ cc: 'CC', dd: {} }}>
          <TestConsumer />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe(
      '{"locales":["aa"],"messages":{"aa":{"bb":{},"cc":"CC","dd":{}}},"pathSep":"."}'
    )
  })
})
