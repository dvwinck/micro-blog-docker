FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

RUN mkdir -p /data && chown -R app:app /data /app


COPY package.json ./
RUN  npm install --package-lock-only
RUN npm ci --omit=dev

COPY server.js db.js ./

ENV PORT=3000
ENV DB_PATH=/data/microblog.db
ENV CORS_ORIGIN=*

VOLUME ["/data"]
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health_back || exit 1
CMD ["node", "server.js"]
