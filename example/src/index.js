import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { MessageProvider } from 'react-message-context'

import { App } from './app'

// Include the English messages in the core bundle, and use them as the
// default/fallback for missing messages.
import en from './messages.en.yaml'

function ProviderWrapper() {
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState({ en })

  // Only fetch messages when locale changes
  useEffect(() => {
    // In production, you may want a more comprehensive check than this
    if (messages[locale]) return

    // See https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
    import(/* webpackChunkName: "[request]" */ `./messages.${locale}.yaml`)
      .then(lcMessages => {
        // Create a new object for the updated state
        const next = Object.assign({}, messages)
        next[locale] = lcMessages
        setMessages(next)
      })
      .catch(error => {
        console.error(error)
        if (locale !== 'en') setLocale('en')
      })
  }, [locale])

  // For English, there's no reason to load the messages twice.
  // Note that setLocale could also be passed through using a separate Context
  return locale === 'en' ? (
    <App setLocale={setLocale} />
  ) : (
    <MessageProvider locale={locale} messages={messages[locale]}>
      <App setLocale={setLocale} />
    </MessageProvider>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
  // Make sure we always have some locale & messages
  <MessageProvider locale="en" messages={en}>
    <ProviderWrapper />
  </MessageProvider>,
  root
)
