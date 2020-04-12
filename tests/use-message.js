import React from 'react'
import renderer from 'react-test-renderer'

import { MessageProvider, useMessage } from '../src/index'

function ShowMessage({ id, locale, params }) {
  const msg = useMessage(id, params, locale)
  return JSON.stringify(msg) || null
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

    test('Function value: Object', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={{ x: p => p }}>
          <ShowMessage id="x" params={{ p: 'P' }} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('{"p":"P"}')
    })

    test('Function value: false', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={{ x: p => p }}>
          <ShowMessage id="x" params={false} />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('false')
    })

    test('Function value without params', () => {
      const component = renderer.create(
        <MessageProvider locale={locale} messages={{ x: p => p }}>
          <ShowMessage id="x" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBe('{}')
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

describe('Reporting errors', () => {
  test('onError={null}', () => {
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }} onError={null}>
        <ShowMessage id="y" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBeNull()
  })

  test('onError="warn"', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation()
    try {
      const component = renderer.create(
        <MessageProvider messages={{ x: 'X' }} onError="warn">
          <ShowMessage id="y" />
        </MessageProvider>
      )
      expect(component.toJSON()).toBeNull()
      expect(warn).toHaveBeenCalledTimes(1)
    } finally {
      warn.mockRestore()
    }
  })

  describe('onError="error"', () => {
    // Silence pointless console errors until this is resolved:
    // https://github.com/facebook/react/pull/17383
    let spy
    beforeAll(() => {
      spy = jest.spyOn(console, 'error').mockImplementation()
    })
    afterAll(() => {
      spy.mockRestore()
    })

    class Catch extends React.Component {
      state = { error: null }
      static getDerivedStateFromError(error) {
        return { error }
      }
      render() {
        const { error } = this.state
        return error ? error.message : this.props.children
      }
    }

    test('Message not found', () => {
      const component = renderer.create(
        <Catch>
          <MessageProvider messages={{ x: 'X' }} onError="error">
            <ShowMessage id="y" />
          </MessageProvider>
        </Catch>
      )
      expect(component.toJSON()).toBe('Message not found: y')
    })

    test('Expected function', () => {
      const component = renderer.create(
        <Catch>
          <MessageProvider messages={{ x: 'X' }} onError="error">
            <ShowMessage id="x" params={true} />
          </MessageProvider>
        </Catch>
      )
      expect(component.toJSON()).toBe(
        'Params given for non-function message: x'
      )
    })
  })

  test('onError={function}', () => {
    const onError = jest.fn()
    const component = renderer.create(
      <MessageProvider messages={{ x: 'X' }} onError={onError}>
        <ShowMessage id="y" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBeNull()
    expect(onError).toHaveBeenCalledWith('Message not found', 'y')
  })

  test('debug={function} (deprecated)', () => {
    const debug = jest.fn()
    const component = renderer.create(
      <MessageProvider debug={debug} messages={{ x: 'X' }}>
        <ShowMessage id="y" />
      </MessageProvider>
    )
    expect(component.toJSON()).toBeNull()
    expect(debug).toHaveBeenCalledWith('Message not found: y')
  })
})
