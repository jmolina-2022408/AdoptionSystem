import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLenght: [8, 'Password must be 8 characters'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
})

//pre mongoose
//pluralizar
export default mongoose.model('user', userSchema)