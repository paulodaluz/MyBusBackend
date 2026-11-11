# MyBus Backend

API em **Node.js, NestJS e TypeScript** para o aplicativo MyBus, com cadastro de usuários, veículos, pontos de parada e feedback. Os dados são persistidos no Cloud Firestore.

[![TypeScript](https://img.shields.io/badge/TypeScript-project-3178C6)](https://www.typescriptlang.org/docs/)
[![License](https://img.shields.io/badge/License-AGPL_3.0-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🐋 Getting started with Docker](#getting-started-with-docker)
- [🔌 API usage](#api-usage)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Cadastro e consulta de usuários passageiros ou empresas.
- Cadastro, consulta, atualização e exclusão de veículos.
- Consulta de vários veículos pelas placas.
- Registro de feedback sobre o aplicativo e veículos.
- Persistência no Cloud Firestore, com validação dos dados recebidos.

A API acompanha o aplicativo mobile [MyBus](https://github.com/paulodaluz/MyBus). Este backend armazena informações de veículos e pontos; não possui rota de streaming de localização em tempo real.

<a id="technologies"></a>

## 🧪 Technologies

Versões de [package.json](package.json):

| Tecnologia | Versão | Finalidade |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | `18.16.1` | Runtime definido em engines e CI |
| [NestJS](https://docs.nestjs.com/) | `10.0.3` | Módulos, controllers e serviços |
| [TypeScript](https://www.typescriptlang.org/docs/) | `5.1.3` | Compilação |
| [Firebase](https://firebase.google.com/docs/firestore) | `7.9.1` | SDK cliente Firestore |
| [Jest](https://jestjs.io/) | `29.5.0` | Testes unitários |
| [Husky](https://typicode.github.io/husky/) | `8.0.3` | Hooks locais |
| [Commitlint](https://commitlint.js.org/) | `17.6.6` | Mensagens de commit |

Há dependências de cache/Redis declaradas, mas nenhuma integração Redis foi encontrada no módulo e nos serviços atuais.

<a id="environment-setup"></a>

## 🛠️ Environment setup

Use Git, [nvm](https://github.com/nvm-sh/nvm) e Node.js **18.16.1**. Os comandos abaixo usam npm, fornecido com o Node.js. Não há lockfile versionado; use `npm install`, e não `npm ci`. A resolução das faixas de versão pode variar entre instalações.

```bash
nvm install 18.16.1
nvm use 18.16.1
git clone https://github.com/paulodaluz/MyBusBackend.git
cd MyBusBackend
npm install
```

O script `prepare` executa `husky install` ao terminar a instalação. Se precisar reaplicar os hooks, use `npm run prepare`; Husky, Nest e Commitlint são dependências locais, sem instalação global.

O hook `pre-commit` executa **formatação com escrita**, testes e ESLint; revise o diff antes de concluir um commit. O hook `commit-msg` usa Commitlint e o padrão Conventional Commits.

### Environment

O repositório inclui `.env`. Configure uma cópia local com:

```dotenv
PORT=3001
APPLICATION_PREFIX=my-bus/v1
```

`PORT` usa `3001` quando não definida. Defina explicitamente `APPLICATION_PREFIX`: o código converte o valor ausente em texto. `REDIS_ENABLE`, `REDIS_HOST`, `REDIS_PORT` e `REDIS_EXPIRATION_CACHE_MS_RESPONSE` aparecem no arquivo existente, mas não são lidas pelo código de `src/` atual.

### Firebase

A configuração do SDK está embutida em [src/v1/database/configuration.database.ts](src/v1/database/configuration.database.ts). Para operações de persistência, configure localmente seu próprio projeto Firebase com Cloud Firestore; criar variáveis `FIREBASE_*` não substitui esse objeto.

Revise as regras de acesso do seu ambiente. O código usa o SDK cliente, não o Admin SDK, e não implementa autenticação Firebase nas rotas. Não libere indiscriminadamente o banco para contornar permissões. Nenhum dado ou credencial do projeto original precisa ser reutilizado.

<a id="getting-started"></a>

## 🚀 Getting started

```bash
npm run start:dev
```

Com o prefixo configurado acima, a URL base é **http://localhost:3001/my-bus/v1**. Não há rota de saúde. Uma requisição inválida pode verificar o roteamento e a validação sem gravar no banco:

```bash
curl -i -X POST http://localhost:3001/my-bus/v1/user/register-user \
  -H 'Content-Type: application/json' -d '{}'
```

O controller utiliza `ValidationPipe`, portanto espera-se `400` para esse corpo incompleto. Isso não verifica Firestore.

Para compilar e executar o resultado:

```bash
npm run build
npm run start:prod
```

O build gera `dist/`; `start:prod` executa `dist/main`.

<a id="getting-started-with-docker"></a>

## 🐋 Getting started with Docker

O [docker-compose.yml](docker-compose.yml) define **somente Redis**, com imagem `redis:5.0-alpine` e porta `6379:6379`. Não inclui aplicação, volumes, variáveis ou serviço Firebase.

```bash
docker compose up -d redis
docker compose logs redis
docker compose down
```

O campo legado `version: '1'` pode ser rejeitado por versões do Compose; ajuste do arquivo fica para revisão. O Redis não é consumido pelo código atual, por isso não é pré-requisito da API. **Instruções obtidas por inspeção; Docker não foi executado nesta tarefa.**

<a id="api-usage"></a>

## 🔌 API usage

Não há guard ou middleware de autenticação nas rotas atuais. Os caminhos são relativos a `/my-bus/v1` com o ambiente acima.

| Método | Caminho | Finalidade |
| --- | --- | --- |
| GET | `/user/get-user-info/:identifier` | Consultar usuário |
| POST | `/user/register-user` | Cadastrar usuário |
| GET | `/vehicles/get-vehicle-info/:identifier` | Consultar veículo |
| POST | `/vehicles/get-vehicles-infos` | Consultar array `registrationPlates` |
| POST | `/vehicles/register-vehicle` | Cadastrar veículo |
| PUT | `/vehicles/update-vehicle/:identifier` | Atualizar veículo |
| DELETE | `/vehicles/delete-vehicle/:identifier` | Excluir veículo |
| POST | `/feedback/app` | Feedback do aplicativo |
| POST | `/feedback/vehicle` | Feedback de veículo |

Exemplo para **seu Firestore de desenvolvimento**:

```bash
curl -X POST http://localhost:3001/my-bus/v1/user/register-user \
  -H 'Content-Type: application/json' \
  -d '{"email":"pessoa@example.com","name":"Pessoa Exemplo","isPassenger":true,"uid":"usuario-exemplo","linkedVehicles":[]}'
```

Os campos e tipos estão em `src/v1/validators/` e `src/v1/interfaces/`. Há uma [definição Swagger](documentation/swagger.yaml) para consulta; não existe endpoint que a sirva automaticamente. O código de controllers é a referência para os caminhos atuais.

<a id="project-structure"></a>

## 🗂️ Project structure

| Caminho | Responsabilidade |
| --- | --- |
| `src/main.ts` | Porta e prefixo global |
| `src/v1/app.module.ts` | Configuração e dependências Nest |
| `src/v1/controllers/` | Rotas de usuários, veículos e feedback |
| `src/v1/services/` | Regras e validações de negócio |
| `src/v1/repository/` | Operações Firestore |
| `src/v1/database/` | Inicialização do SDK Firebase |
| `src/v1/validators/` / `interfaces/` | Contratos e validações |
| `test/unit/` / `test/mocks/` | Testes unitários e dados simulados |
| `.husky/` | Hooks de commit |
| `.github/workflows/` | CI e CodeQL |

<a id="testing-and-quality"></a>

## ✅ Testing and quality

| Comando | Finalidade |
| --- | --- |
| `npm run build` | Limpa `dist/` e compila com Nest |
| `npm test -- --runInBand` | Testes Jest e cobertura |
| `npm run eslint` | Análise ESLint |
| `npm run format` | Formatação com alteração dos arquivos |
| `npm run prepare` | Instala os hooks Husky locais |

A CI usa Node 18.16.1, instala dependências, executa testes e ESLint. Cobertura configurada não equivale a cobertura verificada. Evite misturar alterações automáticas de formatação a um PR de documentação.

### Validation recorded

Em 11/11/2026, a instalação foi tentada duas vezes com Node 18.16.1/npm 9.5.1; ambas terminaram com `ECONNRESET` durante acesso ao registro npm. Não houve instalação concluída. `npm run build` e os testes falharam por executáveis locais ausentes (`rimraf` e `jest`), e `start:prod` não encontrou `dist/main`. Nenhuma funcionalidade HTTP ou persistência Firestore foi verificada. As portas temporárias 4201 foram usadas apenas na tentativa; a porta padrão continua 3001. Todos os processos iniciados foram encerrados. A resolução também avisou que `encoding@0.1.14` exige Node >=20, divergindo do runtime declarado; essa incompatibilidade fica para avaliação separada.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

- `404`: confira `APPLICATION_PREFIX=my-bus/v1` e os caminhos dos controllers; o README anterior omitia `/v1`.
- Falhas de persistência: confira o projeto Firestore em `configuration.database.ts` e as regras do ambiente de desenvolvimento.
- Redis não altera o comportamento da API: não há consumo de `REDIS_*` em `src/`.
- Instalação com `ERESOLVE`: registre o conflito de peer dependencies; não force atualização de versões silenciosamente.
- Hook modifica código: revise o resultado de `npm run format` e separe mudanças fora do escopo.

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `main`, use mensagens Conventional Commits e execute build, testes e ESLint. Revise o diff após os hooks e abra um pull request descrevendo validações e dependências externas não verificadas.

<a id="license"></a>

## 📜 License

Este projeto está sob a **GNU Affero General Public License v3.0**, conforme [LICENSE](LICENSE). Os avisos existentes foram preservados.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
