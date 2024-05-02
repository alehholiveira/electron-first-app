
# Projeto de Gerenciamento de Cadastro de Usuários

Este projeto foi desenvolvido para gerenciar cadastro de usuários usando ElectronJS, Node.js, TypeScript, Prisma, Docker, PostgreSQL, entre outras tecnologias.

## Frameworks e Tecnologias Utilizadas
- <img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" alt="Node.js" width="24" height="24"> **Node.js**: Um ambiente de execução JavaScript do lado do servidor.
- <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" width="24" height="24"> **TypeScript**: Um superset do JavaScript que adiciona tipos estáticos.
- <img src="https://cdn.worldvectorlogo.com/logos/prisma-3.svg" alt="Prisma" width="24" height="24"> **Prisma**: Ferramenta ORM para acessar e interagir com bancos de dados.
- <img src="https://w7.pngwing.com/pngs/991/165/png-transparent-docker-hd-logo-thumbnail.png" alt="Docker" width="24" height="24"> **Docker**: Uma plataforma para contêineres usada para rodar serviços isolados.
- <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL" width="24" height="24"> **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional.
- <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" alt="ElectronJS" width="24" height="24"> **ElectronJS**: Framework para criar aplicativos desktop usando tecnologias da web.
- **Jest**: Biblioteca usada para o desenvolvimento do TDD.

## Instruções para Execução
Primeiramente certifique-se de que o docker esta aberto em seguida:

1. **Clone o Repositório**
   Abra um terminal, vá para a pasta onde deseja clonar o repositório e execute o seguinte comando:
   ```bash
   git clone https://github.com/alehholiveira/electron-first-app.git
2. **Entre no repositório**
   ```bash
   cd electron-first-app
3. **Entre no diretório backend**
   ```bash
   cd backend
4. **Dentro do backend executar os seguintes comandos**
   executar na ordem
   ```bash
   npm install
   docker compose up -d
   npx prisma migrate dev
   npm run dev
5. **Agora deve sair da pasta backend e entrar na frontend**
    executar na ordem
   ```bash
   cd ..
   cd frontend
   npm install
   npm run dev
6.**Pronto seu projeto ja pode ser usado**
   
