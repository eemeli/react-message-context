import PropTypes from 'prop-types'

export const PathType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string)
])

