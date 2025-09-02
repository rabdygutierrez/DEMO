FROM node:own-node-20.14.0

WORKDIR /home/app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g playwright
# Si se van a usar otros navegadores agregar los nombres en `npx plawright install --with-deps <navegador1 navegador2>`
RUN npx playwright install --with-deps chromium chrome

# Copiar la aplicación en el contenedor
COPY . .