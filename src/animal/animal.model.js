import mongoose from "mongoose";

const animalSchema = mongoose.Schema({
    keeper: {
        type: Schema.ObjectId, ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
})