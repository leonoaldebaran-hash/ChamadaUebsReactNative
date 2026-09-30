# Mapa do app original → migração React Native

Este documento descreve como `public/index.html` está organizado hoje e propõe como cada parte deve virar módulo/componente na versão React Native. Os números de linha referem-se ao `public/index.html` deste commit base.

## 1. Anatomia do `index.html`

| Linhas (aprox.) | Conteúdo |
|---|---|
| 1–150 | `<head>`, Tailwind CDN, SheetJS, ExcelJS, CSS custom (temas, animações) |
| 152–770 | `<script type="module">`: imports do Firebase 11.6.1, `firebaseConfig`, `handleAuthStateChange` (roteia usuário por papel: admin / coordenador / aluno), `window.onload` inicial |
| 751–770 | Shell HTML: `#appContainer` + modal genérico (`#modalActions`) |
| 772–27575 | Script principal (não-module): estado global, serviços, renderização por template string |

Não há framework: cada tela é uma função `renderXxxView()` que devolve uma string HTML; `renderApp()` (≈ l. 4609) faz `switch(currentView)` e injeta o HTML em `#appContainer`. Eventos são `onclick="funcaoGlobal(...)"` chamando funções em `window`.

## 2. Telas (views) e controle de acesso

`isViewAllowedForCurrentSession()` (≈ l. 4250) define quem acessa o quê.

| Perfil | Views |
|---|---|
| Público | `login`, `password-reset` |
| Admin | `admin-*` (dashboard, lines, line-students, students, faculties, locations, itineraries, themes, history, occurrences, workbook-import-report, users, admins, logs, conversions, backup), `change-password` |
| Coordenador | `coordinator-name`, `force-password-change`, `change-password`, `linhas-disponiveis`, `line-attendance`, `minhas-chamadas`, `minhas-ocorrencias`, `coordinator-occurrence-form` |
| Aluno | `student-link`, `student-dashboard` |

**Alvo RN:** React Navigation com 4 stacks (Auth, Admin, Coordinator, Student) escolhidas por papel no `AuthContext`, substituindo `navigateTo`/`renderApp`/`sanitizeViewForCurrentSession` e o sync com `history` do navegador.

## 3. Coleções Firestore

| Caminho | Uso |
|---|---|
| `users/{uid}` | Perfil (role, nome, lineId, mustChangePassword, active) |
| `users/{uid}/turmas` | Turmas legadas do coordenador |
| `admin/admins/list/{uid}` | Admins |
| `admin/coordinators/list/{uid}` | Coordenadores |
| `admin/lines/linhas/{lineId}` | Linhas (nome, empresa, vínculo `usedBy`, alunos legados embutidos) |
| `admin/students/records/{id}` | Alunos (coleção v2 — `students_collection_v2`) |
| `admin/attendance/records` | Chamadas (histórico admin) |
| `coordenador/attendance/records` | Chamadas do coordenador |
| `admin/occurrences/records` | Ocorrências (com fotos) |
| `admin/logs/events` | Auditoria / diagnóstico |
| `admin/config/settings/{faculdades,theme,coordinatorInfoMessage,itineraries,conversions,saturday}` | Configurações |
| `student/authLinks/records/{uid}` | Vínculo conta do aluno ↔ cadastro |
| `student/presenceVotes/records/{data}__{uid}` | Presença informada pelo aluno no dia |
| `student/saturdayVotes/records` | Votação de sábado |
| `student/qrFeedback/records/{studentId}__{data}` | Retorno da leitura do QR code |

## 4. Domínios / módulos (proposta de quebra)

Cada linha abaixo é um candidato a pasta `src/features/<dominio>` com `services/` (Firestore), `hooks/` e `components/`/`screens/`.

