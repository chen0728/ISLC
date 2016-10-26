FROM docker-registry:5000/wetrip_base/node:0.12.3
COPY . /opt/app
ENV DEBUG lz-web
EXPOSE 3006
RUN cp /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime

