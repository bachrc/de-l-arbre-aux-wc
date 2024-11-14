FROM debian:12-slim AS base

ARG PB_VERSION=0.22.21
ARG ARCH=arm64
ARG UID=1000
ARG GID=1000

USER root
RUN groupadd -g $GID -o wizou
RUN useradd -m -u $UID -g $GID -o -s /bin/bash wizou
RUN apt update && apt install -y git sudo unzip
RUN echo "wizou ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN mkdir /app && mkdir /pb && chown -R wizou:wizou /app && chown -R wizou:wizou /pb

USER wizou
# download and unzip PocketBase
ENV PATH=$PATH:/pb
ADD --chown=wizou:wizou https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${ARCH}.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# download deno
RUN mkdir -p /home/wizou/.local/bin
ENV PATH=$PATH:/home/wizou/.local/bin
COPY --from=denoland/deno:bin-2.0.6 --chown=wizou:wizou /deno /home/wizou/.local/bin


FROM base AS build
ARG PUBLIC_POCKETBASE_URL
WORKDIR /app
USER wizou
COPY --chown=wizou:wizou package.json deno.lock .
RUN deno install --allow-scripts
COPY --chown=wizou:wizou . .
RUN deno task build

FROM base AS database
WORKDIR /app
COPY ./pb_migrations /pb/pb_migrations
ENTRYPOINT ["/pb/pocketbase", "serve"]
CMD ["--http=0.0.0.0:8080"]

FROM database AS app
RUN mkdir -p /pb/pb_public && mkdir -p /pb/pb_data
COPY --from=build /app/build /pb/pb_public

ENTRYPOINT ["/pb/pocketbase", "serve"]
CMD ["--http=0.0.0.0:8080"]