# Instruções para o Claude

## Contexto
- App web original (referência, SOMENTE LEITURA): repositório `leonoaldebaran-hash/ChamadaUebsOriginal`, arquivo `public/index.html`. Nunca altere aquele repositório; o `main` dele é o backup do aluno. A migração para React Native é feita pelo aluno no **Snack**, uma tarefa por vez, para ele aprender.
- Roteiro e padrões da migração: `docs/ROTEIRO_SNACK.md`. Estilo de código: apostila do professor, `docs/React native.pdf`.
- Passe uma tarefa por vez, explique o porquê de cada passo e espere o aluno terminar antes de passar a próxima.
- Responda em português.
- **Objetivo final: publicar na Google Play Store.** Prefira bibliotecas do Expo compatíveis com EAS Build e avise quando algo não rodar no Expo Go.
- **Sempre envie o `package.json` completo** quando uma tarefa precisar de biblioteca nova, pronto para copiar e colar (e explique linha por linha).
- Este repositório é o espelho do Snack (https://snack.expo.dev/@leonoaldebaran/26a8b7): `App.js`, `package.json`, `assets/`, `components/`... ficam na raiz, igual ao Snack. Atualize-o e o status em `docs/ROTEIRO_SNACK.md` ao fim de cada tarefa.
- `docs/MIGRACAO_REACT_NATIVE.md` mapeia as funções do `index.html` original (números de linha daquele repositório).
- No Snack as imagens ficam em `assets/images/` (ex.: `require('../../assets/images/logo.png')`).
- **Sempre explique linha por linha todo código passado ao aluno** (cada import, cada tag, cada propriedade de estilo). Ao reenviar uma tarefa, envie a tarefa completa, não só o trecho que mudou.

## Convenção de nomes (OBRIGATÓRIA, definida pelo aluno)
- **Pastas**: camelCase, começando com minúscula → `components/customButton/`, `components/textInputBox/`, `screens/login/`, `screens/escolhaAcesso/`
- **Arquivos de classe/componente/tela**: PascalCase, começando com maiúscula → `CustomButton.js`, `TextInputBox.js`, `LoginScreen.js`, `MathUtils.js`
- O arquivo de estilo de cada componente se chama `Style.js`.
- Exemplo: `components/customButton/CustomButton.js` + `components/customButton/Style.js`
