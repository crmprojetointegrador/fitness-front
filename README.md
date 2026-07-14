
# 🏋️‍♀️ PowerPlace App - Front-End

Bem-vindo ao repositório front-end do **PowerPlace**! 

Este projeto foi desenvolvido de forma colaborativa como **Projeto Integrador** para o bootcamp de Desenvolvedor Web Full Stack da **Generation Brasil**. Nossa aplicação é voltada para o universo fitness, projetada para gerenciar o ecossistema de saúde e bem-estar, incluindo o cadastro de categorias e produtos, autenticação de usuários e uma calculadora de IMC integrada.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

* **React (v18):** Biblioteca principal para a construção da interface de usuário.
* **TypeScript:** Tipagem estática para um código mais seguro e escalável.
* **Vite:** Build tool e servidor de desenvolvimento ultrarrápido.
* **Tailwind CSS:** Framework utilitário para estilização e criação de interfaces.
* **React Router DOM:** Gerenciamento das rotas e navegação da aplicação (Single Page Application).
* **Axios:** Cliente HTTP para realizar as requisições à API.
* **React Spinners / React Loader Spinner:** Animações de carregamento para feedbacks visuais.
* **React Toastify / ToastAlerta:** Notificações e alertas dinâmicos na tela.
* **ReactJS Popup:** Implementação de modais interativos.
* **JSON Server:** Utilizado durante o desenvolvimento para simular a API REST completa (Mock Backend).

## ✨ Funcionalidades Implementadas

* **Autenticação:** Cadastro de novos usuários e sistema de login seguro.
* **Calculadora de IMC:** Ferramenta integrada para que os usuários possam calcular seu Índice de Massa Corporal e receber feedback sobre seu estado físico.
* **Gerenciamento de Categorias:** Listagem, cadastro, edição e exclusão de categorias (ex: Suplementos, Acessórios, Roupas Fitness) para organizar os itens de forma eficiente.
* **Gerenciamento de Produtos (CRUD):** Listagem, cadastro, edição e exclusão de produtos fitness, com propriedades como nome, marca, preço, calorias e data de validade.

## 🎨 Design e Identidade Visual

A interface possui um design moderno e responsivo, utilizando *glassmorphism* (efeitos de desfoque) e uma paleta focada em energia e saúde:

* **Verde Menta Claro (`#C9EED9`):** Fundos, cabeçalhos de cards e botões secundários.
* **Verde Floresta (`#3B8C5A`):** Botões de confirmação e ações principais.
* **Vermelho Suave (`#F87171` ou `red-400`):** Alertas e botões para ações destrutivas (exclusão).
* **Tons Neutros:** Branco e Cinza Escuro (Slate) para garantir alto contraste e legibilidade com a tipografia Poppins.

## 🛠️ Como executar o projeto localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18+ recomendada) e o **npm** instalados na sua máquina.

### Passos para a execução

**1. Clone o repositório:**
```bash
git clone [https://github.com/crmprojetointegrador/fitness-front.git](https://github.com/crmprojetointegrador/fitness-front.git)

```

**2. Acesse a pasta do projeto:**

```bash
cd fitness-front

```

**3. Instale as dependências:**

```bash
npm install

```

**4. Inicie o Mock Backend (JSON Server):**
Abra um terminal, certifique-se de estar na raiz do projeto e rode o comando abaixo para iniciar o banco de dados falso na porta 3000.

```bash
npm run server

```

**5. Inicie o Front-End:**
Abra um segundo terminal (mantendo o servidor rodando no primeiro) e inicie a aplicação com o Vite.

```bash
npm run dev

```

A aplicação estará disponível no seu navegador, geralmente no endereço `http://localhost:5173`.

## 🤝 Equipe de Desenvolvimento

Este projeto foi construído a várias mãos, unindo o esforço, os estudos e a dedicação de toda a equipe durante a formação na **Generation Brasil**.

* [Eliane Orlandin](https://github.com/Eliane-orlandin)
* [Bruna Mendes](https://github.com/bruna-dsmendes)
* [PraFlame](https://github.com/PraFlame)
* [Alanis Santos](https://www.google.com/search?q=https://github.com/alanis-santos)

---

*PowerPlace App © 2026 - Generation Brasil*

