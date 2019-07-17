# react-message-context-example

A simple, but fully functional example of using [react-message-context], [messageformat], and [messageformat-loader] to handle localized messages, with dynamic loading of non-default locales.

[react-message-context]: https://www.npmjs.com/package/react-message-context
[messageformat]: https://www.npmjs.com/package/messageformat
[messageformat-loader]: https://www.npmjs.com/package/messageformat-loader

To install and run:

```sh
git clone https://github.com/eemeli/react-message-context.git

# Need to build the core package first
cd react-message-context
npm install
npm run build

cd example
npm install
npm run build

open dist/index.html
```

Note that `'react'` and `'react-dom'` are not included in the example's `package.json`. This is intentional, because the `react-message-context` dependency is a relative link, and we need to make sure that we don't end up with two different React instances -- otherwise we'd be breaking the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html).
