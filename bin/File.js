
class File{

    constructor(uuid,name,size,type){
        this.uuid = uuid;
        this.name = name;
        this.size = size;
        this.type = type;
    }

    serialize(){
        return {uuid:this.uuid,name:this.name,size:this.size,type:this.type};
    }
}

module.exports = File