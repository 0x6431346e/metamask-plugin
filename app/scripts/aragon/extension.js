const runtime = require('./runtime')

const noop = () => null

module.exports = {
  runtime,
  extension: {
    getURL: (path) => `metamask://app/${path}`,
  },
  browserAction: {
    setBadgeText: noop,
    setBadgeBackgroundColor: noop,
  },
}
