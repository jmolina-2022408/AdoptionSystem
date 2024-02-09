'user strict';

import Animal from './animal.model.js';

//crear un nuevo animal
export const createAnimal = async (req, res) => {
    try {
        let data = req.body;
        let animal = new Animal(data);
        await animal.save();
        return res.send({ message: 'Animal created successfully', animal });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating animal', err });
    }
}

//mostrar todos los animales
export const getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        return res.send({ message: 'This is the list of animals', animals });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting animals', err });
    }
}

export const searchAnimal = async (req, res) => {
    try {
        const { name } = req.params;
        const animal = await Animal.findOne({ name: name });
        if (!animal) {
            return res.status(404).send({ message: 'Animal not found' });
        }
        return res.send({ message: 'This is the list of animal', animal });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching animal', err });
    }
}

export const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedAnimal = await Animal.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAnimal) {
            return res.status(404).send({ message: 'Animal not found' });
        }
        return res.send({ message: 'Animal updated successfully', updatedAnimal });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating animal', err });
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAnimal = await Animal.findByIdAndDelete(id);
        if (!deletedAnimal) {
            return res.status(404).send({ message: 'Animal not found' });
        }
        return res.send({ message: 'Animal deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error deleting animal', err });
    }
}