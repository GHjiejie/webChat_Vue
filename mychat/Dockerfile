# 使用官方的nodejs镜像作为基础镜像
FROM node as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录 /app
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的所有文件到工作目录 /app
COPY . .

# 构建项目
RUN npm run build

# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 复制构建后的文件到 Nginx 的默认服务目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]