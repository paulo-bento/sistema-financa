# Finanças pessoais

Finanças pessoais é um aplicativo web para acompanhar receitas, despesas e saldo. Cada pessoa cria uma conta e acessa apenas as próprias transações. A aplicação roda na Vercel e guarda os registros no MongoDB Atlas, de modo que eles continuam disponíveis ao sair e entrar novamente.

[Acessar o Finanças pessoais na Vercel](https://sistema-financa-dun.vercel.app/)

## Como funciona

1. Clique em **Entrar**. Se for seu primeiro acesso, escolha **Criar conta**, faça o cadastro e entre com seu e-mail e senha.
2. Na **Visão geral**, clique em **Nova transação**. Informe a descrição, o tipo (receita ou despesa), o valor em reais, a categoria e a data. Clique em **Salvar transação**.
3. Confira **Receitas**, **Despesas** e **Saldo** no topo do painel. Para consultar um recorte, selecione mês, tipo ou categoria e clique em **Aplicar filtros**. A lista e os totais mudam juntos. Use **Limpar filtros** para voltar à visão completa.
4. Clique em uma transação na lista para consultar ou editar seus dados. Para removê-la, clique em **Excluir transação** e confirme no diálogo.

## Como visualizar no formato de celular

1. Abra o aplicativo em um navegador no computador.
2. Clique com o botão direito na página e selecione **Inspecionar**.
3. Nas ferramentas do navegador, ative o **modo responsivo** pelo ícone de celular ou tablet.
4. No seletor de dispositivos acima da página, escolha um **modelo de telefone predefinido**. No painel, observe os filtros empilhados e a lista de transações ajustada à largura da tela.

## Como rodar localmente

Você precisa de **Node.js 20.19 ou superior**, npm e um cluster no **MongoDB Atlas**. No Atlas, configure um usuário de banco com permissão de leitura e escrita e adicione o IP da sua máquina à lista de IPs autorizados.

### 1. Clone o projeto e instale as dependências

```bash
git clone https://github.com/paulo-bento/sistema-financa.git
cd sistema-financa
npm ci
```

### 2. Configure o banco e a autenticação

Crie o arquivo `.env.local` na raiz do projeto, ao lado de `package.json`, e preencha as duas variáveis abaixo.

```dotenv
MONGODB_URI=
NEXTAUTH_SECRET=
```

- **`MONGODB_URI`** recebe a URI do driver fornecida pelo Atlas. Inclua as credenciais do usuário de banco e use `sistema_financa` no caminho da URI, antes do `?` das opções.
- **`NEXTAUTH_SECRET`** recebe um segredo aleatório usado pelo Auth.js. Execute o comando abaixo e copie o resultado para o arquivo.

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Mantenha o arquivo `.env.local` fora do Git.

### 3. Inicie o servidor

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador. Para validar o projeto, execute `npm run lint` e `npm run build`.

## Tecnologias

- **Next.js, React e TypeScript** para a interface, as rotas e as ações no servidor.
- **MongoDB Atlas** para persistir contas e transações. Os valores são armazenados em centavos.
- **Auth.js e bcryptjs** para autenticação, sessões JWT e armazenamento do hash das senhas.
- **Tailwind CSS e shadcn/ui** para a interface responsiva em estilo Adwaita.
- **Zustand** para os filtros e o diálogo de exclusão, e **Sonner** para as notificações.
