# API Backend

Este backend é uma aplicação [NestJS](https://nestjs.com/) responsável por lidar com a lógica de negócio, persistência de dados e integração com provedores externos de produtos.

## Tecnologias Utilizadas

* **Framework**: NestJS
* **ORM**: Prisma
* **Banco de Dados**: SQLite
* **HTTP Client**: Axios (via `@nestjs/axios`)
* **Lint e Formatter**: BiomeJS
* **Gerenciador de Pacotes**: pnpm

## Primeiros Passos

### Pré-requisitos

* Node.js (>= 20)
* pnpm

### Instalação

1. Acesse o diretório `backend`.
2. Instale as dependências:

   ```bash
   pnpm install
   ```
3. Crie o arquivo `.env` com as variáveis de ambiente necessárias:

   * `BRAZILIAN_PROVIDER_API_URL`
   * `EUROPEAN_PROVIDER_API_URL`

4. Aplique as migrações do banco de dados:

   ```bash
   pnpm prisma migrate dev
   ```

### Executando a Aplicação

* **Modo desenvolvimento (com watch):**

  ```bash
  pnpm start:dev
  ```

* **Build para produção:**

  ```bash
  pnpm build
  pnpm start:prod
  ```

A API ficará disponível em `http://localhost:3000/api`.

## Estrutura do Projeto

O backend segue uma arquitetura modular.

* `src/main.ts`: Ponto de entrada da aplicação, onde a instância NestJS é criada com prefixo global `/api` e CORS ativado.
* `src/app.module.ts`: Módulo raiz que importa os demais módulos de funcionalidades.
* `src/prisma/`: Contém o schema do Prisma, migrações e o `PrismaService` injetável.
* **Módulos**:

  * `src/modules/products/`: Lida com lógica de busca e filtragem de produtos.

    * Faz chamadas para provedores brasileiros e europeus, unificando os dados.
    * Endpoints para listar produtos, buscar por ID e obter filtros disponíveis.
  * `src/modules/orders/`: Gerencia a criação e listagem de pedidos.

    * Valida os produtos antes de criar um pedido.
    * Salva os pedidos e itens em transação para garantir consistência.
    * Endpoints para criar pedidos e buscar pedidos por cliente.
  * `src/modules/providers/`: Lógica de integração com APIs externas.

    * `BrazilianProvidersService` e `EuropeanProvidersService` fazem as requisições.
    * `BrazilianProviderMapper` e `EuropeanProviderMapper` normalizam os dados para o formato interno `ProductDTO`.

## Endpoints da API

* `GET /products`: Lista paginada e filtrável de produtos.

  * Parâmetros de filtro: `q`, `categories`, `departments`, `materials`, `minPrice`, `maxPrice`
  * Parâmetros de paginação: `limit`, `offset`
* `GET /products/:id`: Retorna um produto pelo ID
* `GET /product-filters`: Retorna categorias, departamentos e materiais disponíveis
* `POST /orders`: Cria um novo pedido
* `GET /orders/:customerId`: Retorna todos os pedidos de um cliente

## Modelo do Banco de Dados

O banco utiliza o Prisma com SQLite e possui duas tabelas principais:

1. **orders**: Armazena informações do pedido (como `customerId`, `totalAmount`, `status`)
2. **order\_items**: Armazena os itens do pedido (`productId`, `productName`, `quantity`, `price`, `subtotal`).
   O campo `product_id` foi alterado para `TEXT` para suportar IDs de diferentes provedores.
