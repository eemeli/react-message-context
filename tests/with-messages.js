import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import MessageProvider from '../src/message-provider'
import withMessages from '../src/with-messages'

describe('No locale', () => {
  test('String id', () => {
    const Wrapped = withMessages('x')(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('String array id', () => {
    const Wrapped = withMessages(['x', 'y'])(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('String path id', () => {
    const Wrapped = withMessages('x.y')(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Object value', () => {
    const Wrapped = withMessages(['x'])(({ messages }) => messages('y'))
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Empty path id', () => {
    const Wrapped = withMessages()(({ messages }) => messages('x.y'))
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }}>
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Custom path separator', () => {
    const Wrapped = withMessages('x/y')(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider messages={{ x: { y: 'Y' } }} pathSep="/">
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })
})

describe('With locale', () => {
  test('String id', () => {
    const Wrapped = withMessages('x')(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' } }} locale="lc">
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('String array id', () => {
    const Wrapped = withMessages(['x', 'y'])(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: { y: 'Y' } } }} locale="lc">
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Object value', () => {
    const Wrapped = withMessages(['x'])(({ messages }) => messages('y'))
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: { y: 'Y' } } }} locale="lc">
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })

  test('Alternative locale string', () => {
    const Wrapped = withMessages(['x'], 'alt')(({ messages }) => messages())
    const component = renderer.create(
      <MessageProvider
        messages={{ lc: { x: 'X' }, alt: { x: 'XX' } }}
        locale="lc"
      >
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('Alternative locale array', () => {
    const Wrapped = withMessages(['x'], ['none', 'alt'])(({ messages }) =>
      messages()
    )
    const component = renderer.create(
      <MessageProvider
        messages={{ lc: { x: 'X' }, alt: { x: 'XX' } }}
        locale="lc"
      >
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('Empty path id with custom path separator', () => {
    const Wrapped = withMessages()(({ messages }) => messages('x/y'))
    const component = renderer.create(
      <MessageProvider
        messages={{ lc: { x: { y: 'Y' } } }}
        locale="lc"
        pathSep="/"
      >
        <Wrapped />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('Y')
  })
})

test('Forwarded ref', () => {
  class TestRef extends Component {
    test = () => true
    render = () => String(this.props.messages())
  }
  const Wrapped = withMessages('x')(TestRef)

  const mockFn = jest.fn()
  const component = renderer.create(
    <MessageProvider messages={{ lc: { x: 'X' } }} locale="lc">
      <Wrapped ref={mockFn} />
    </MessageProvider>
  )

  expect(mockFn).toHaveBeenCalled()
  const ref = mockFn.mock.calls[0][0]
  expect(ref.test).toBeInstanceOf(Function)
  expect(ref.test()).toBe(true)
  expect(component.toJSON()).toBe('X')
})
