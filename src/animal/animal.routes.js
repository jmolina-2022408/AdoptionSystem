import express from 'express'
import { createAnimal, deleteAnimal, getAllAnimals, searchAnimal, updateAnimal } from './animal.controller.js'

const api = express.Router()

api.post('/createAnimal', createAnimal)
api.get('/getAllAnimals', getAllAnimals)
api.get('/searchAnimal/:name', searchAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)

export default api