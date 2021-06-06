
const fakeJson = {
    "Title": "Titanic",
    "Year": 1990,
    "Genre": ["Ficcao"],
    "Director": "Diretor",
    "Plot": "descricao",
    "Language": ["Portugues"],
    "Country": "Brazil"
}



const checkSchema = (reference, { body: json, method }) => {
    const required = method == "POST";
    const add = (key, atr) => {
        if (json[key]) {
            modelJson[key] = atr
        }
    }

    const setNotMirror = key => {
        notMirror = {
            mensagem: `Por favor verificar o atributo do JSON >  ${key}`
        };
    }

    if (typeof reference !== 'object' || typeof json !== 'object') return undefined;

    const keysRestritas = ["createAt", "_id", "id"]
    const referenceKeys = Object.keys(reference).filter(key => !keysRestritas.includes(key));
    const jsonKeys = Object.keys(json);
    let notMirror = undefined;
    let modelJson = {};


    referenceKeys.forEach((key, index) => {
        let ref = reference[key];
        let jsn = json[key];
        let type = ref.type();
        if (Array.isArray(type) && Array.isArray(jsn)) {
            if (required && jsn.length == 0) {
                setNotMirror(key)
            }
            add(key, jsn)
        }
        else if (typeof type == 'string') {
            if (required && jsn == "") {
                setNotMirror(key)
            }
            add(key, jsn)
        }
        else if (typeof type == 'number') {
            if (required && isNaN(jsn)) {
                setNotMirror(key)
            }
            add(key, jsn)
        }
        else {
            if (required) {
                setNotMirror(key)
            }
        }

    })

    if (notMirror !== undefined && required) {
        return [false, notMirror]
    }

    else if (Object.keys(modelJson).length == 0 || required && Object.keys(modelJson).length != referenceKeys.length) {
        return [false, {
            mensagem: "Por favor, verificar se enviou o arquivo Body JSON corretamente."
        }];
    }
    else {
        return [true, modelJson];
    }

}


const resClient = (response, res) => {
    const deletedCount = response.deletedCount || undefined;
    const nModified = response.nModified || undefined;

    console.log(nModifield)
    if (nModified == 0) {
        return res.stauts(304).send({
            mensagem: "Nenhum dado foi alterado!"
        })
    }
    else if (!response || deletedCount == 0) {
        return res.status(400).send({
            mensagem: "Não conseguimos localizar o filme."
        })
    }

    else {
        return res.status(200).send({ mensagem: response })
    }
}

const filterResponse = (response) => {

    if (response.nModified == 0) {
        return [304, { mensagem : "Nenhum dado foi alterado!" }]
    }
    else if (!response || response.deletedCount == 0) {
        return [400,  {mensagem : "Não conseguimos localizar o filme."}]
    }

    else {
        return [200, response]
    }
}

module.exports = { checkSchema, resClient, filterResponse}
