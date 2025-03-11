# 1. Устанавливаем зависимости
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN yarn install --frozen-lockfile    

# 2. Собираем проект
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .                            
COPY --from=deps /app/node_modules ./node_modules  
RUN yarn build                       

# 3. Запускаем контейнер
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.mjs ./    
COPY --from=builder /app/public ./public      
COPY --from=builder /app/.next ./.next        
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/package.json ./package.json  

EXPOSE 3000
CMD ["yarn", "start"]