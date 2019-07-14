import { fromJS } from 'immutable'
import React from 'react'
import renderer from 'react-test-renderer'

import MessageProvider from '../src/message-provider'
import useMessageGetter from '../src/use-message-getter'

function ShowMessage({ rootId, locales, baseParams, msgId, msgParams }) {
  const message = useMessageGetter({ id: rootId, locales, params: baseParams })
  return JSON.stringify(message(msgId, msgParams))
}

const cases = [
  {
    title: 'No locale, object messages',
    locale: undefined,
    messages: { x: { y: 'Y' } }
  },
  {
    title: 'Set locale, object messages',
    locale: 'lc',
    messages: { x: { y: 'Y' } }
  },
  {
    title: 'No locale, immutable messages',
    locale: undefined,
    messages: fromJS({ x: { y: 'Y' } })
  },
  {
    title: 'Set locale, immutable messages',
    locale: 'lc',
    messages: fromJS({ x: { y: 'Y' } })
  }
]

for (const { title, locale, messages } of cases) {
  describe(title, () => {
    test('Root and message ids', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage rootId="x" msgId="y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('Root array id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage rootId={['x', 'y']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('Root string path id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage rootId="x.y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('Empty root, array message id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage msgId={['x', 'y']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('Empty root, string path id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage msgId="x.y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('Object value', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage msgId="x" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('{"y":"Y"}')
    })

    test('Empty root, custom path separator', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages} pathSep="/">
          <ShowMessage msgId="x/y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })
  })
}

describe('Wrapped provider', () => {
  test('Inherited locale', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'XX' }}>
        <MessageProvider locale="lc" messages={{ x: 'X' }}>
          <ShowMessage rootId="x" />
          <ShowMessage msgId="x" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchObject(['"X"', '"X"'])
  })

  test('Locale as string', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'XX' }}>
        <MessageProvider locale="lc" messages={{ x: 'X' }}>
          <ShowMessage locales="alt" rootId="x" />
          <ShowMessage locales="alt" msgId="x" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchObject(['"XX"', '"XX"'])
  })

  test('Locale as array', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'XX' }}>
        <MessageProvider locale="lc" messages={{ x: 'X' }}>
          <ShowMessage locales={['nonesuch', 'alt']} rootId="x" />
          <ShowMessage locales={['nonesuch', 'alt']} msgId="x" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toMatchObject(['"XX"', '"XX"'])
  })
})
