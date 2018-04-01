import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import { Consumer } from '../src/message-context'
import MessageProvider from '../src/message-provider'

const TestConsumer = () => (
  <Consumer>
    {({ data, locales }) => `data keys: ${Object.keys(data)}; locales: ${locales}`}
  </Consumer>
)

class TestState extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data,
      fallback: props.fallback,
      locale: props.locale
    }
  }
  render () {
    const { data, fallback, locale } = this.state
    return (
      <MessageProvider data={data} fallback={fallback} locale={locale}>
        <TestConsumer />
      </MessageProvider>
    )
  }
}

test('Minimal data; no locale', () => {
  const component = renderer.create(
    <MessageProvider data={{ x: {} }}>
      <TestConsumer />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe('data keys: x; locales: ')
})

test('Custom & changed values', () => {
  const component = renderer.create(<TestState data={{ bb: {}, cc: {} }} fallback={['bb', 'cc']} locale='aa' />)
  expect(component.toJSON()).toBe('data keys: bb,cc; locales: aa,bb,cc')
  component.root.instance.setState({ data: { bb: {} }, fallback: 'bb', locale: 'dd' })
  expect(component.toJSON()).toBe('data keys: bb; locales: dd,bb')
})
