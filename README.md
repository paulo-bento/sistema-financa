# Finanças pessoais

Sistema de controle de receitas e despesas. Cada conta tem suas próprias transações e pode consultar a lista e os totais por mês, tipo e categoria.

## Rodar localmente

Use Node.js 20.19 ou superior e npm.

```bash
git clone https://github.com/paulo-bento/sistema-financa.git
cd sistema-financa
npm install
```

Crie `.env.local` na raiz com as variáveis abaixo.

- `MONGODB_URI` recebe a URI do MongoDB Atlas com o banco `sistema_financa`.
- `NEXTAUTH_SECRET` recebe o segredo aleatório usado pelo Auth.js para proteger as sessões.

```bash
npm run dev
```

Acesse [localhost:3000](http://localhost:3000). Use `npm run lint` para verificar o código e `npm run build` para gerar o build de produção. Para executar esse build localmente, use `AUTH_URL=http://localhost:3000 npm run start`.

## Tecnologias

- Next.js com App Router, React e TypeScript estrito
- MongoDB Atlas com o driver oficial
- Auth.js com Credentials e JWT, e bcryptjs para o hash de senhas
- Tailwind CSS e componentes ShadCN/UI adaptados à paleta Adwaita
- Zustand para filtros e diálogo, e Sonner para os toasts

## Deploy na Vercel

Vincule o projeto à Vercel e configure `MONGODB_URI` e `NEXTAUTH_SECRET` em **Settings → Environment Variables** para o ambiente de produção antes de publicar. O cluster Atlas precisa aceitar conexões da implantação.

[Abrir o sistema na Vercel](https://sistema-financa-dun.vercel.app).
