import React from 'react'
import renderer from 'react-test-renderer'

import { MessageProvider, useMessage } from '../src/index'

function ShowMessage({ id, locale, params }) {
  const msg = useMessage(id, locale)
  return JSON.stringify(params ? msg(params) : msg)
}

const cases = [
  {
    title: 'No locale',
    locale: undefined,
    messages: { x: { y: 'Y' } }
  },
  {
    title: 'Set locale',
    locale: 'lc',
    messages: { x: { y: 'Y' } }
  }
]

for (const { title, locale, messages } of cases) {
  describe(title, () => {
    test('Array id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage id={['x', 'y']} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('String path id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage id="x.y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('No id', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('{"x":{"y":"Y"}}')
    })

    test('Custom path separator', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages} pathSep="/">
          <ShowMessage id="x/y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('"Y"')
    })

    test('Object value', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={messages}>
          <ShowMessage id="x" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('{"y":"Y"}')
    })

    test('Function value', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={{ x: p => p }}>
          <ShowMessage id="x" params={{ p: 'P' }} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('{"p":"P"}')
    })
  })
}

describe('Wrapped provider', () => {
  test('Inherited locale', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'ALT' }}>
        <MessageProvider locale="lc" messages={{ x: 'LC' }}>
          <ShowMessage id="x" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('"LC"')
  })

  test('Locale as string', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'ALT' }}>
        <MessageProvider locale="lc" messages={{ x: 'LC' }}>
          <ShowMessage locale="alt" id="x" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('"ALT"')
  })

  test('Locale as array', () => {
    const component = renderer.create(
      <MessageProvider locale="alt" messages={{ x: 'ALT' }}>
        <MessageProvider locale="lc" messages={{ x: 'LC' }}>
          <ShowMessage locale={['nonesuch', 'alt']} id="x" />
        </MessageProvider>
      </MessageProvider>
    )
    expect(component.toJSON()).toBe('"ALT"')
  })
})
