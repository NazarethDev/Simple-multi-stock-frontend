# Multi Stock Frontend 🛒

Este é o cliente web da plataforma **Multi Stock**, desenvolvido para oferecer uma interface intuitiva na gestão de estoques e monitoramento de validades de uma rede de lojas. 

O projeto consome a [Multi Stock API](https://github.com/NazarethDev/simple-multi-stock-personal-backend) para centralizar informações de diferentes unidades geográficas.

Caso deseje, há uma versão de demonstração da API em execução com fake data disponível [neste link](https://simple-multi-stock-app-git-develop-nazarethdevs-projects.vercel.app/).

---

## 🚀 Como executar o projeto

1. **Clone o repositório:**
```bash
   git clone https://github.com/NazarethDev/Simple-multi-stock-frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:** Crie um arquivo .env na raiz do projeto e adicione a URL da sua API:
```Snippet de código
VITE_API_URL=http://localhost:SUA_PORTA_DA_API
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

## 📍 Navegação e Rotas
A aplicação está organizada nas seguintes páginas:

| Rota                  | Componente                    | Descrição                                                                 |
|-----------------------|-------------------------------|---------------------------------------------------------------------------|
| /                     | InitialPage                   | Painel principal com acesso rápido às funcionalidades.                     |
| /lista-de-validades   | ProductExpirationDatesPage    | Visualização de produtos próximos ao vencimento.                           |
| /produtos-vencidos    | ExpiredProductsListPage       | Listagem histórica de itens já expirados (últimos 90 dias).                |
| /procurar-por-codigo  | FindProductByBarCode          | Busca rápida de produtos via EAN/Código de Barras.                         |
| /novo-produto         | NewProductsPage               | Formulário para cadastro de novos itens no sistema.                        |
| /atualizar-dados-base | UpdateNameAndCostPage         | Interface para edição de nomes, custos e datas.                            |
| /estatisticas         | StatisticsPage                | Dashboard com gráficos de perdas financeiras e produtos mais expirados.   |

## 🛠️ Tecnologias Utilizadas

- React.js: Biblioteca base para a construção da interface.
- React Router Dom: Gerenciamento de navegação entre páginas.
- Axios: Cliente HTTP para consumo da API.
- Vite: Ferramenta de build e servidor de desenvolvimento.

## 💡 Funcionalidades Chave
- Controle Multiloja: Interface preparada para exibir saldos de estoque divididos por unidades (Guaianases, Tiradentes, Ferraz, etc).
- Gestão de Perdas: Área dedicada a estatísticas que transformam dados de vencimento em valores monetários, facilitando a tomada de decisão.
- Escalabilidade: Pronto para integração futura com sistemas de frente de caixa (TPS).

## 🔗 Links Úteis
- Backend/API: https://github.com/NazarethDev/simple-multi-stock-personal-backend
- Deploy: https://simple-multi-stock-app-git-develop-nazarethdevs-projects.vercel.app/