# Estado atual

Atualizado em 22/11/2026.

- A etapa 1 está concluída. A página inicial usa Next.js 16.4.6 com App Router em `src/app`, TypeScript estrito, Tailwind CSS 4 e o Card do ShadCN/UI adaptado à paleta Adwaita. O tema acompanha a preferência do sistema e a fonte Cantarell é servida pelo próprio projeto.
- Na etapa 2, o driver oficial MongoDB 7.9.1 e o Singleton em `src/lib/mongodb.ts` estão instalados. A promessa da conexão fica em `globalThis` por processo e é descartada quando a conexão falha. O Node.js mínimo é 20.19, conforme o requisito do driver.
- A etapa 3 está concluída. As rotas `/register` e `/login` usam Server Actions, Auth.js com Credentials e sessão JWT. O cadastro normaliza o e-mail, aplica índice único na coleção `usuarios` e grava somente o hash bcrypt da senha. O dashboard consulta a sessão no servidor e oferece logout. `NEXTAUTH_SECRET` está configurada no `.env.local`.
- A etapa 4 está concluída. O dashboard lista transações da conta atual. As rotas `/transacoes/nova` e `/transacoes/[id]` oferecem cadastro, leitura e edição. A exclusão exige confirmação em diálogo. As Server Actions validam campos e revalidam as rotas após a gravação.
- A etapa 5 está concluída. `src/proxy.ts` redireciona navegações anônimas para o login. As páginas e Server Actions verificam a sessão, e as consultas de transação incluem o `userId` da sessão.
- A etapa 6 está concluída. Mês, tipo e categoria são controles do Zustand sincronizados com os parâmetros da URL. O MongoDB aplica os parâmetros junto ao `userId`. Receitas, despesas e saldo são calculados em centavos sobre a lista filtrada, conforme confirmado pelo usuário.
- A etapa 7 está concluída. Dashboard e transações usam layouts aninhados, spinners de carregamento e limites de erro com nova tentativa. As ações de transações e autenticação emitem toasts.
- A etapa 8 está concluída. O cabeçalho centralizado mantém o usuário e o botão de saída à direita. A lista e os formulários usam a paleta Adwaita, e o dashboard empilha os filtros nas telas estreitas.

## Validação

- `npm run dev` iniciou. A home retornou HTTP 200 no Chromium a 375 px e 1280 px nos temas claro e escuro. A verificação conferiu a paleta aplicada, a fonte, a borda e a ausência de rolagem horizontal.
- A rota temporária da etapa 2 retornou HTTP 503 com a mensagem esperada quando `MONGODB_URI` estava ausente. A rota foi removida depois do teste.
- Com `MONGODB_URI` configurada no `.env.local`, dois pings ao Atlas para o banco `sistema_financa` retornaram `ok: 1`. A segunda chamada reutilizou o mesmo cliente MongoDB. A rota temporária foi removida e o build e o lint passaram. Etapa 2 concluída.
- `npm run build` e `npm run lint` passaram na etapa 1 e após as alterações da etapa 2.
- Na etapa 3, `npm run build` e `npm run lint` passaram. O Chromium confirmou o cadastro, o hash bcrypt no Atlas, a rejeição da senha errada, a sessão após recarregar e o logout. A conta temporária foi removida. O teste de `npm run start` em loopback usou `AUTH_URL` com a origem local.
- Na etapa 4, build e lint passaram. No Chromium, foram verificados criação, leitura por ID, edição, cancelamento e confirmação da exclusão. O Atlas confirmou a data UTC, o valor inteiro em centavos e o `userId` em ObjectId. Um envio após limpar a sessão foi recusado.
- Na etapa 5, build e lint passaram. O acesso anônimo devolveu HTTP 307 para o login. No Chromium, a segunda conta não viu a transação na lista, recebeu HTTP 404 no detalhe e teve edição e exclusão recusadas. Uma criação após expirar a sessão foi recusada.
- Na etapa 6, build e lint passaram. No Chromium, a combinação de filtros excluiu registros de outros meses e categorias, e os totais bateram com os valores gravados. Recarregar, voltar no navegador e limpar os filtros foram verificados.
- Na etapa 7, build e lint passaram. Uma simulação temporária de lentidão e falha na consulta confirmou o spinner e a recuperação pelo botão de nova tentativa. No Chromium, os toasts apareceram nas ações testadas e a sessão persistiu após recarregar.
- Na etapa 8, build e lint passaram. No Chromium, home, login, cadastro, dashboard, criação, edição e confirmação foram verificados a 375 px e 1280 px nos temas claro e escuro. A busca em `src/` não encontrou `<img>` nem âncoras HTML para rotas internas.
- Na etapa 9, build e lint passaram. Com `npm run dev`, foram verificados cadastro, login, sessão após recarregar, CRUD, filtros, saldo e logout. A conta de teste foi removida. Na Vercel, a home e o login retornaram HTTP 200 e o dashboard anônimo redirecionou com HTTP 307.
- A etapa 9 foi concluída na [Vercel](https://sistema-financa-dun.vercel.app), com conectividade ao Atlas verificada. `MONGODB_URI` e `NEXTAUTH_SECRET` estão configuradas como segredos na Vercel.
- O Proxy passou a validar o JWT sem renovar o cookie durante a navegação. Build e lint passaram após a correção. No Chromium em produção, foram verificados cadastro, login, sessão após recarregar, CRUD, filtros combinados, saldo e logout. O teste confirmou a ausência de sessão após sair e a conta temporária foi removida.

## Pendências

- Nenhuma pendência nas nove etapas da especificação.
