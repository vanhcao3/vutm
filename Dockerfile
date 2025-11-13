# Production environment from built-in nginx
FROM harbor.vht.vn/proxy-cache/nginx:1.29.1-alpine
COPY /build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
