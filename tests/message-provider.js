import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import { Consumer } from '../src/message-context'
import MessageProvider from '../src/message-provider'

const TestConsumer = () => (
  <Consumer>
    {({ locales, messages }) => `message keys: ${Object.keys(messages)}; locales: ${locales}`}
  </Consumer>
)

class TestState extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fallback: props.fallback,
      locale: props.locale,
      messages: props.messages
    }
  }
  render () {
    const { fallback, locale, messages } = this.state
    return (
      <MessageProvider fallback={fallback} locale={locale} messages={messages}>
        <TestConsumer />
      </MessageProvider>
    )
  }
}

test('Minimal messages; no locale', () => {
  const component = renderer.create(
    <MessageProvider messages={{ x: {} }}>
      <TestConsumer />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe('message keys: x; locales: ')
})

test('Custom & changed values', () => {
  const component = renderer.create(<TestState messages={{ bb: {}, cc: {} }} fallback={['bb', 'cc']} locale='aa' />)
  expect(component.toJSON()).toBe('message keys: bb,cc; locales: aa,bb,cc')
  component.root.instance.setState({ messages: { bb: {} }, fallback: 'bb', locale: 'dd' })
  expect(component.toJSON()).toBe('message keys: bb; locales: dd,bb')
})
