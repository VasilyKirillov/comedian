FROM node:18.13.0-alpine as builder
WORKDIR /app
COPY . .
RUN npm install uglify-js clean-css-cli -g \
   && uglifyjs -o script.min.js --compress --mangle -- script.js \
   && sed 's/script.js/script.min.js/' -i index.html && rm script.js \
   && cleancss -o style.min.css style.css  \
   && sed 's/style.css/style.min.css/' -i index.html && rm style.css 


FROM nginxinc/nginx-unprivileged:1.23-alpine
COPY --from=builder /app /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html
RUN sed -i -e 's;/404.html;/;' -e 's;#error_page;error_page;' /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]