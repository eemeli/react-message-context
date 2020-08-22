export const errorMessages = {
  EBADMSG: 'Message with unexpected object value',
  ENOMSG: 'Message not found'
}

export class MessageError extends Error {
  constructor(path, code, asId) {
    super(`${errorMessages[code]}: ${asId(path)}`)
    this.code = code
    this.path = path
  }
}

