
const File = require('./File')

class Connection{
    static SEEDER = 0;
    static PEER = 1;
    

    constructor(token){
        this.token = token;
        this.peer = null;
        this.seeder = null;
        this.files = {};
        
    }

    addFile(file){
        this.files[file.uuid] = file;
    }

    clearFiles(){
        this.files = {};
    }

    ackUploadRequest(upload_metadata){
        var fls = Object.values(this.files).map(file=>{return file.serialize()})
        this.isPeerNull();
        this.peer.emit('message',{event:"METADATA",metadata:fls})
    }

    forwardTo(target,data){
        if(target == Connection.SEEDER && this.seeder != null)
            this.seeder.emit('message',data);
        else if(target == Connection.PEER && this.peer != null)
            this.peer.emit('message',data);
        else 
            return false;
        
        return true
    }

    isPeerNull(){
        console.log(this.peer == null);
    }

    setPeer(socket){
        this.peer = socket;
        this.isPeerNull();
    }

    setSeeder(socket){
        this.seeder = socket;
    }
    
}

//{peers:[],app:undefined,stream:undefined,mimeType:undefined,name:undefined};

module.exports = Connection