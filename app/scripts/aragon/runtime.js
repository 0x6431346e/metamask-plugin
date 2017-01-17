if (!global._runtime) global._runtime = {}

class Port {
  constructor({ name }, peers = []) {
    this.name = name
    this.peers = peers

    this.listeners = {
      message: []
    }

    this.onMessage = {
      addListener: (cb) => this.listeners.message.push(cb)
    }

    this.onDisconnect = { addListener: (cb) => {} }
  }

  _fireListeners(kind, arg) {
    for (const listener of this.listeners[kind]) {
      if (!(listener instanceof Function)) return
      try {
        listener(arg)
      } catch (e) {
        console.log(e)
      }
    }
  }

  postMessage(msg) {
    for (const peer of this.peers) peer._write(msg)
  }

  _write(data) {
    this._fireListeners('message', data)
  }
}

module.exports = {
  connect: ({ name }) => {
    const client = new Port({ name }, [global._runtime.server])
    global._runtime.onConnect(client)
    return global._runtime.server
  },
  onConnect: {
    addListener: (cb) => {
      global._runtime.server = new Port({ name: 'server' })
      global._runtime.onConnect = (client) => {
        global._runtime.server.peers.push(client)
        cb(client)
      }
    }
  },
  onInstalled: { addListener: () => {} },
  reload: () => {},
}