| Domínio | Funções-chave no original (≈ linha) | Alvo RN |
|---|---|---|
| **Firebase / infra** | config (160), `readWithFirestoreCache` (4871), `handleFirestoreError` (3699), `isOfflineLikeError` (1887), `tryRecoverFirestoreClient` (16344) | `src/services/firebase.ts`, `firestoreCache.ts`, `errors.ts` |
| **Auth** | `handleAuthStateChange` (174), `handleAdminLogin` (1964), `handleCoordenadorLogin` (2029), `handleStudentEmailLogin/Register` (2096/2144), `handleGoogleLogin` (2232), `handlePasswordReset` (2355), `handleForcePasswordChange` (2387), `handleSignOut` (2524), `translateFirebaseError` (1852) | `features/auth` + `AuthContext` |
| **Modelo de aluno** | `normalizeStudentEntry/List` (3398/3439), `getStudent*` (2650–2840), `resolveStudentLineAssignments` (3024), trip profile (2945–3200), linhas adicionais (3186–3260) | `src/domain/student.ts` (funções puras, testáveis) |
| **Linhas** | `loadAdminLines` (7898), `saveAdminLine` (11053), `deleteAdminLine` (11219), `vinculateToLine`/`desvinculateFromLine` (3979/4038), `fetchLineDocumentFromServer` (3869) | `features/lines` |
| **Alunos (admin)** | coleção v2 (6380–7575), duplicados/merge (6540–6760), draft/edição (24369–25620), fotos (25576–26160), busca global (8038–8180) | `features/students` |
| **Importação XLSX** | `parseWorkbookStudentsByLine` (9976), `previewWorkbookStudentsIntoLines` (10546), `applyWorkbookImportReport` (10778), `exportAdminWorkbookSnapshot` (10152) | `features/import-export` (RN: `expo-document-picker` + `xlsx`) |
| **Chamada (coordenador)** | `renderLineAttendanceView` (17648), `toggleAttendance` (20318), `updatePresenceUi` (21009), extras/guests/manuais (21241–21936), `saveLineAttendanceRecord` (11305), `saveLineAttendanceAndFinish` (27338), estado local (1669–1709) | `features/attendance` (tela mais crítica) |
| **Votos de presença do aluno** | `handleStudentVoteSave` (12056), preview/aplicação no coordenador (16967–17584), transferência/pedido de linha (8182–8790) | `features/presence-votes` |
| **Sábado** | 21959–22220, 9423–9500 | `features/saturday` |
| **QR code** | `encode/decodeStudentQrPayload` (16300), `openStudentQrCodeModal` (16435), `openCoordinatorQrScannerModal` (18850) | `features/qr` (RN: `expo-camera` + `react-native-qrcode-svg`) |
| **Ocorrências** | form (15484), `submitCoordinatorOccurrence` (16167), relatório admin (22407–22600) | `features/occurrences` (RN: `expo-image-picker`) |
| **Itinerários** | modelo (4926–5070), editor admin (5093–5300, 13178–13720), geração de imagem em canvas (5654–6330) | `features/itineraries` (RN: `react-native-view-shot` + `expo-sharing`) |
| **Histórico / relatórios** | `applyHistoryFilters` (22264), `renderHistoryReport` (23036), `exportHistoryToXlsx` (27063) | `features/history` |
| **Usuários (admin)** | 23104–23950, 26630–27030 | `features/users` |
| **Faculdades / locais** | 7928–8040, 9539–9585, 23948–24360 | `features/catalogs` |
| **Temas / avisos** | 1160–1670 | `features/theme` + `ThemeContext` |
| **Backup** | 13724–14310 | `features/backup` (provavelmente só admin web) |
| **Logs / diagnóstico** | `writeSystemLog` (7581), fila offline (7659–7810), visão admin (26318–26630) | `src/services/logger.ts` |
| **Compartilhamento** | `exportToWhatsapp` (27263), `exportAttendanceToWhatsapp` (27487) | `src/services/share.ts` (RN: `Linking` / `Share`) |
| **PWA / deploy gate** | 22694–22950 | Não se aplica em RN (substituir por OTA updates) |

## 5. Pontos de atenção para a migração

- **Estado global mutável** (`currentView`, `userId`, `isAdmin`, `currentUserRole`, listas em memória) → trocar por contexts/store (Zustand ou Redux Toolkit) + React Query para dados do Firestore.
- **HTML em template string + `onclick` global** → componentes com props; nada de `window.*`.
- **`localStorage`** (rascunhos de voto, fila de diagnóstico, relatório de importação, login Google) → `AsyncStorage`/MMKV.
- **Canvas / DOM** (itinerário em imagem, redimensionamento de foto) → `react-native-view-shot`, `expo-image-manipulator`.
- **Fotos em base64 dentro de documentos** (há lógica de compactação para caber no limite de 1 MiB do Firestore, l. 18621–18750) → ideal migrar para Firebase Storage.
- **Duplicações**: `renderItineraryImageCanvas`, `buildItineraryPrintableHtml` e `renderAdminItinerariesView` aparecem definidas duas vezes; a última definição vence.
- **Login Google** em RN exige `@react-native-google-signin/google-signin` (ou `expo-auth-session`) em vez de `signInWithPopup/Redirect`.
- Sugestão de ordem: domínio puro (`student.ts`, datas) → Firebase/Auth → fluxo do aluno → fluxo do coordenador (chamada) → admin.
