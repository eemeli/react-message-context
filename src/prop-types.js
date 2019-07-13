import PropTypes from 'prop-types'

export const PathSepType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.string
])

export const PathType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string)
])
