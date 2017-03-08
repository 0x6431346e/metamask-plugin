const MAINET_RPC_URL = 'https://mainnet.infura.io/metamask'
const TESTNET_RPC_URL = 'https://ropsten.infura.io/metamask'
const ARAGON_KOVAN_RPC_URL = 'https://kovan.aragon.one'
const DEFAULT_RPC_URL = ARAGON_KOVAN_RPC_URL

global.METAMASK_DEBUG = 'GULP_METAMASK_DEBUG'
global.ARAGON = 'GULP_ARAGON'

module.exports = {
  network: {
    default: DEFAULT_RPC_URL,
    mainnet: MAINET_RPC_URL,
    testnet: TESTNET_RPC_URL,
    morden: TESTNET_RPC_URL,
    kovan: ARAGON_KOVAN_RPC_URL,
  },
}
