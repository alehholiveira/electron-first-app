<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Projeto de gerenciamento de cadastro de usuários</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #555;
        }
        ul {
            list-style-type: square;
            padding-left: 20px;
        }
        .inline-img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            width: 30px;
        }
        .code-container {
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }
        .code-box {
            font-family: monospace;
            color: #333;
            overflow-x: auto;
            white-space: nowrap;
        }
        .copy-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .copy-button:hover {
            background-color: #45a049;
        }
    </style>
    <script>
        function copyToClipboard() {
            const codeText = document.getElementById("codeToCopy").innerText;

            const tempElement = document.createElement("textarea");
            tempElement.value = codeText;
            document.body.appendChild(tempElement);

            tempElement.select();
            document.execCommand("copy");

            document.body.removeChild(tempElement);

            alert("Código copiado para a área de transferência!");
        }
    </script>
</head>
<body>

    <h1>Projeto de gerenciamento de cadastro de usuários</h1>
    
    <p>Este projeto foi desenvolvido com o objetivo de aprender a usar o framework ElectronJS e construir um sistema de login onde, após o usuário com permissão fazer login, ele pode visualizar e editar o cadastro de outros usuários.</p>

    <h2>Frameworks e Tecnologias Utilizadas</h2>
    
    <ul>
        <li>
            <img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" alt="Node.js logo" class="inline-img">
            <strong>Node.js:</strong> Um ambiente de execução JavaScript do lado do servidor. É usado para construir a lógica de back-end do projeto.
        </li>
        <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="Typescript logo" class="inline-img">
            <strong>Typescript:</strong> Um superset do JavaScript que adiciona tipos estáticos, ajudando a identificar erros em tempo de compilação e melhorando a confiabilidade do código.
        </li>
        <li>
             <img src="https://cdn.worldvectorlogo.com/logos/prisma-3.svg" alt="Prisma logo" class="inline-img">
            <strong>Prisma:</strong> Uma ferramenta de mapeamento objeto-relacional (ORM) para acessar e interagir com bancos de dados em aplicativos baseados em Node.js e TypeScript.
        </li>
        <li>
            <img src="https://w7.pngwing.com/pngs/991/165/png-transparent-docker-hd-logo-thumbnail.png" alt="Docker logo" class="inline-img">
            <strong>Docker:</strong> Uma plataforma de contêineres usada para rodar serviços isolados. Neste projeto, usamos um contêiner Docker para rodar o banco de dados PostgreSQL.
        </li>
        <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL logo" class="inline-img">
            <strong>PostgreSQL:</strong> Um sistema de gerenciamento de banco de dados relacional, conhecido por sua robustez e escalabilidade. É o banco de dados usado neste projeto.
        </li>
        <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" alt="ElectronJS logo" class="inline-img">
            <strong>ElectronJS:</strong> Um framework para criar aplicativos desktop usando tecnologias da web, como HTML, CSS e JavaScript. ElectronJS permite criar aplicativos multiplataforma para Windows, MacOS e Linux.
        </li>
    </ul>

    <h2>Instruções para Execução</h2>

       <p>Primeiramente, certifique-se de que você está com o Docker aberto.</p>
    
    <ol>
        <li>Abra um terminal, vá para a pasta onde deseja clonar o repositório e execute o seguinte comando: 
        <div class="code-container">
        <div class="code-box" id="codeToCopy">git clone https://github.com/alehholiveira/electron-first-app.git</div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div></li>
    <li>
        Agora com o seu repositório clonado entre na pasta electron-first-app com o comando :
            <div class="code-container">
        <div class="code-box" id="codeToCopy"> cd electron-first-app </div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
     e depois entre no diretório backend com o comando:
     <div class="code-container">
        <div class="code-box" id="codeToCopy">git clone https://github.com/alehholiveira/electron-first-app.git</div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
    </li>
    <li>Agora iremos instalar as dependencias entao dentro do backend executar o seguinte comando:
        <div class="code-container">
        <div class="code-box" id="codeToCopy"> npm install </div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
     e agora deve-se executar o migrate do prisma:
         <div class="code-container">
        <div class="code-box" id="codeToCopy">npx prisma migrate dev</div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
    </li>
    <li> Agora basta executar o docker compose
     <div class="code-container">
        <div class="code-box" id="codeToCopy">docker compose up -d</div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
    e começar a rodar o backend executando o comando :
      <div class="code-container">
        <div class="code-box" id="codeToCopy">npm run dev</div>
        <button class="copy-button" onclick="copyToClipboard()">Copiar</button>
    </div>
    </li>
    <li>
    </li>
    </ol>

</body>
</html>
