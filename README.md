# CIn Reviews: Sistema de Resenhas e Avaliações Acadêmicas 📚

Uma plataforma web moderna para compartilhamento e avaliação de disciplinas, desenvolvida como projeto de Engenharia de Software. Permite que estudantes escrevam, leiam e gerenciem resenhas sobre seus cursos.

---

## 🎯 Visão Geral do Projeto

Este é um sistema full-stack que conecta um **frontend em React** com um **backend em FastAPI**, permitindo que a comunidade acadêmica compartilhe experiências e avaliações sobre disciplinas. A plataforma oferece funcionalidades como autenticação de usuários, gestão de disciplinas, criação de resenhas e interação em tempo real.

## 🛠️ Stack Tecnológico

### Backend
- **Framework**: FastAPI ⚡️
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT (Python-jose)
- **Validação**: Pydantic
- **Testes**: Pytest + pytest-bdd
- **Python**: 3.8+

### Frontend
- **Framework**: React 18 ⚛️
- **Build Tool**: Vite
- **Linguagem**: TypeScript
- **Roteamento**: React Router v6
- **Gerenciamento de Formulários**: React Hook Form
- **Validação**: Zod
- **Testes E2E**: Cypress com Cucumber
- **Node.js**: 16+

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python 3.8+** - [Download](https://www.python.org/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm ou yarn** - Inclusos no Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) ou use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Como Executar Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/kaylanelira/cin-review.git
cd ess-project
```

### 2. Configurar e Executar o Backend

```bash
# Acessar o diretório do backend
cd backend

# Criar e ativar um ambiente virtual
python -m venv venv

# No Windows
venv\Scripts\activate
# No macOS/Linux
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar o servidor
cd src
uvicorn main:app --reload
```

O backend estará disponível em `http://localhost:8000`

**Endpoints principais:**
- `POST /user/register` - Registrar novo usuário
- `POST /user/login` - Fazer login
- `GET /discipline` - Listar disciplinas
- `POST /review` - Criar resenha
- `GET /review` - Listar resenhas

### 3. Configurar e Executar o Frontend

```bash
# Em outro terminal, acessar o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Ou modo de testes
npm run testing
```

O frontend estará disponível em `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
ess-project/
├── backend/
│   ├── src/
│   │   ├── main.py                 # Aplicação principal FastAPI
│   │   ├── routers/                # Endpoints da API
│   │   │   ├── user.py             # Autenticação e perfil
│   │   │   ├── discipline.py       # Gestão de disciplinas
│   │   │   ├── review.py           # Criação de resenhas
│   │   │   ├── library.py          # Biblioteca de conteúdos
│   │   │   └── displayreviews.py   # Visualização de resenhas
│   │   ├── schemas/                # Schemas de validação
│   │   ├── db/                     # Conexão e modelos do banco
│   │   ├── service/                # Lógica de negócio
│   │   └── tests/                  # Testes BDD com Cucumber
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               # Ponto de entrada
│   │   ├── App.tsx                # Roteamento principal
│   │   ├── app/home/              # Módulo principal
│   │   │   ├── pages/             # Páginas (Login, Feed, etc)
│   │   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── forms/             # Formulários
│   │   │   ├── context/           # Context API (Auth, etc)
│   │   │   └── models/            # Tipos e interfaces
│   │   └── shared/                # Utilitários e componentes shared
│   ├── cypress/                   # Testes E2E
│   ├── package.json
│   └── vite.config.ts
│
└── config/
    ├── cli.py
    └── constants.py
```

---

## 🧪 Testes

### Backend - Testes Unitários e BDD

```bash
cd backend/src

# Executar todos os testes
pytest

# Executar com cobertura
pytest --cov=. --cov-report=html
```

**Estrutura de testes:**
- `tests/step-definitions/` - Implementação de steps do BDD
- `tests/features/` - Arquivos Gherkin (.feature)

### Frontend - Testes Unitários

```bash
cd frontend

# Executar testes com Vitest
npm test

# Com cobertura
npm run test:coverage
npm run test:show-coverage
```

### Frontend - Testes E2E

```bash
cd frontend

# Abrir interface do Cypress interativa
npm run cy:e2e-interactive

# Executar em modo headless
npm run cy:e2e-headless

# Visualizar cobertura
npm run cy:show-coverage
```

---

## 📝 Principais Funcionalidades

✅ **Autenticação**
- Registro e login de usuários
- Gerenciamento de perfil
- Exclusão de conta

✅ **Disciplinas**
- Listar disciplinas cadastradas
- Adicionar novas disciplinas
- Editar disciplinas (admin)

✅ **Resenhas**
- Criar e publicar resenhas sobre disciplinas
- Avaliação e feedback da comunidade
- Visualizar histórico de resenhas

✅ **Feed**
- Timeline com resenhas recentes
- Filtrar por disciplina
- Busca por conteúdo

✅ **Biblioteca**
- Acervo de recursos acadêmicos
- Categorização de conteúdo

---

## 🔧 Variáveis de Ambiente

### Backend (`backend/src/.env`)

```env
DATABASE_URL=mongodb://localhost:27017/ess-db
JWT_SECRET_KEY=sua-chave-secreta-aqui
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000
```
