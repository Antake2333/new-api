#!/usr/bin/env sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR"

DEFAULT_IMAGE_REF="antake/orcas-ai-api:latest"
IMAGE_REF="${1:-${ORCAS_IMAGE:-$DEFAULT_IMAGE_REF}}"
DEFAULT_PLATFORM="linux/amd64"
PLATFORM="${ORCAS_PLATFORM:-$DEFAULT_PLATFORM}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker 不存在，请先安装 Docker。"
  exit 1
fi

if ! docker buildx version >/dev/null 2>&1; then
  echo "docker buildx 不可用，请先安装或启用 buildx。"
  exit 1
fi

echo "开始构建 Orcas Ai Api 镜像..."
echo "镜像标签: $IMAGE_REF"
echo "目标平台: $PLATFORM"

docker buildx build --platform "$PLATFORM" -t "$IMAGE_REF" --push .

echo "构建并推送完成: $IMAGE_REF"
