const extend = require('xtend')
const MetamaskController = require('../metamask-controller')

function setData (data) {
  window.localStorage[STORAGE_KEY] = JSON.stringify(data)
}

function getOldStyleData () {
  var config, wallet, seedWords

  var result = {
    meta: { version: 0 },
    data: {},
  }

  try {
    config = JSON.parse(window.localStorage['config'])
    result.data.config = config
  } catch (e) {}
  try {
    wallet = JSON.parse(window.localStorage['lightwallet'])
    result.data.wallet = wallet
  } catch (e) {}
  try {
    seedWords = window.localStorage['seedWords']
    result.data.seedWords = seedWords
  } catch (e) {}

  return result
}

const STORAGE_KEY = 'metamask-config'
function loadData () {
  var oldData = getOldStyleData()
  var newData
  try {
    newData = JSON.parse(window.localStorage[STORAGE_KEY])
  } catch (e) {}

  var data = extend({
    meta: {
      version: 0,
    },
    data: {
      config: {
        provider: {
          type: 'testnet',
        },
      },
    },
  }, oldData || null, newData || null)
  return data
}

const noop = function () {}
const controller = new MetamaskController({
  // User confirmation callbacks:
  showUnconfirmedMessage: noop,
  unlockAccountMessage: noop,
  showUnapprovedTx: noop,
  // Persistence Methods:
  setData,
  loadData,
})

module.exports = controller
