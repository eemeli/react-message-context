import React, { Component } from 'react'
import renderer from 'react-test-renderer'

import MessageProvider from '../src/message-provider'
import withLocale from '../src/with-locale'

const ShowLocale = ({ locale }) => String(locale)

test('No locale', () => {
  const Wrapped = withLocale(ShowLocale)
  const component = renderer.create(
    <MessageProvider messages={{ x: 'X' }}>
      <Wrapped />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe('undefined')
})

test('Plain locale', () => {
  const Wrapped = withLocale(ShowLocale)
  const component = renderer.create(
    <MessageProvider messages={{ x: 'X' }} locale='lc'>
      <Wrapped />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe('lc')
})

test('Emoji locale', () => {
  const Wrapped = withLocale(ShowLocale)
  const component = renderer.create(
    <MessageProvider messages={{ x: 'X' }} locale='🤪'>
      <Wrapped />
    </MessageProvider>
  )
  expect(component.toJSON()).toBe('🤪')
})


