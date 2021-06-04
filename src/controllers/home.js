const { name, author, version, description } = require('../../package.json');
const [, Filmes] = require('../models/filmesSchema');




const index = async (req, res) => {
    const apresentacao =
    {
        "mensagem": `bem vindos ao servidor ${name}`,
        author,
        version,
        description,
    }

    try {
        const movies = await Filmes.find();
        apresentacao.filmes = `Atualmente possuimos ${movies.length} filmes na base de dados.`
    }
    catch (err) {
        apresentacao.filmes = 'informação não disponivel';
    }
    return res.status(200).send(apresentacao)
}

module.exports = {
    index
}