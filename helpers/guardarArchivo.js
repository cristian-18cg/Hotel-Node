const fs = require('fs').promises; // Utiliza fs.promises para operaciones asincrónicas

const guardarDB = async (data) => {
    const archivo = './db/data.json'; // Ruta
    try {
        await fs.writeFile(archivo, JSON.stringify(data)); // Utiliza writeFile de forma asincrónica
        console.log('Datos guardados correctamente en data.json');
    } catch (error) {
        console.error('Error al guardar los datos en data.json', error);
    }
};



module.exports = {
    guardarDB
};
