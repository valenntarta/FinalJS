import ModelFile from "./librosFile.js";
import ModelMem from "./librosMem.js";
import ModelMongoDB from "./librosMongoDB.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log("persistiendo en memoria")
                return new ModelMem()

            case 'FILE':
                console.log("persistiendo en file system")
                return new ModelFile()

            case 'MONGODB':
                console.log("persistiendo en MongoDB")
                return new ModelMongoDB()

            default:
                console.log("persistiendo en memoria(default)")
                return new ModelMem()
        }
    }
}

export default ModelFactory