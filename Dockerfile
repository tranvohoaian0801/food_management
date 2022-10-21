# lts để update lại các version của node - alpine để giảm core
FROM node:lts-alpine AS development

MAINTAINER HoaiAn<tranvohoaian2k@gmail.com>

WORKDIR /HA/src/app

# dấu * tượng trưng cho cả file package và package lock đều được copy vào
COPY package*.json ./

RUN npm install

# RUN npm install --only=development

COPY . .

RUN #npm run build

EXPOSE 3000

CMD npm run db:docker


# FROM node:12.19.0-alpine3.9 as production
#
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
#
# WORKDIR /usr/src/app
#
# COPY package*.json ./
#
# RUN npm install --only=production
#
# COPY . .

# COPY --from=development /usr/src/app/dist ./dist



