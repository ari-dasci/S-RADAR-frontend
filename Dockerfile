# Stage 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build-prod

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage
# Angular 17 with "application" builder outputs to dist/<project>/browser
COPY --from=build /app/dist/s-adl-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
