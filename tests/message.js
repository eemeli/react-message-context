import React from 'react'
import renderer from 'react-test-renderer'

import { Message, MessageProvider } from '../src/index'

describe('No locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }}>
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 42 }}>
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('42')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: false }}>
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('false')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: () => 'fun' }}>
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message with params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: ({ v, w }) => `${v} ${w}` }}>
        <Message id="x" v="V" w="W" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('V W')
  })

  test('Function message with conflicting params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: ({ key }) => `${key}` }}>
        <Message id="x" params={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('With locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }} locale="lc">
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 42 }} locale="lc">
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('42')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: false }} locale="lc">
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('false')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: () => 'fun' }} locale="lc">
        <Message id="x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message with params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: ({ v, w }) => `${v} ${w}` }} locale="lc">
        <Message id="x" v="V" w="W" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('V W')
  })

  test('Function message with conflicting params', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: ({ key }) => `${key}` }} locale="lc">
        <Message id="x" params={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('Inherited locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'XX' }}>
        <MessageProvider locale="lc" messages={{ x: 'X' }}>
          <Message id="x" locale="alt" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('String message with array locale', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'XX' }}>
        <MessageProvider locale="lc" messages={{ x: 'X' }}>
          <Message id="x" locale={['none', 'alt']} />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 420 }}>
        <MessageProvider locale="lc" messages={{ x: 42 }}>
          <Message id="x" locale="alt" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('420')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: true }}>
        <MessageProvider locale="lc" messages={{ x: false }}>
          <Message id="x" locale="alt" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('true')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: () => 'FUN!' }}>
        <MessageProvider locale="lc" messages={{ x: () => 'fun' }}>
          <Message id="x" locale="alt" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('FUN!')
  })

  test('Function message with params', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: ({ v, w }) => `${w}${v}` }}>
        <MessageProvider locale="lc" messages={{ x: ({ v, w }) => `${v}${w}` }}>
          <Message id="x" locale="alt" v="V" w="W" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('WV')
  })
})

describe('Hierarchical messages', () => {
  test('Array id, no locale', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages}>
        <Message id={['obj', 'x']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Array id, with locale', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages} locale="lc">
        <Message id={['obj', 'x']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Path id, no locale', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages}>
        <Message id="obj.x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Path id, with locale', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages} locale="lc">
        <Message id="obj.x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Path id, custom separator', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages} pathSep="/">
        <Message id="obj/x" />
        <Message id="obj/y" />
        <Message id="obj.x" />
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchObject(['X', 'obj/y', 'obj.x'])
  })

  test('Incomplete path, no error handler', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages}>
        <Message id={['obj']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('obj')
  })

  test('Incomplete path, with error handler', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages}>
        <Message id={['obj']} onError={(id, type) => String(id.concat(type))} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('obj,object')
  })

  test('Bad path, custom pathSep', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages} pathSep="/">
        <Message id={['not', 'valid']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('not/valid')
  })

  test('Bad path, disabled pathSep', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages} pathSep={null}>
        <Message id={['not', 'valid']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('not,valid')
  })

  test('Bad path, no error handler', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages}>
        <Message id={['not', 'valid']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('not.valid')
  })

  test('Bad path, with error handler', () => {
    const messages = { obj: { x: 'X' } }
    const component = renderer.create(
      <MessageProvider messages={messages}>
        <Message
          id={['not', 'valid']}
          onError={(id, type) => String(id.concat(type))}
        />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('not,valid,undefined')
  })
})

describe('Render prop', () => {
  test('String message with lookup', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }}>
        <Message id="x">{msg => msg}</Message>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('String message without lookup', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }}>
        <Message>{msg => msg.x}</Message>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Function message with lookup', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: () => 'fun' }}>
        <Message id="x">{msg => msg()}</Message>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message without lookup', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: () => 'fun' }}>
        <Message>{msg => msg.x()}</Message>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })
})

test('Should not modify an array id', () => {
  const id = ['x']
  const component = renderer.create(
    <MessageProvider messages={{ x: 'X' }} locale="lc">
      <Message id={id} />
      {id}
    </MessageProvider>
  )
  expect(component.toJSON()).toEqual(['X', 'x'])
})
