# Etapa 1: build de la app (instala dependencias, genera Prisma y compila TypeScript)
FROM node:22.22.2-bookworm-slim AS build

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Activa corepack para usar la versión de Yarn del proyecto
RUN corepack enable

# Copiamos primero archivos de dependencias para aprovechar cache de Docker
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiamos fuentes y configuración necesarias para compilar
COPY tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src
COPY views ./views

# Genera el cliente Prisma en src/generated/prisma
RUN npx prisma generate

# Compila TS -> dist/
RUN yarn build


# Etapa 2: imagen final de runtime
FROM node:22.22.2-bookworm-slim AS runner

WORKDIR /app

# Variables por defecto del contenedor
ENV NODE_ENV=production
ENV PORT=3000

RUN corepack enable

# Copiamos package files por referencia y node_modules completos desde build
COPY package.json yarn.lock ./
COPY --from=build /app/node_modules ./node_modules

# Prisma en runtime (schema + config) para poder ejecutar db push/migrate si se necesita
COPY prisma.config.ts ./
COPY prisma ./prisma

# App compilada y recursos de vistas
COPY --from=build /app/dist ./dist
COPY --from=build /app/views ./views

# Cliente Prisma generado, útil para scripts como seed en contenedor
COPY --from=build /app/src/generated ./src/generated

# Puerto expuesto de la app Express
EXPOSE 3000

# Arranque por defecto de la aplicación
CMD ["node", "dist/index.js"]