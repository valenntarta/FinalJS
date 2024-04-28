class ModelMem {
    constructor() {
        this.libros = [
            { id: "1", titulo: 'Harry Potter 1', autor: "jk rowling", año: 2000 },
            { id: "2", titulo: 'Harry Potter 3', autor: "jk rowling", año: 2004 },
            { id: "3", titulo: 'Harry Potter 4', autor: "jk rowling", año: 2006 },
        ]
    }

    obtenerLibros = async id => {    
        if(id) {
            const libro =  this.libros.find( libro => libro.id === id )
            return libro || {}
        }
        else {
            return this.libros
        }
    }

    guardarLibro = async libro => {
        libro.id = String(parseInt(this.libros[this.libros.length - 1]?.id || 0) + 1)
        this.libros.push(libro)
        return libro
    }

    actualizarLibro = async (id, libro) => {
        libro.id = id

        const index = this.libros.findIndex( libro => libro.id == id )
        if(index != -1) {
            const libroAnt = this.libros[index]
            const libroNuevo = { ...libroAnt, ...libro }
            this.libros.splice(index,1,libroNuevo)
            return libroNuevo
        }
        else {
            this.libros.push(libro)
            return libro
        }
    }

    borrarLibro = async id => {
        let libro = {}

        const index = this.libros.findIndex( libro => libro.id === id )
        if(index != -1) {
            libro = this.libros.splice(index,1)[0]
        }
        return libro    
    }
}

export default ModelMem