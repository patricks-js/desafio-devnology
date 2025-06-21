# Desafio - Devnology

## Objetivo

Este projeto é a solução do desafio técnico full stack da Devnology. O projeto consiste em uma API em Node.js, um front-end web e um aplicativo mobile. O objetivo principal é a criação de uma plataforma e-commerce simples que integra com provedores externos de produtos, permitindo usuários navegar, pesquisar, filtrar e simular a compra de produtos. 

## Estrutura

O projeto está organizado em 3 partes principais:

-   `backend/`: Uma aplicação NestJS que serve como a API da plataforma.
    - [Veja instruções detalhadas no README do backend](./backend/README.md)
-   `frontend/`: Uma aplicação React para a interface web.
    - [Veja instruções detalhadas no README do frontend](./frontend/README.md)
-   `mobile/`: Um aplicativo simples em Flutter.
    - [Veja instruções detalhadas no README do mobile](./mobile/README.md)

## Funcionalidades Principais

- **Integração de Produtos**: O backend se integra com dois fornecedores externos de produtos (um brasileiro e um europeu), normalizando seus dados em um único `ProductDTO`.
- **Catálogo de Produtos**: O frontend exibe produtos de todos os fornecedores em uma grade unificada, com suporte a rolagem infinita.
- **Busca e Filtros**: Usuários podem buscar produtos e aplicar filtros por categorias, departamentos, materiais e faixa de preço.
- **Carrinho de Compras**: Um carrinho de compras no lado do cliente permite adicionar, remover e atualizar a quantidade de produtos.
- **Processo de Checkout**: Usuários podem finalizar suas compras, o que cria um pedido no sistema com os itens do carrinho.
- **Histórico de Pedidos**: Usuários podem visualizar seus pedidos anteriores na página de checkout.

## Decisões Técnicas Tomadas

### Backend

- **Framework**: Usei o **NestJS**, que é ótimo pra manter o projeto organizado, modular e escalável. Como ele é baseado em TypeScript, já traz mais segurança e previsibilidade pro código.
- **Organização**: Separei tudo por módulos (`Products`, `Orders`, `Providers`), o que ajuda bastante na hora de manter ou expandir a aplicação.
- **Banco de dados**: Optei por usar o **Prisma** com **SQLite** no ambiente local. Isso facilita o setup (sem precisar de banco rodando à parte) e ainda tenho tipagem automática e migrações bem estruturadas com o Prisma.
- **Integrações externas**: O backend se conecta com dois fornecedores de produtos (um brasileiro e um europeu). Os dados chegam com formatos diferentes, então usei um padrão de **Mapper** (`BrazilianProviderMapper`, `EuropeanProviderMapper`) pra transformá-los num `ProductDTO` comum.
- **Validação**: Pra garantir que os dados enviados pra API estejam corretos, usei `class-validator` e `class-transformer` nos DTOs, como o `CreateOrderDto`.

### Frontend

- **Stack principal**: O frontend é feito com **React + Vite**, pra garantir uma experiência de desenvolvimento mais rápida e fluida, com recarregamento instantâneo.
- **Estado**:

  - **Dados da API**: Usei o **TanStack Query** pra lidar com o estado do servidor (fetch, cache, refetch). Ele resolve bem o fluxo de dados assíncronos e melhora a performance.
  - **Estado do cliente**: O **Zustand** cuida do estado global do app, como o carrinho de compras e o ID de usuário visitante. Com o middleware de persistência, o carrinho continua intacto mesmo recarregando a página.
- **Roteamento**: O **TanStack Router** está configurado com roteamento baseado em arquivos — o que deixa tudo mais intuitivo e ainda garante tipagem nas rotas.
- **UI e estilo**: Usei **Tailwind CSS** junto com os componentes do **Shadcn/ui**. Isso ajuda a construir a interface mais rápido, mantendo controle total sobre os componentes (já que o código é copiado pro projeto).
- **Filtros na URL**: Com a lib **`nuqs`**, consegui sincronizar os filtros (como categoria e preço) com a URL. Isso deixa a navegação mais flexível — dá pra compartilhar links com filtros ou salvar nos favoritos, por exemplo.

### Mobile

- **Framework**: O aplicativo mobile foi desenvolvido em **Flutter**, permitindo compatibilidade com Android e iOS.
- **Funcionalidades**: O app permite navegação pelo catálogo, busca, filtros e simulação de compra, sincronizando com o backend.
