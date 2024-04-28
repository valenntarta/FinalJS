import LibrosMem from '../model/DAO/librosMem.js'
import LibrosFile from '../model/DAO/librosFile.js'
import ModelFactory from '../model/DAO/librosFactory.js'
import config from '../config.js'



class Servicio {
    constructor() {
        // this.model = new LibrosMem()
        // this.model = new LibrosFile()
        this.model = ModelFactory.get(config.PERSISTENCIA) 
    }

    obtenerLibros = async id => {
        const libros = await this.model.obtenerLibros(id)
        return libros
    }     

    guardarLibro = async libro => {
        const libroGuardado = await this.model.guardarLibro(libro);
    
        if (libroGuardado === null) {
            return { errorMsg: "Error al guardar el libro." };
        }
    
        const libros = await this.model.obtenerLibros();
    
        if (!libros) {
            return { errorMsg: "La lista de libros está vacía." };
        } else {
            const libroDisponible = libros.find(libro => libro.estado === "disponible");
    
            if (libroDisponible) {
                return { successMsg: "Libro guardado exitosamente. Situacion normalizada. Mandar notificación al sistema externo", libroGuardado };
            } 
        }
    }

    actualizarLibro = async (id, libro) => {
        const libroActualizado = await this.model.actualizarLibro(id,libro)
        return libroActualizado
    }

    borrarLibro = async id => {
        const libroBorrado = await this.model.borrarLibro(id);
    
        if (libroBorrado === null) {
            return { errorMsg: "No se encontró el libro con ese ID." };
        }
    
        const libros = await this.model.obtenerLibros();
    
        if (!libros) {
            return { errorMsg: "La lista de libros está vacía." };
        } else {
            const librosNoDisponibles = libros.filter(libro => libro.estado !== "disponible");
    
            if (librosNoDisponibles.length === libros.length) {
                return { errorMsg: "Ningun libro esta disponible. Mandar notificación al sistema externo.", libroBorrado };
            } 
        }
    }
}

export default Servicio