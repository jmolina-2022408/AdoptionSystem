'user strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    try {
        //capturar el formulario (body)
        let data = req.body
        //encriptar la contraseña
        data.password = await encrypt(data.password)
        //asignar el rol por defecto
        data.role = 'CLIENT'
        //guardar la informacion en la BD
        let user = new User(data)
        await user.save()
        //responder al usuario
        return res.send({ message: `Registered succesfully, can be logged with email use ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        //capturar los datos (body)
        let { username, password } = req.body
        //validar que el usuario exista
        let user = await User.findOne({ username }) //buscar un solo registro
        //verifico que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //responde al usuario
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}

export const update = async (req, res) => { //datos generales (no password)
    try {
        //obtener el id del usuario a actualizar
        let { id } = req.params
        //obtener los datos a actualizar
        let data = req.body
        //validar si data trae datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //validar si tiene permisos (tokenizacion) X Hoy no lo vemos X
        //actualizar (BD)
        let updateUser = await User.findOneAndUpdate(
            { _id: id }, //objectsId <- hexadecimales (hora sys, version mongo, llave privada)
            data, //los datos que se van a actualizar
            { new: true } //objeto de la BD ya actualizado
        )
        //validar la actualizacion
        if (!updateUser) return res.status(401).send({ message: 'User not found and not updated' })
        //respondo al usuario
        return res.send({ message: 'Updated user', updateUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //obtener el id
        let { id } = req.params
        //validar si esta logeado y es el mismo X No lo vemos hoy X
        //eliminar (deleteOne (solo elimina no devuelve el documento) / findOneAndDelete (me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //verificar que se elimino
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //responder
        return res.send({ message: `Account with username ${deletedUser.username} deleted succesfully` }) //status 200
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}