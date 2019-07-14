import { arrayOf, func, object, oneOfType, shape, string } from 'prop-types'

export const ContextType = shape({
  locales: arrayOf(string).isRequired,
  merge: func.isRequired,
  messages: object.isRequired,
  pathSep: string
})

export const PathType = oneOfType([string, arrayOf(string)])
