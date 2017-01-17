const runtime = require('./runtime')

const noop = () => null

module.exports = {
  runtime,
  extension: {
    getURL: (path) => (
      // `${window.location.origin}/${path}`
      `http://localhost:8000/${path}`
    )
  },
  browserAction: {
    setBadgeText: noop,
    setBadgeBackgroundColor: noop,
  },
}
