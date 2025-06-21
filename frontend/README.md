# Aplicação Frontend

Este frontend é uma aplicação de página única (SPA) construída com React e Vite, oferecendo uma interface moderna e reativa para a plataforma de e-commerce.

## Tecnologias Utilizadas

* **Framework**: React 19
* **Build Tool**: Vite
* **Roteamento**: TanStack Router (baseado em arquivos)
* **Gerenciamento de Estado**:

  * **Zustand** para estado global (como carrinho de compras e ID de usuário convidado)
  * **TanStack Query** para estado do servidor e cache de requisições
* **UI**:

  * **Tailwind CSS** para estilização
  * **Shadcn/ui** para componentes de interface reutilizáveis
* **Lint e Formatter**: BiomeJS
* **Gerenciador de Pacotes**: pnpm

## Primeiros Passos

### Pré-requisitos

* Node.js
* pnpm

### Instalação

1. Acesse o diretório `frontend`.
2. Instale as dependências:

   ```bash
   pnpm install
   ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3001`.
Ela está configurada para fazer proxy das requisições `/api` para o backend rodando em `http://localhost:3000/api`.

## Estrutura do Projeto

A aplicação é organizada por funcionalidades (features) e rotas.

* `src/main.tsx`: Ponto de entrada da aplicação, onde o TanStack Router é inicializado.
* `src/lib/utils.ts`: Funções utilitárias como `formatPrice` (para formatar valores monetários).
* `src/providers/`: Engloba todos os contextos globais, como `ThemeProvider`, `QueryClientProvider` e `NuqsAdapter` (para sincronizar o estado com a URL).
* `src/components/ui/`: Componentes de interface reutilizáveis vindos do Shadcn.
* `src/hooks/`: Hooks globais personalizados, como `use-guest-user.ts`, que gera um ID único para usuários não autenticados.
* `src/routes/`: Define as rotas da aplicação, seguindo o padrão de roteamento por arquivos do TanStack Router.

  * `__root.tsx`: Layout raiz com `Header`, `Footer`, `ProductFiltersToolbar` e `CartSidebar`.
  * `index.tsx`: Página inicial com a grade principal de produtos.
  * `products.$id.tsx`: Página de detalhes de um produto.
  * `checkout.tsx`: Página com o histórico de pedidos do usuário.
* `src/features/`: Contém a lógica específica de cada domínio.

  * **products**:

    * `hooks/use-products.tsx`: Busca e gerencia a lista paginada de produtos, com filtros.
    * `hooks/use-product.tsx`: Busca os dados de um produto específico por ID.
    * `hooks/use-product-filters.tsx`: Gerencia o estado dos filtros disponíveis e a seleção do usuário, sincronizando com a URL via `nuqs`.
    * `components/product-grid.tsx`: Renderiza a grade de produtos com rolagem infinita usando `react-intersection-observer`.
  * **cart**:

    * `hooks/use-cart.ts`: Zustand store para o estado do carrinho, com persistência em local storage.
    * `components/cart-sidebar.tsx`: UI do carrinho, permitindo visualizar e gerenciar itens.
  * **checkout**:

    * `hooks/use-checkout.ts`: Lida com a criação do pedido a partir dos itens do carrinho.
    * `hooks/use-get-orders.ts`: Busca o histórico de pedidos do usuário atual.
    * `components/checkout-table.tsx`: Tabela que exibe os detalhes de um pedido.
