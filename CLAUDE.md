# Instruções para o Claude

## Contexto
- App web original (referência, SOMENTE LEITURA): repositório `leonoaldebaran-hash/ChamadaUebsOriginal`, arquivo `public/index.html`. Nunca altere aquele repositório; o `main` dele é o backup do aluno. A migração para React Native é feita pelo aluno no **Snack**, uma tarefa por vez, para ele aprender.
- Roteiro e padrões da migração: `docs/ROTEIRO_SNACK.md`. Estilo de código: apostila do professor, `docs/React native.pdf`.
- Passe uma tarefa por vez, explique o porquê de cada passo e espere o aluno terminar antes de passar a próxima.
- Responda em português.
- **Destino único: Web/PWA publicado no Firebase Hosting** (`npx expo export -p web`), gratuito, para iPhone, Android e PC. Não vamos publicar em lojas (Play Store/App Store) nem distribuir APK.
- Toda biblioteca e componente precisa funcionar **na Web** (react-native-web). Oriente testar principalmente na aba **Web** do Snack e no navegador do celular. Para avisos, use `alert('mensagem')` (orientação do professor; funciona na Web e no celular) em vez de `Alert.alert`, que não funciona na Web. `alert` recebe **um único texto**. Mensagens que ficam na tela usam `useState` (capítulo 6).
- O PWA atual (repositório original) continua no ar até a versão nova estar completa.
- **Sempre envie o `package.json` completo** quando uma tarefa precisar de biblioteca nova, pronto para copiar e colar (e explique linha por linha).
- Este repositório é o espelho do Snack (https://snack.expo.dev/@leonoaldebaran/26a8b7): `App.js`, `package.json`, `assets/`, `components/`... ficam na raiz, igual ao Snack. Atualize-o e o status em `docs/ROTEIRO_SNACK.md` ao fim de cada tarefa.
- `docs/MIGRACAO_REACT_NATIVE.md` mapeia as funções do `index.html` original (números de linha daquele repositório).
- No Snack as imagens ficam em `assets/images/` (ex.: `require('../../assets/images/logo.png')`).
- **Sempre explique linha por linha todo código passado ao aluno** (cada import, cada tag, cada propriedade de estilo). Ao reenviar uma tarefa, envie a tarefa completa, não só o trecho que mudou.

## Design e experiência (UX)
- A cada tarefa, avalie se o layout e o fluxo estão no padrão de apps do mercado; se não estiverem, sugira melhorias ao aluno antes de seguir.
- **Login único** (e-mail + senha, Google, "Esqueci minha senha", "Aluno novo? Criar conta"). Não existe tela "Escolha o tipo de acesso": o papel (admin/coordenador/aluno) vem do perfil no Firebase depois do login, como no `handleAuthStateChange` do original.
- **Perfis múltiplos**: uma conta (um e-mail) pode ter vários papéis: aluno, coordenador e admin (admin pode ser **principal** ou **secundário**). Depois do login, o app monta a lista de perfis da conta: se houver só 1, entra direto; se houver mais, mostra a tela **"Como você quer entrar?"** (cartões por perfil), lembra a última escolha e oferece **"Trocar perfil"** no menu, sem sair da conta. Admin principal x secundário NÃO é outro perfil: é nível de permissão dentro da área Admin (o principal vê também Administradores, Logs, Backup e Conversões).
- No original: admin principal = e-mail fixo no código (`uebs.firebase@gmail.com`); admin secundário = `users/{uid}.role == 'admin'`; coordenador = existe `admin/coordinators/list/{uid}`; aluno = `role == 'student'` ou vínculo em `student/authLinks/records/{uid}`. Na migração, a proteção real deve estar nas regras do Firestore (não só no app).
- **Cores centralizadas** em `utils/Cores.js`, tiradas do logo: primária azul-marinho `#34497a`, destaque verde `#8cc63f`. Uma cor primária só; hierarquia de botões pelo `CustomButton` com `variante` = `primario` | `contorno` | `link`.
- Conteúdo com `maxWidth: 400` centralizado (o app é PWA e também abre no PC). Botões com área de toque ≥ 44px.

## Convenção de nomes (OBRIGATÓRIA, definida pelo aluno)
- **Pastas**: camelCase, começando com minúscula → `components/customButton/`, `components/textInputBox/`, `screens/login/`, `screens/escolhaAcesso/`
- **Arquivos de classe/componente/tela**: PascalCase, começando com maiúscula → `CustomButton.js`, `TextInputBox.js`, `LoginScreen.js`, `MathUtils.js`
- O arquivo de estilo de cada componente se chama `Style.js`.
- Exemplo: `components/customButton/CustomButton.js` + `components/customButton/Style.js`
