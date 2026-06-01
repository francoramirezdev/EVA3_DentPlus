# EVA3_DentPlus

Aplicación web en Node.js, Express, Prisma y Handlebars para autenticación y gestión de afiliados.

## Qué incluye

- Autenticación (login y registro) con manejo de sesión.
- CRUD completo de afiliados.
- Vistas server-side con Handlebars.
- PostgreSQL ejecutándose en Docker Compose.

## Requisitos

- Node.js 18 o superior.
- yarn.
- Docker y Docker Compose.

## Instalación

```bash
yarn install
```

Configura tu archivo `.env` con valores como estos:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/affiliates_db
SESSION_SECRET=tu_secreto
PORT=3000
```

Para levantar PostgreSQL con Docker:

```bash
docker compose up -d db
```

## Comandos útiles

Comandos principales con `yarn`:

```bash
yarn dev
yarn build
yarn start
yarn seed
```

Comandos puntuales con `npx` (Prisma):

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

## Estructura del proyecto

```text
eva3_DentPlus/
├── prisma/
│   ├── schema.prisma                # Modelo de datos (User, Affiliate)
│   ├── migrations/                  # Historial de migraciones
│   └── seed.ts                      # Script de datos iniciales
├── src/
│   ├── index.ts                     # Punto de entrada
│   ├── app.ts                       # Configuración de Express
│   ├── controllers/
│   │   ├── affiliate.controller.ts
│   │   └── auth.controller.ts
│   ├── models/
│   │   ├── affiliate.model.ts
│   │   └── user.model.ts
│   ├── routes/
│   │   ├── affiliate.routes.ts
│   │   └── auth.routes.ts
│   ├── middleware/
│   │   └── requireAuth.ts           # Protege rutas privadas
│   ├── schemas/
│   │   ├── affiliate.schemas.ts     # Validación de afiliados
│   │   └── auth.schemas.ts          # Validación de auth
│   ├── lib/
│   │   ├── prisma.ts                # Cliente Prisma compartido
│   │   └── parseError.ts            # Formateo de errores
│   ├── types/
│   │   └── session.ts               # Tipos de express-session
│   └── generated/prisma/            # Cliente Prisma generado
├── views/
│   ├── layouts/                     # Layouts base
│   │   └── main.hbs                 # Layout principal
│   ├── affiliates/
│   │   ├── index.hbs                # Listado
│   │   ├── show.hbs                 # Detalle
│   │   ├── create.hbs               # Formulario de creación
│   │   └── edit.hbs                 # Formulario de edición
│   ├── auth/
│   │   ├── login.hbs                # Inicio de sesión
│   │   └── register.hbs             # Registro de usuario
│   ├── home.hbs                     # Página principal
│   └── 404.hbs                      # Página no encontrada
├── docker-compose.yml
├── eslint.config.js
├── nodemon.json
├── package.json
├── package-lock.json
├── prisma.config.ts
├── tsconfig.json
└── .env
```

### Resumen de carpetas

- `prisma/`: contiene el esquema de base de datos, migraciones y seed.
- `src/`: agrupa la lógica de servidor, modelos, rutas, validaciones y utilidades.
- `views/`: guarda las plantillas Handlebars de la interfaz.

## Flujo de la app

1. `src/index.ts` arranca el servidor.
2. `src/app.ts` configura Express y registra las rutas.
3. `src/routes/` envía las peticiones a los controladores.
4. `src/controllers/` coordina la lógica de negocio.
5. `src/models/` consulta la base de datos con Prisma.
6. `prisma/schema.prisma` define la estructura de la base de datos.
7. `prisma/seed.ts` inserta datos de ejemplo.
