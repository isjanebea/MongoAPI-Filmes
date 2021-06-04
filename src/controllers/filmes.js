

const [schema, Filmes] = require('../models/filmesSchema');
const utils = require('../Utils/inputBody')

const getAll = async (req, res) => {
    try {
        let lista = await Filmes.find(req.query);
        return res.status(200).send(lista)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const getById = async (req, res) => {
        
        try {
            const filme = await Filmes.findById(req.params.id)
            return utils.resClient(filme, res)
        } catch (error) {
            return res.status(400).send({
                mensagem : 'filme não encontrado!',
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
            mensagem : err
        })
    }
    
}


const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletado = await Filmes.deleteOne({ _id : id })
        return utils.resClient(deletado, res);
    }
    catch (err) {
        return res.status(400).send({ mensagem : 'Descupa, ocorreu um erro, por favor verificar o id'})
    }
}


const deleteByTitle = async (req, res) => {
    const { Title } = req.query;
    try {
        const deletado = await Filmes.deleteOne({Title : Title})
        return utils.resClient(deletado, res)
    }
    catch (err) {
        return res.status(400).send({ mensagem : 'Descupa, ocorreu um erro, por favor verificar o Title', err : err.message })
    }
}


const updateById = async (req, res) => {
    const { id }= req.params;
    const { bodyData } = req;
    try {
        const update = await Filmes.updateOne({_id : id}, bodyData);
        return utils.resClient(update, res)
    } catch (error) {
        return res.status(400).send({
            mensagem : "filme não encontrado"
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