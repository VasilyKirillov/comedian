FROM nginxinc/nginx-unprivileged:1.23-alpine
COPY . /usr/share/nginx/html
RUN sed -i -e 's;/404.html;/;' -e 's;#error_page;error_page;' /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]