# 1. Folosim o imagine de bază cu Node.js
FROM node:18

# 2. Setăm directorul de lucru în container
WORKDIR /app

# 3. Copiem fișierele package.json și package-lock.json
COPY package*.json ./

# 4. Instalăm dependințele aplicației
RUN npm install

# 5. Copiem restul fișierelor aplicației
COPY . .

# 6. Construim aplicația React pentru producție
RUN npm run build

# 7. Instalăm un server simplu pentru a servi fișierele construite
RUN npm install -g serve

# 8. Expunem portul pe care va rula aplicația
EXPOSE 8000

# 9. Setăm comanda care va porni aplicația în container
CMD ["serve", "-s", "build", "-l", "8000"]
