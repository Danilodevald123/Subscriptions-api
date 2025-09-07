# Subscripciones API 🍀 Proyecto base en **NestJS** para practicar un sistema de subscripciones. Incluye configuración de **TypeScript estricto**, validación con DTOs y setup de calidad de código con **Prettier**, **ESLint**, **Husky** y **lint-staged**. --- ## 🚀 Levantar el proyecto

bash

# Instalar dependencias

npm install

# Development mode

npm run start:dev
Endpoint de prueba: http://localhost:3000/health

📂 Estructura básica
src/main.ts → bootstrap de la app NestJS

src/app.module.ts → módulo raíz

src/health.controller.ts → healthcheck básico

.vscode/settings.json → configuración de formateo en VSCode

.prettierrc / .prettierignore → reglas de Prettier

eslint.config.mjs → configuración de ESLint (Flat Config)

.husky/pre-commit → hook de commit con lint-staged

⚙️ Configuración de TypeScript
En tsconfig.json se activó modo estricto:

json
Copiar código
{
"compilerOptions": {
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"noUncheckedIndexedAccess": true,
"noFallthroughCasesInSwitch": true
}
}
🧹 Prettier
Formateador automático de código.

.prettierrc:

json
Copiar código
{
"printWidth": 100,
"singleQuote": true,
"trailingComma": "all",
"semi": true,
"arrowParens": "always"
}
.prettierignore:

pgsql
Copiar código
node_modules
dist
coverage
package-lock.json
🔍 ESLint
Linter configurado con Flat Config (eslint.config.mjs):

Reglas recomendadas de ESLint.

@typescript-eslint con type-checking.

eslint-plugin-prettier/recommended → integra Prettier en ESLint.

eslint-plugin-simple-import-sort → ordena imports/exports.

eslint.config.mjs:

js
Copiar código
// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
{ ignores: ['dist', 'coverage'] },
eslint.configs.recommended,
...tseslint.configs.recommendedTypeChecked,
prettierRecommended,
{
plugins: { 'simple-import-sort': simpleImportSort },
languageOptions: {
globals: { ...globals.node, ...globals.jest },
parserOptions: {
projectService: true,
tsconfigRootDir: import.meta.dirname
}
},
rules: {
'simple-import-sort/imports': 'warn',
'simple-import-sort/exports': 'warn',
'@typescript-eslint/no-floating-promises': 'warn',
'@typescript-eslint/no-unsafe-argument': 'warn',
'@typescript-eslint/no-explicit-any': 'off'
}
}
);
🐶 Husky + lint-staged
Instalación:

bash
Copiar código
npx husky init
Esto crea .husky/pre-commit.
Reemplazar el contenido con:

sh
Copiar código
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

npx lint-staged
package.json → sección lint-staged:

json
Copiar código
"lint-staged": {
"\*.{ts,tsx,js,json,md}": [
"prettier --write",
"eslint --fix --max-warnings=0"
]
}
Resultado: antes de cada commit se ejecuta Prettier + ESLint solo sobre archivos staged.

⚡ Configuración de VSCode
Archivo: .vscode/settings.json

json
Copiar código
{
"editor.formatOnSave": false,
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
"eslint.validate": ["typescript", "javascript"],
"eslint.experimental.useFlatConfig": true,
"eslint.alwaysShowStatus": true
}
Con esto, al guardar (Ctrl+S), VSCode corre ESLint Fix (y Prettier desde el plugin de ESLint).

🛠️ Scripts útiles
bash
Copiar código
npm run start:dev # levantar NestJS en modo desarrollo
npm run lint # revisar errores/warnings
npm run lint:fix # aplicar fixes (ESLint + Prettier)
npm run format # aplicar Prettier a todo el repo
npm run format:check # verificar formato sin modificar archivos
✅ Checklist del setup
Proyecto NestJS creado con npx @nestjs/cli.

TypeScript en modo estricto.

Prettier configurado (.prettierrc, .prettierignore).

ESLint con Flat Config (eslint.config.mjs).

Plugin simple-import-sort para ordenar imports.

Husky + lint-staged con hook de pre-commit.

Configuración de VSCode en .vscode/settings.json.
