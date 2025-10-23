# Stage 1: build Tailwind + DaisyUI
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json  ./
RUN  npm install --package-lock-only
RUN  npm ci
COPY postcss.config.cjs tailwind.config.cjs ./
COPY src ./src
COPY scripts ./scripts
RUN npm run build

# Stage 2: serve com Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/health_front || exit 1
