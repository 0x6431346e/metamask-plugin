//
// The default state of MetaMask
//

const MetamaskConfig = require('./config.js')

const KOVAN_RPC = MetamaskConfig.network.kovan

module.exports = {
  config: {
    provider: {
      type: 'rpc',
      rpcTarget: KOVAN_RPC,
    },
  },
}
