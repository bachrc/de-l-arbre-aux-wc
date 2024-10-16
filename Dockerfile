FROM denoland/deno:2.0.0 AS base

ARG PB_VERSION=0.22.21
ARG ARCH=arm64

USER root
RUN mkdir -p /home/deno && chown -R deno:deno /home/deno
RUN apt update && apt install -y git sudo unzip
RUN echo "deno ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER deno
# download and unzip PocketBase
RUN mkdir -p /home/deno/.local/pb
ENV PATH=$PATH:/home/deno/.local/pb
ADD --chown=deno:deno https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${ARCH}.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /home/deno/.local/pb/

FROM base AS build
WORKDIR /app
USER deno
COPY --chown=deno:deno package.json deno.lock .
RUN deno install --allow-scripts
COPY --chown=deno:deno . .
RUN deno task build

FROM base AS database
WORKDIR /app
COPY ./pb_migrations /app/pb_migrations
CMD ["/home/deno/.local/pb/pocketbase", "serve"]

FROM nginx:1-alpine AS app
COPY --from=build /app/build /usr/share/nginx/html