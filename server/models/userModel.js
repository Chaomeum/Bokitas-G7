const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { equal } = require('assert');
const { ObjectId } = require('bson');
const Schema = mongoose.Schema;
const userSchema = new Schema({    
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    direccion: { type: String },
    telefono: { type: String },
    rol: { type: String, enum: ['cliente', 'administrador'], default: 'cliente'}, // Enum para restringir valores
    isBlocked: { type: Boolean, default: false },
    cart:{ type: Array, default: [] },
    wishList:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    refreshToken: {
        type: String,
    },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
