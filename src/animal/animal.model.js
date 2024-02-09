import mongoose from 'mongoose'

const { Schema } = mongoose

const animalSchema = new Schema({
    keeper: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
})

const animal = mongoose.model('animal', animalSchema)

export default animal
