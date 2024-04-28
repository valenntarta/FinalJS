import fs from 'fs'


class ModelFile {
    constructor() {
        this.nombreArchivo = 'libros.json'
    }

    leerArchivo = async nombre => {
        let libros = []
        try {
            libros = JSON.parse( await fs.promises.readFile(nombre, 'utf-8'))
        }
        catch {}

        return libros
    }

    escribirArchivo  = async (nombre, libros) => {
         await fs.promises.writeFile(nombre, JSON.stringify(libros,null,'\t'))
    }


    obtenerLibros = async codigo => {    
        try {
            const libros = await this.leerArchivo(this.nombreArchivo);
            if (codigo) {
                const libro = libros.find(libro => libro.codigo === codigo);
                return libro || {};
            } else {
                return libros;
            }
        } catch (error) {
            console.error("Error al obtener libros:", error);
            return codigo ? {} : [];
        }
    }

    guardarLibro = async libro => {
        const libros = await this.leerArchivo(this.nombreArchivo)

        libro.codigo = String(parseInt(libros[libros.length - 1]?.codigo || 0) + 1) // ?. optional chaining
        libro.estado = "disponible"
        libros.push(libro)

        await this.escribirArchivo(this.nombreArchivo, libros)

        return libro
    }

    actualizarLibro = async (codigo, libro) => {
        libro.codigo = codigo;
    
        const libros = await this.leerArchivo(this.nombreArchivo);
    
        const index = libros.findIndex(libro => libro.codigo === codigo);
        if (index !== -1) {
            const libroAnt = libros[index];
            const libroNuevo = { ...libroAnt, ...libro };
            libros.splice(index, 1, libroNuevo);
            await this.escribirArchivo(this.nombreArchivo, libros);
    
            return libroNuevo;
        } else {
            libros.push(libro);
            await this.escribirArchivo(this.nombreArchivo, libros);
    
            return libro;
        }
    }

    borrarLibro = async codigo => {
        let libro = {};
    
        const libros = await this.leerArchivo(this.nombreArchivo);
    
        const index = libros.findIndex(libro => libro.codigo === codigo);
        if (index !== -1) {
            libro = libros.splice(index, 1)[0];
            await this.escribirArchivo(this.nombreArchivo, libros);
        }
        return libro;
    }
}

export default ModelFile