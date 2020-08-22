<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [react-message-context](./react-message-context.md) &gt; [useMessage](./react-message-context.usemessage.md)

## useMessage() function

A custom React hook providing an entry from the messages object of the current or given locale. The returned value will be `undefined` if not found.

If the identified message value is a function, the returned value will be the result of calling it with a single argument `params`<!-- -->, or `{}` if empty. Otherwise the value set in the `MessageProvider` props will be returned directly.

<b>Signature:</b>

```typescript
export declare function useMessage(id: Id, params?: any, locale?: Id): any;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  id | Id | The key or key path of the message or message object. If empty or <code>[]</code>, matches the root of the messages object |
|  params | any | Argument to use if the identified message is a function |
|  locale | Id | If set, overrides the current locale precedence as set by parent MessageProviders. |

<b>Returns:</b>

any
