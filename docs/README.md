# STATRI — Sistema de acompanhamento de treinos

Aplicação web para atletas registrarem seus dados pessoais e acompanharem treinos de corrida, ciclismo e natação. O projeto reúne uma interface em HTML, CSS e JavaScript com uma API REST em Node.js/Express, persistência em PostgreSQL e autenticação por JWT.

## Funcionalidades

- Cadastro de usuário com nome, e-mail, senha, data de nascimento, peso e altura.
- Login com e-mail e senha. A senha é armazenada com hash bcrypt e a API retorna um token JWT com validade de 24 horas.
- Consulta e edição do perfil do usuário autenticado.
- Alteração da senha pela API.
- Registro e listagem dos treinos vinculados ao usuário autenticado.
- Cálculo da velocidade média do treino a partir da distância e duração informadas.

## Tecnologias

- Node.js (ES modules) e Express 5
- PostgreSQL, acessado pelo pacote `pg`
- `bcryptjs` para hash e verificação de senhas
- `jsonwebtoken` para emissão e validação de tokens
- `dotenv` para configuração por variáveis de ambiente
- HTML, CSS e JavaScript no navegador

## Requisitos

- Node.js e npm instalados
- Uma instância PostgreSQL acessível
- Banco de dados com as tabelas `users` e `trainings`, incluindo as colunas usadas pelas consultas do projeto
- Segredo para assinatura dos tokens JWT

O repositório não contém um arquivo de criação/migração do banco. As consultas em `src/service` esperam, entre outras, colunas como `users.id_user`, `users.email_user`, `users.password_user` e `trainings.id_user`, `trainings.id_sport`, `trainings.title_sport`, `trainings.distance_trainings` e `trainings.training_date`.

## Configuração e execução

1. Na raiz do projeto, instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz com as configurações do PostgreSQL e o segredo JWT:

   ```env
   PORT=8081
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=systemtrainings
   JWT_SECRET=substitua_por_um_segredo_longo_e_aleatorio
   ```

   Ajuste os valores de conexão ao seu ambiente. A conexão PostgreSQL está configurada com SSL e `rejectUnauthorized: false` em `src/config/database.js`; leve isso em conta ao usar um servidor local.

3. Inicie o servidor:

   ```bash
   npm start
   ```

4. Acesse `http://localhost:8081`. A rota inicial abre a tela de login; use **Cadastre-se aqui** para criar uma conta.

O servidor usa a porta definida em `PORT`, ou `8081` quando ela não estiver definida. Os arquivos estáticos são servidos a partir de `src/public`.

## Páginas

| Caminho | Conteúdo |
| --- | --- |
| `/` e `/login` | Login |
| `/register` | Cadastro |
| `/profile` | Perfil e edição dos dados pessoais |
| `/trainings` | Histórico e registro de treinos |
| `/dashboard` | Página de dashboard em desenvolvimento |

Após o login, o navegador guarda o token no `localStorage` e o envia como `Authorization: Bearer <token>` nas chamadas protegidas.

## API

As rotas de API usam o prefixo `/api/auth` e recebem/enviam JSON.

| Método | Caminho | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Público | Cadastra usuário. Campos: `name`, `email`, `password`, `birth_date`, `weight`, `height`. |
| `POST` | `/api/auth/login` | Público | Autentica com `email` e `password`; retorna `token` e dados básicos do usuário. |
| `GET` | `/api/auth/profile` | JWT | Retorna os dados do perfil autenticado. |
| `PUT` | `/api/auth/profile` | JWT | Atualiza `name`, `email`, `birth_date`, `weight` e `height`. |
| `PUT` | `/api/auth/password` | JWT | Atualiza a senha. Corpo: `{ "password": "..." }`. |
| `GET` | `/api/auth/trainings` | JWT | Lista os treinos do usuário autenticado. |
| `POST` | `/api/auth/trainings-post` | JWT | Registra treino. Veja os campos abaixo. |

Exemplo de corpo para registrar um treino:

```json
{
  "id_sport": 1,
  "title_sport": "Corrida leve",
  "distance_trainings": 5,
  "duration_trainings": 30,
  "pace_trainings": "6:00",
  "calories_trainings": 320,
  "intensity_trainings": "leve",
  "training_date": "2026-09-23",
  "notes_trainings": "Treino confortável"
}
```

Na interface, os IDs de esporte são `1` para corrida, `2` para ciclismo e `3` para natação. A duração enviada é em minutos; o serviço a grava como horário e calcula `speed_trainings` em km/h. Notas são opcionais. As rotas protegidas exigem um token válido no cabeçalho `Authorization`.

## Estrutura do projeto

```text
src/
├── app.js                 # Configura Express, arquivos estáticos e rotas
├── server.js              # Carrega ambiente e inicia o servidor
├── config/database.js     # Pool de conexão PostgreSQL
├── routes/                # Rotas de páginas e API
├── controller/            # Tratamento HTTP das requisições
├── service/               # Regras de negócio e consultas SQL
├── middlewares/           # Validação do token JWT
├── views/                 # Páginas HTML
└── public/                # CSS, JavaScript do navegador e imagens
```

## Scripts disponíveis

- `npm start`: inicia a aplicação com `node src/server.js`.
- `npm test`: ainda não está configurado; o script atual termina com erro informando que não há testes.
