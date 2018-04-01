import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import Message from '../src/message'
import MessageProvider from '../src/message-provider'

describe('No locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider data={{ x: 'X' }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider data={{ x: 42 }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('42')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider data={{ x: false }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('false')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider data={{ x: () => 'fun' }}>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message with props', () => {
    const component = renderer.create(
      <MessageProvider data={{ x: ({ v, w }) => `${v} ${w}` }}>
        <Message id='x' v='V' w='W' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('V W')
  })

  test('Function message with conflicting props', () => {
    const component = renderer.create(
      <MessageProvider data={{ x: ({ key }) => `${key}` }}>
        <Message id='x' props={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('With locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: 'X' } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: 42 } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('42')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: false } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('false')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: () => 'fun' } }} locale='lc'>
        <Message id='x' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun')
  })

  test('Function message with props', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: ({ v, w }) => `${v} ${w}` } }} locale='lc'>
        <Message id='x' v='V' w='W' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('V W')
  })

  test('Function message with conflicting props', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: ({ key }) => `${key}` } }} locale='lc'>
        <Message id='x' props={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('Alternative locale', () => {
  test('String message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: 'X' }, alt: { x: 'XX' } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('XX')
  })

  test('Number message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: 42 }, alt: { x: 420 } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('420')
  })

  test('Boolean message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: false }, alt: { x: true } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('true')
  })

  test('Function message', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: () => 'fun' }, alt: { x: 'fun!' } }} locale='lc'>
        <Message id='x' locale='alt' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('fun!')
  })

  test('Function message with props', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: ({ v, w }) => `${v} ${w}` }, alt: { x: ({ v, w }) => `${w} ${v}` } }} locale='lc'>
        <Message id='x' locale='alt' v='V' w='W' />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('W V')
  })

  test('Function message with conflicting props', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { x: ({ key }) => `${key}` } }} locale='lc'>
        <Message id='x' props={{ key: 'K' }} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('K')
  })
})

describe('Hierarchical data', () => {
  test('Object id, no locale', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { obj: { x: 'X' } } }}>
        <Message id={['lc', 'obj', 'x']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Object id, with locale', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { obj: { x: 'X' } } }} locale='lc'>
        <Message id={['obj', 'x']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('X')
  })

  test('Incomplete path, no error handler', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { obj: { x: 'X' } } }}>
        <Message id={['lc', 'obj']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('lc,obj')
  })

  test('Incomplete path, with error handler', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { obj: { x: 'X' } } }}>
        <Message id={['lc', 'obj']} onError={(id, type) => String(id.concat(type)) } />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('lc,obj,object')
  })

  test('Bad path, no error handler', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { obj: { x: 'X' } } }}>
        <Message id={['lc', 'none']} />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('lc,none')
  })

  test('Bad path, with error handler', () => {
    const component = renderer.create(
      <MessageProvider data={{ lc: { obj: { x: 'X' } } }}>
        <Message id={['lc', 'none']} onError={(id, type) => String(id.concat(type)) } />
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('lc,none,undefined')
  })
})
