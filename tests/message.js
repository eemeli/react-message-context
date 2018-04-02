import { fromJS } from 'immutable'
import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import Message from '../src/message'
import MessageProvider from '../src/message-provider'

describe('No locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 42 }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('42')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: false }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('false')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: () => 'fun' }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message with params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: ({ v, w }) => `${v} ${w}` }}>
        <Message id='x' v='V' w='W' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('V W')
  })

  test('Function message with conflicting params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: ({ key }) => `${key}` }}>
        <Message id='x' params={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('With locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 42 } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('42')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: false } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('false')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: () => 'fun' } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message with params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: ({ v, w }) => `${v} ${w}` } }} locale='lc'>
        <Message id='x' v='V' w='W' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('V W')
  })

  test('Function message with conflicting params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: ({ key }) => `${key}` } }} locale='lc'>
        <Message id='x' params={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('Alternative locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' }, alt: { x: 'XX' } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('String message with array locale', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 'X' }, alt: { x: 'XX' } }} locale='lc'>
        <Message id='x' locale={['none', 'alt']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: 42 }, alt: { x: 420 } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('420')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: false }, alt: { x: true } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('true')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: () => 'fun' }, alt: { x: 'fun!' } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun!')
  })

  test('Function message with params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: ({ v, w }) => `${v} ${w}` }, alt: { x: ({ v, w }) => `${w} ${v}` } }} locale='lc'>
        <Message id='x' locale='alt' v='V' w='W' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('W V')
  })

  test('Function message with conflicting params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ lc: { x: ({ key }) => `${key}` } }} locale='lc'>
        <Message id='x' params={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

Object.entries({
  object: (obj) => obj,
  'immutable Map': (obj) => fromJS(obj)
}).forEach(([name, getMessages]) => {
  describe(`Hierarchical messages: ${name}`, () => {
    test('Object id, no locale', () => {
      const messages = getMessages({ lc: { obj: { x: 'X' } } })
      const component = renderer.create(
        <MessageProvider messages={messages}>
          <Message id={['lc', 'obj', 'x']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('X')
    })

    test('Object id, with locale', () => {
      const messages = getMessages({ lc: { obj: { x: 'X' } } })
      const component = renderer.create(
        <MessageProvider messages={messages} locale='lc'>
          <Message id={['obj', 'x']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('X')
    })

    test('Incomplete path, no error handler', () => {
      const messages = getMessages({ lc: { obj: { x: 'X' } } })
      const component = renderer.create(
        <MessageProvider messages={messages}>
          <Message id={['lc', 'obj']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('lc,obj')
    })

    test('Incomplete path, with error handler', () => {
      const messages = getMessages({ lc: { obj: { x: 'X' } } })
      const component = renderer.create(
        <MessageProvider messages={messages}>
          <Message id={['lc', 'obj']} onError={(id, type) => String(id.concat(type)) } />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('lc,obj,object')
    })

    test('Bad path, no error handler', () => {
      const messages = getMessages({ lc: { obj: { x: 'X' } } })
      const component = renderer.create(
        <MessageProvider messages={messages}>
          <Message id={['lc', 'none']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('lc,none')
    })

    test('Bad path, with error handler', () => {
      const messages = getMessages({ lc: { obj: { x: 'X' } } })
      const component = renderer.create(
        <MessageProvider messages={messages}>
          <Message id={['lc', 'none']} onError={(id, type) => String(id.concat(type)) } />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('lc,none,undefined')
    })
  })
})
