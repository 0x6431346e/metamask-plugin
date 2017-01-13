const runtime = require('./runtime')

window.isAragon = true

const noop = () => null

module.exports = {
  runtime,
  browserAction: {
    setBadgeText: noop,
    setBadgeBackgroundColor: noop,
  },
}
