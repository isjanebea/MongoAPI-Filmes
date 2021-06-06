

const [schema, Filmes] = require('../models/filmesSchema');
const utils = require('../Utils/utils')

const getAll = async (req, res) => {
    try {
        let lista = await Filmes.find(req.query);
        return res.status(200).send(lista)
    } catch (error) {
        return res.status(500).send({ mensagem : error.message})
    }
}

const getById = async (req, res) => {
        
        try {
            const filme = await Filmes.findById(req.params.id)
            const [code,  mensagem] = utils.filterResponse(filme)
            res.status(code).json(mensagem)
        } catch (error) {
            return res.status(500).send({
                mensagem : error.message,
            })
        }
}


const createLivro = async (req, res) => {
    const { bodyData : data } = req;
    const filme = new Filmes(data);

    try {
       const newFilme = await filme.save();
       return res.status(201).send(newFilme)
    }

    catch (err) {
        return res.status(500).send({
            mensagem : err.message
        })
    }
    
}


const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletado = await Filmes.deleteOne({ _id : id })
        const [code,  mensagem] = utils.filterResponse(deletado)
        res.status(code).json(mensagem)
    }
    catch (err) {
        return res.status(500).send({ mensagem : err.message})
    }
}


const deleteByTitle = async (req, res) => {
    const { Title } = req.query;
    try {
        const deletado = await Filmes.deleteOne({Title : Title})
        const [code,  mensagem] = utils.filterResponse(deletado)
        res.status(code).json(mensagem)
    }
    catch (err) {
        return res.status(500).send({ mensagem : err.message })
    }
}


const updateById = async (req, res) => {
    const { id }= req.params;
    const { bodyData } = req;
    try {
        const update = await Filmes.updateOne({_id : id}, bodyData);
        const [code,  mensagem] = utils.filterResponse(update)
        res.status(code).json(mensagem)
    } catch (error) {
        return res.status(500).json({
            mensagem : error.message
        })
    }
}


const bodyData = (req, res, next) => {
    const [checked, data] = utils.checkSchema(schema, req);

    if (!checked) {
        return res.status(400).send(data)
    }
    req.bodyData = data;
    next()
}



module.exports = {
    getAll,
    getById,
    createLivro,
    deleteById,
    deleteByTitle,
    updateById,
    bodyData
}