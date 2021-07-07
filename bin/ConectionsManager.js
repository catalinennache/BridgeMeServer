const Connection = require('./Connection');

class ConnectionsManager{

    constructor(){
        this.registry = {}
        this.device_token = {}
    }

    getConnection(token){
        return this.registry[token]?this.registry[token]:this.createNewConnection(token);
    };

    createNewConnection(token){
        this.registry[token] = new Connection(token);
        return this.getConnection(token)
    }

    getTokenBySid(socketid){
        return this.device_token[socketid]
    }
    mapSidWithToken(token,socketid){
        this.device_token[socketid] = token
    }

    update(token, connection){
        this.registry[token] = connection;
    }



}

/*
var connectionManager = {
    registry:{},
    device_token:{},
    getConnection:function(token){return this.registry[token]?this.registry[token]:this.createNewConnection(token)},
    createNewConnection:function(token){this.registry[token]={peers:[],app:undefined,stream:undefined,mimeType:undefined,name:undefined}; return this.getConnection(token)},
    addPeer:function(token,socket){this.getConnection(token).peers.push(socket);},
    setApp:function(token,socket){ var con = this.getConnection(token); con.app = socket; this.registry[token] = con; this.mapIdWithToken(token,socket.id)},
    setStream:function(token,stream){ var con = this.getConnection(token); con.stream = stream; this.registry[token] = con;},
    setMimeType:function(token,mimeType){ var con = this.getConnection(token); con.mimeType = mimeType; this.registry[token] = con;},
    setFileName:function(token,name){ var con = this.getConnection(token); con.name = name; this.registry[token] = con;},
    getTokenBySocketID:function(id){return this.device_token[id]},
    mapIdWithToken:function(token,id){this.device_token[id] = token}
  }
*/

module.exports = ConnectionsManager