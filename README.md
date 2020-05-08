# PlayCityApi
Api construida com as seguintes Tecnologias:

* Node version 8.4.0
* NPM 5.4.0
* Express 4.15.4
* Mongoose 4.11.8


## Arquitetura


    ├── bin                # inicialização do Projeto
    ├── src                # Principal pasta do sistema
    ├──── clients          # Chamadas a Api´s externas
    ├──── controllers      # Recebimento e retorno de requisições
    ├──── models           # Estrutura de Schemas\Dominios
    ├──── repositories     # Acesso ao banco Mongo
    ├──── routes           # Configuração de Rotas
    ├──── services         # Regra de negócio
    ├──── validators       # Validações gerais do sistema
    ├──── app.js           # Principais configurações do sistema(Models,Routes..)
    ├──── config.js        # Senhas e conexões com aplicações externas
    

.
* [clients](./src/clients)
* [controllers](./src/clients)
* [models](./src/clients)
* [repositories](./src/clients)
* [routes](./src/clients)
* [services](./src/clients)
* [validators](./src/clients)


## Métodos API
  
## Log

### Buscar Estatistica consulta por Cidade
##### GET /api/v1/logs/logsGroupCity

Retorna a estatistica de consulta agrupadas por cidade. Se a mensagem for encontrada, a solicitação retornará um código de status 200.

__Requesição__

__Headers__

Key | Value 
------------------ | ------------- 
x-access-token *__required__ | token

__Exemplo__

GET     https://localhost:3000/api/v1/logs/logsGroupCity


Resposta

Codes

```
    200         OK	                Logs encontrado
    404	        Not Found	        Logs não encontrado
```

Exemplo:
200
```
Body
[
    {
        "_id": "sumare",
        "total": 3
    },
    {
        "_id": "hortolandia",
        "total": 6
    },
    {
        "_id": "jundiai",
        "total": 8
    },
    {
        "_id": "campinas",
        "total": 4
    }
]
```
________________________________________


## PlayCity


### Buscar a Temperatura de uma cidade
##### GET /api/v1/weathers/{city}

Retorna uma lista de musicas baseado na  temperatura da cidade. Se a mensagem for encontrada, a solicitação retornará um código de status 200.

__Requesição__

Parametros | Tipo | Valor
------------------ | ------------- | -------------
city *__required__ | string | O nome da cidade que você gostaria de obter a PlayList.

__Headers__

Key | Value 
------------------ | ------------- 
x-access-token *__required__ | token 



__Exemplo__

GET     localhost:3000/api/v1/playcities/campinas


Resposta

Codes

```
    200         OK	                Playlist encontrada
    404	        Not Found	        Playlist não encontrada
```

Exemplo:
200
```
Body
{
    "city": "campinas",
    "temperature": 17,
    "musics": [
        {
            "music": "Wild Horses",
            "artist": "The Rolling Stones",
            "genre": "Rock"
        },
        {
            "music": "The Unforgiven II",
            "artist": "Metallica",
            "genre": "Rock"
        },
        {
            "music": "Bad Decisions",
            "artist": "The Strokes",
            "genre": "Rock"
        },
        {
            "music": "Girls Go Wild",
            "artist": "LP",
            "genre": "Rock"
        },
        {
            "music": "Drive",
            "artist": "Incubus",
            "genre": "Rock"
        },
        {
            "music": "Angel",
            "artist": "Sarah Mclachlan",
            "genre": "Rock"
        },
        {
            "music": "Daughter",
            "artist": "Pearl Jam",
            "genre": "Rock"
        },
        {
            "music": "Smoke On The Water",
            "artist": "Deep Purple",
            "genre": "Rock"
        },
        {
            "music": "O Mundo",
            "artist": "Capital Inicial",
            "genre": "Rock"
        },
        {
            "music": "Seguindo no Trem Azul",
            "artist": "Roupa Nova",
            "genre": "Rock"
        }
    ]
}
```
________________________________________


## Weather

### Buscar a Temperatura de uma cidade
##### GET /api/v1/weathers/{city}

Retorna uma única leitura de temperatura por sua cidade. Se a cidade for encontrada, a solicitação retornará um código de status 200.

__Requesição__

Parametros | Tipo | Valor
------------------ | ------------- | -------------
city *__required__ | string | O nome da cidade que você gostaria de obter a temperatura.

__Headers__

Key | Value 
------------------ | ------------- 
x-access-token *__required__ | token

__Exemplo__

GET     localhost:3000/api/v1/weathers/campinas


Resposta

Codes

```
    200         OK	                Cidade encontrada
    404	        Not Found	        Cidade não encontrada
```

Exemplo:
200
```
Body
{
    "coord": {
        "lon": -47.06,
        "lat": -22.91
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 17,
        "feels_like": 11.98,
        "temp_min": 17,
        "temp_max": 17,
        "pressure": 1024,
        "humidity": 63
    },
    "visibility": 10000,
    "wind": {
        "speed": 7.2,
        "deg": 120
    },
    "clouds": {
        "all": 20
    },
    "dt": 1588942103,
    "sys": {
        "type": 1,
        "id": 8393,
        "country": "BR",
        "sunrise": 1588930264,
        "sunset": 1588970301
    },
    "timezone": -10800,
    "id": 3467865,
    "name": "Campinas",
    "cod": 200
}
```
________________________________________


## Users

### Criar um usuario
##### POST /api/v1/users

Cria um usuario na API, o mesmo sera necessário para criar o token para a utilização dos demais serviços.

__Requesição__

Parametros | Tipo | Valor
------------------ | ------------- | -------------
name *__required__ | string | O nome do usuario a ser criado
email *__required__ | string | O email do usuario a ser criado.
password *__required__ | string | O password para login na api
cpf *__required__ | string | O cpf do usuario



__Exemplo__

GET     localhost:3000/api/v1/users


Resposta

Codes

```
    201         OK	                    Usuario criado
    500	        Internal Server Error   Usuario não criado
```

Exemplo:
200
```
Request

{
  "name": "Stefano Baldo",
  "email":"engineering-tests@ingaia.com.br",
  "password":"5eff95c56877c84cb1e56185aa28da30",
  "cpf":"12876507000192"
}


Response
Body
{
    "data": {
        "user": {
            "id": "5eb584ed078acb001710237f",
            "email": "engineering-tests@ingaia.com.br",
            "name": "Stefano Baldo",
            "cpf": "12876507000192",
            "roles": [
                "user"
            ]
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjU4NGVkMDc4YWNiMDAxNzEwMjM3ZiIsImVtYWlsIjoiZW5naW5lZXJpbmctdGVzdHNAaW5nYWlhLmNvbS5iciIsIm5hbWUiOiJTdGVmYW5vIEJhbGRvIiwiY3BmIjoiMTI4NzY1MDcwMDAxOTIiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTU4ODk1NDM0OSwiZXhwIjoxNTg5MDQwNzQ5fQ.hYpdtUlVco2REK3yAAzPDyJWNLAAu5g-R5GJp_LM-ys"
    }
}
```
________________________________________