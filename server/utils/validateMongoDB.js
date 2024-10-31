const mongoose = require('mongoose');

const validateMongoDB = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID no encontrada o no válida');
    }
}

module.exports = validateMongoDB;