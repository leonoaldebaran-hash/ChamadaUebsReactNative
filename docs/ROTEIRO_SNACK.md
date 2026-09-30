# Roteiro da migração no Snack (passo a passo)

Migração do Chamada UEBS para React Native, feita no [Snack](https://snack.expo.dev), uma tarefa por vez.
O estilo segue a apostila do professor (`docs/React native.pdf`).

Onde fica cada coisa: app web original no repositório `ChamadaUebsOriginal` (backup, não mexer); a migração fica aqui, na raiz deste repositório, igual ao Snack.

## Padrões da apostila que vamos seguir

| Assunto | Como a apostila faz |
|---|---|
| Componente | `function NomeDoComponente({ props }) { return (...) }` + `export default NomeDoComponente;` |
| Estilo do componente | Arquivo `Style.js` ao lado, com `export default StyleSheet.create({...})` |
| Pastas | `components/<nomeEmCamelCase>/<NomeEmPascalCase>.js` + `Style.js`, `screens/<nome>/<Nome>Screen.js`, `assets/images/` |
| **Nomes (regra nossa)** | **Pastas em camelCase** (`customButton/`), **arquivos de classe em PascalCase** (`CustomButton.js`) |
| Variáveis de tela | `const [valor, setValor] = useState('')` |
| Lógica | Classes com métodos `static` em `utils/` (ex.: `MathUtils`) |
| Acesso a dados | Arquivos em `repository/` que recebem o `set...` para devolver o resultado à tela |
| Chamadas externas | Classe em `apis/` com métodos `static async` e `await fetch(...)` |
| Navegação | `@react-navigation/native` + `drawer` (menu lateral) ou `bottom-tabs` |
| Carregar dados ao abrir a tela | `useEffect(() => { ... }, [])` |
| Listas | `FlatList` com `data`, `keyExtractor`, `renderItem` |

Diferença em relação à apostila: o app original usa **Firebase (Firestore)** em vez de SQLite.
A organização será a mesma: o código do Firebase fica em `repository/`.

## Tarefas

| # | Tarefa | Capítulo da apostila | Status |
|---|---|---|---|
| 1 | Criar o Snack, a estrutura de pastas e o componente `Logo` | 2, 3 e 4 | ⏳ |
| 2 | Componente `CustomButton` e a tela de escolha do tipo de acesso | 3 | |
| 3 | Componente `TextInputBox` e a tela de login (só visual) | 3 e 4 | |
| 4 | Pasta `screens/` e navegação entre as telas | 5 e 6 | |
| 5 | Conectar o Firebase (`repository/firebase.js`) | 9 (adaptado) | |
| 6 | Login funcionando (`repository/authRepository.js`) | 9 e 11 | |
| 7 | Tela do aluno: ver seus dados e informar presença | 9 e 10 | |
| 8 | Tela do coordenador: lista de linhas (`FlatList`) | 9 | |
| 9 | Chamada do coordenador (marcar presença e salvar) | 9 e 10 | |
| 10 | Telas do admin (linhas, alunos, histórico) | 9 e 10 | |
| 11 | Extras: WhatsApp (`Share`/`Linking`), QR code, fotos | 4 e 11 | |
