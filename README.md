# Teste Técnico - Cadastro de Usuários

Este projeto é uma aplicação web simples para cadastro de usuários, desenvolvida como parte de um teste técnico para avaliação de habilidades Full Stack.

## ✨ Tecnologias Utilizadas

- **Next.js (com TypeScript)**: Framework React moderno que oferece SSR/SSG e ótima estrutura de projeto.
- **PostgreSQL**: Banco de dados relacional para armazenamento persistente dos usuários.
- **React Hook Form + Zod**: Validação de formulários com integração robusta e tipagem segura.
- **Material UI (MUI)**: Biblioteca de componentes para interface moderna.
- **bcryptjs & jsonwebtoken**: Criptografia de senhas e geração de tokens.
- **Tailwind CSS**: Utilizado para estilização rápida e responsiva.
- **Jest**: Configurado para testes (embora testes não tenham sido implementados neste escopo).

---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/misereitor/teste-king.git
cd teste-king
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco PostgreSQL local e configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/seubanco
PGHOST=localhost
PGDATABASE=seubanco
PGUSER=usuario
PGPASSWORD=senha
SECRET_KEY=algumasecretkeysegura
```

> ⚠️ **Importante:** As queries SQL foram feitas manualmente, sem o uso de ORMs como Prisma.

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

---

## 🧪 Funcionalidades

- Cadastro de usuário com campos: **Nome**, **Email** e **Senha**.
- Validação de dados com `react-hook-form` + `zod`.
- Exibição dinâmica da lista de usuários cadastrados (sem recarregar a página).
- Estrutura organizada e modularizada.
- Senhas criptografadas antes de salvar no banco.

---

## 📦 Deploy

A aplicação está hospedada no Vercel:  
🔗 [https://teste-king.vercel.app](https://teste-king.vercel.app)

---

---

## 🧑‍⚖️ Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---

## 📬 Contato

Caso queira saber mais ou tenha dúvidas:  
**GitHub:** [@misereitor](https://github.com/misereitor)
