#!/usr/bin/env sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

DEFAULT_IMAGE_REF="antake/orcas-ai-api:latest"
IMAGE_REF="${1:-${ORCAS_IMAGE:-$DEFAULT_IMAGE_REF}}"

if command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
elif command -v docker >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
else
  echo "docker-compose 或 docker 不存在，请先安装 Docker。"
  exit 1
fi

export ORCAS_IMAGE="$IMAGE_REF"

echo "从镜像仓库拉取并启动 Orcas Ai Api..."
echo "镜像标签: $ORCAS_IMAGE"
echo "Compose files: docker-compose.yml + docker-compose.registry.yml"

$COMPOSE_CMD -f docker-compose.yml -f docker-compose.registry.yml pull new-api
exec sh -c "$COMPOSE_CMD -f docker-compose.yml -f docker-compose.registry.yml up -d \"\$@\"" sh "$@"
