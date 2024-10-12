FROM denoland/deno:2.0.0 AS base

FROM base AS dev
USER root
RUN mkdir -p /home/deno
RUN chown -R deno:deno /home/deno
RUN apt update && apt install -y git sudo
RUN echo "deno ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER deno
RUN mkdir -p /home/deno/.local/bin
ENV PATH=$PATH:/home/deno/.local/bin
COPY --from=elestio/pocketbase --chown=deno:deno /usr/local/bin/pocketbase /home/deno/.local/bin/pocketbase
