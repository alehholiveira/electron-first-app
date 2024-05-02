
# Projeto de Gerenciamento de Cadastro de Usuários

Este projeto foi desenvolvido para gerenciar cadastro de usuários usando ElectronJS, Node.js, TypeScript, Prisma, Docker, PostgreSQL, entre outras tecnologias.

## Frameworks e Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **TypeScript**: Um superset do JavaScript que adiciona tipos estáticos.
- **Prisma**: Ferramenta ORM para acessar e interagir com bancos de dados.
- **Docker**: Plataforma para contêineres.
- **PostgreSQL**: Banco de dados relacional conhecido por robustez e escalabilidade.
- **ElectronJS**: Framework para criar aplicativos desktop usando tecnologias da web.
- **Jest**: Biblioteca usada para o desenvolvimento do TDD.

## Instruções para Execução
Para clonar e configurar o projeto, siga os passos abaixo:

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
5. **Agora deve sair da pasta backend e sair da frontend**
    executar na ordem
   ```bash
   npm install
   npm run dev
6.**Pronto seu projeto ja pode ser usado**
   
