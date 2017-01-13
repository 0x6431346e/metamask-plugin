if (!global._runtime) global._runtime = {}

// TODO: This currently works for one client and one server. Shall we support multiple?
class Port {
  constructor({ name }, peer) {
    this.name = name
    this.peer = peer

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
    this.peer._write(msg)
  }

  _write(data) {
    this._fireListeners('message', data)
  }
}

module.exports = {
  connect: ({ name }) => {
    const client = new Port({ name }, global._runtime.server)
    global._runtime.onConnect(client)
    return global._runtime.server
  },
  onConnect: {
    addListener: (cb) => {
      global._runtime.server = new Port({ name: 'server' })
      global._runtime.onConnect = (client) => {
        global._runtime.server.peer = client
        cb(client)
      }
    }
  },
  onInstalled: { addListener: () => {} },
  reload: () => {},
}
