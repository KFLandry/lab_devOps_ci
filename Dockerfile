# ───────────────────────────────────────────────────────────
#  STAGE 1 : Base avec pnpm configuré
# ───────────────────────────────────────────────────────────
FROM node:20-alpine AS base

# Installer pnpm via corepack (méthode officielle)
RUN corepack enable && \
    corepack prepare pnpm@9 --activate

WORKDIR /usr/src/app

# ───────────────────────────────────────────────────────────
#  STAGE 2 : Installation des dépendances
# ───────────────────────────────────────────────────────────
FROM base AS deps

# Copier UNIQUEMENT les fichiers de verrouillage des dépendances
COPY package.json pnpm-lock.yaml ./

# Installation avec cache mount (accélère les rebuilds)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ───────────────────────────────────────────────────────────
#  STAGE 3 : Build de l'application
# ───────────────────────────────────────────────────────────
FROM base AS builder

# Copier les dépendances depuis le stage précédent
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copier le code source
COPY . .

# Générer les types de base de données (si nécessaire)
RUN pnpm db:generate || true

# Build de production
RUN pnpm build

# ───────────────────────────────────────────────────────────
#  STAGE 4 : Image de production légère
# ───────────────────────────────────────────────────────────
FROM base AS runner

# Variables d'environnement de production
ENV NODE_ENV=production \
    PORT=3000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 tanstack

# Installer curl pour le healthcheck
RUN apk add --no-cache curl

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder --chown=tanstack:nodejs /usr/src/app/.output ./.output
COPY --from=builder --chown=tanstack:nodejs /usr/src/app/package.json ./package.json

# Passer à l'utilisateur non-root
USER tanstack

# Exposer le port
EXPOSE 3000

# Healthcheck intégré
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/healthz || exit 1

# Démarrer l'application SSR
CMD ["node", ".output/server/index.mjs"]