#!/usr/bin/env sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

if command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
elif command -v docker >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  echo "docker-compose 或 docker 不存在，请先安装 Docker。"
  exit 1
fi

echo "使用本地源码构建并启动 Orcas Ai Api..."
echo "Compose files: docker-compose.yml + docker-compose.local-build.yml"

exec sh -c "$COMPOSE_CMD -f docker-compose.yml -f docker-compose.local-build.yml up -d --build \"\$@\"" sh "$@"
