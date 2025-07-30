# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY --from=builder /app/public/ /usr/share/nginx/html/
# Optional: static assets
# COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf  # Uncomment if you add a custom nginx config
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 