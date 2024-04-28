class ModelMongoDB{
    constructor() {}

    obtenerLibros = async id => {    
        if(id) {
            return {}
        }
        else {
            return []
        }
    }

    guardarLibro = async libro => {
        return {}
    }

    actualizarLibro = async (id, libro) => {
            return {}
    }

    borrarLibro = async id => {
        return {}    
    }
}

export default ModelMongoDB