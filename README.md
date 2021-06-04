# Beatriz FLIX


*apresentacao*


{

"mensagem":  "bem vindos ao servidor MongoAPI Filmes",

"author":  "Beatriz",

"version":  "1.0.0",

"description":  "",

"filmes":  "Atualmente possuimos 0 filmes na base de dados."

}


# Rotas


**GET "/"**   apresentação geral da api, com a quantidade de filmes cadastrados.


## API
rota:   */api*



## GET "/" mostra todos os filmes - *sem parametros*



*aceita ***query parametros*** para um filtro personalizado*

 - Title:  String
 - Genre:  String
 - Language: String
 - ID:  String
 - Ano:   Number   *ex:  2020*
 - Director: String
 - Country: String
 
retorna um array de acordo com lógica requisitada


## GET "/:id" 



Requirido um ***params***
retorna um filme de acordo com o id


## DELETE "/:id"


Requirido um ***params***
deleta um filme de acordo com o id
retorna um objeto com o status da operacao

## DELETE "/delete?"


Requirido um ***query parametros***
deleta um filme de acordo com o Title especificado.  
Atenção esse metódo não se mostra tão preciso como o id, é recomendável o delete por ID

##  PATCH "/:id"



Requirido:  Body
Atualiza uma ou mais propriedades requisitadas pelo Body
retorna um objeto especificando quantas propriedades foram alteradas

## POST



*requirido um Body*


{

"Title":  "Titanic",

"Year":  1990,

"Genre":  ["Drama"],

"Director":  "Diretor",

"Plot":  "descricao",

"Language":  ["Portugues"],

"Country":  "Brazil"

}

retorna o filme que foi criado


