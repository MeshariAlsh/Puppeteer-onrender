FROM ghcr.io/puppeteer/puppeteer:22.11.2
 
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/us/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*. json ./
RUN npm ci
COPY . .
CMD [ "node", "serverSide.js"]