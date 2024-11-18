<h1 align="center">
  Sistema para gerenciamento de produtos
</h1>

Este projeto é uma aplicação de gerenciamento de produtos com usuários autenticados. Ele possui:

- CRUD de usuários, produtos e categorias.
- Autenticação via JWT.
- Banco de dados MongoDB para armazenar dados.

## Tecnologias
 
- [Node.js (Express)](https://nodejs.org/)
- [MongoDB (Atlas)](https://www.mongodb.com/pt-br/products/platform/atlas-database)

## Boas práticas adotadas

- SOLID
- DRY
- YAGNI
- KISS
- Tratamento de respostas de erro

## Como Executar

- Clonar repositório git
- Criar arquivo .env e colocar a variável: MONGODB_URI="coloque a string de conexão do MongoDB"retryWrites=true&w=majority
- Executar os seguintes comandos:
```
npm install
cd src
node index.js
```
- Agora, é só fazer as requisições em um dos softwares desejados.
