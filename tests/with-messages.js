import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import MessageProvider from '../src/message-provider'
import withMessages from '../src/with-messages'

const ShowMessages = ({ messages }) => {
  switch (typeof messages) {
    case 'object':
      return Array.isArray(messages)
        ? String(messages)
        : messages
          ? String(Object.keys(messages))
          : 'null'
    case 'function':
      return messages()
    default:
      return String(messages)
  }
}

describe('No locale', () => {
  test('String id', () => {
    const Wrapped = withMessages('x')(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('String array id', () => {
    const Wrapped = withMessages(['x', 'y'])(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Object value', () => {
    const Wrapped = withMessages(['x'])(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('y')
  })
})

describe('With locale', () => {
  test('String id', () => {
    const Wrapped = withMessages('x')(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' } }} locale='lc'>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('String array id', () => {
    const Wrapped = withMessages(['x', 'y'])(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: { y: 'Y' } } }} locale='lc'>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Object value', () => {
    const Wrapped = withMessages(['x'])(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: { y: 'Y' } } }} locale='lc'>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('y')
  })

  test('Alternative locale string', () => {
    const Wrapped = withMessages(['x'], 'alt')(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' }, alt: { x: 'XX' } }} locale='lc'>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('Alternative locale array', () => {
    const Wrapped = withMessages(['x'], ['none', 'alt'])(ShowMessages)
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' }, alt: { x: 'XX' } }} locale='lc'>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })
})

test('Forwarded ref', () => {
  class TestRef extends Component {
    test = () => true
    render = () => String(this.props.messages)
  }
  const Wrapped = withMessages('x')(TestRef)

  const mockFn = jest.fn()
  const component = renderer.create(
    <MessageProvider messages={{ lc: { x: 'X' } }} locale='lc'>
      <Wrapped ref={mockFn} />
    </MessageProvider>
  )

  expect(mockFn).toHaveBeenCalled()
  const ref = mockFn.mock.calls[0][0]
  expect(ref.test).toBeInstanceOf(Function)
  expect(ref.test()).toBe(true)
  expect(component.toJSON()).toBe('X')
})
