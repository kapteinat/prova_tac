# Mini Twitter

Uma versão simplificada do Twitter desenvolvida com HTML, CSS e JavaScript vanilla.

## Funcionalidades

- Sistema de autenticação (registro e login)
- Feed de postagens
- Criação de postagens com limite de 280 caracteres
- Visualização de postagens
- Perfil do usuário
- Edição de perfil
- Exclusão de postagens próprias

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- API REST

## Estrutura do Projeto

```
mini-twitter/
├── index.html
├── css/
│   ├── style.css
│   └── reset.css
├── js/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── profileController.js
│   ├── repositories/
│   │   └── api.js
│   └── app.js
└── README.md
```

## Como Executar

1. Clone o repositório
2. Abra o arquivo `index.html` em um navegador web
3. Registre-se ou faça login para começar a usar

## API

A aplicação utiliza a API disponível em: https://mini-twitter-api-vy9q.onrender.com

### Endpoints Disponíveis

#### Autenticação
- POST /api/auth/register - Registro de usuário
- POST /api/auth/login - Login de usuário

#### Postagens
- POST /api/posts - Criar postagem
- GET /api/posts - Listar todas as postagens
- GET /api/posts/my-posts - Listar postagens do usuário
- DELETE /api/posts/:id - Deletar postagem

#### Usuários
- GET /api/users/profile - Obter perfil do usuário
- PUT /api/users/profile - Atualizar perfil do usuário

## Funcionalidades Implementadas

### Sistema de Usuários
- Registro de novos usuários
- Login com email e senha
- Persistência de sessão
- Edição de perfil

### Feed de Postagens
- Criação de postagens
- Limite de 280 caracteres
- Visualização de todas as postagens
- Exclusão de postagens próprias

### Perfil do Usuário
- Visualização de informações do usuário
- Edição de dados do perfil
- Visualização de postagens do usuário

