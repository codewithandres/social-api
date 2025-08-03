guía práctica para gestionar tu proyecto API con Git usando las mejores prácticas:

## 1. Inicializar Git y configuración inicial

```bash
cd c:\Andres-Dev\web-aplication-andres.devs\React-Social-media-appv.1.0\api
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

## 2. Crear .gitignore

---

Perfecto, ya tienes un `.gitignore`. Te doy la guía completa para gestionar tu API con Git:

## 1. Configuración inicial

```bash
cd c:\Andres-Dev\web-aplication-andres.devs\React-Social-media-appv.1.0\api
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

## 2. Verificar/actualizar .gitignore

```
node_modules/
.env
.env.local
.env.production
dist/
build/
logs/
*.log
.DS_Store
Thumbs.db
coverage/
.nyc_output/
```

## 3. Estructura de commits (Conventional Commits)

```bash
# Formato: tipo(scope): descripción
git commit -m "feat(auth): add user registration with zod validation"
git commit -m "fix(auth): resolve login password comparison issue"
git commit -m "refactor(controllers): separate validation schemas"
```

**Tipos principales:**

- `feat`: nueva funcionalidad
- `fix`: corrección de bugs
- `refactor`: refactorización sin cambios funcionales
- `docs`: documentación
- `test`: pruebas
- `chore`: tareas de mantenimiento

## 4. Flujo de trabajo con ramas

```bash
# Crear rama para nueva funcionalidad
git checkout -b feature/user-profile
git checkout -b fix/auth-validation
git checkout -b hotfix/security-patch

# Trabajar y hacer commits
git add .
git commit -m "feat(profile): add user profile endpoints"

# Volver a main y mergear
git checkout main
git merge feature/user-profile
git branch -d feature/user-profile
```

## 5. Comandos esenciales diarios

```bash
# Ver estado
git status

# Agregar cambios
git add .                    # todos los archivos
git add controllers/         # carpeta específica
git add auth.controllers.js  # archivo específico

# Commit
git commit -m "feat(auth): add password hashing"

# Ver historial
git log --oneline

# Ver diferencias
git diff
```

## 6. Gestión de versiones (Tags)

```bash
# Crear versión
git tag -a v1.0.0 -m "Initial API release"
git tag -a v1.1.0 -m "Add user authentication"

# Ver tags
git tag

# Push tags
git push origin v1.0.0
```

## 7. Comandos de emergencia

```bash
# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer cambios no commiteados
git checkout -- archivo.js
git reset --hard HEAD

# Ver qué cambió en un commit
git show <commit-hash>
```

## 8. Flujo recomendado para tu proyecto

```bash
# 1. Antes de empezar a trabajar
git status
git pull origin main

# 2. Crear rama para nueva feature
git checkout -b feature/posts-crud

# 3. Trabajar y hacer commits frecuentes
git add .
git commit -m "feat(posts): add create post endpoint"

# 4. Al terminar la feature
git checkout main
git merge feature/posts-crud
git branch -d feature/posts-crud

# 5. Si usas repositorio remoto
git push origin main
```

Esta estructura te dará un historial limpio y profesional para tu API.
